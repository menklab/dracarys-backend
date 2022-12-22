import { ForbiddenException, Injectable } from '@nestjs/common'
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import { UserService } from '../user/user.service'
import { AuthInputDto } from './dtos/auth/auth.input.dto'
import * as crypto from 'crypto'
import { ERROR_MESSAGES } from '../../common'

@Injectable()
export class AuthService {
  constructor(protected readonly userService: UserService) {}

  public generateMessage(session: Record<string, any>): string {
    const message = crypto.randomBytes(64).toString('base64')
    session.message = message
    return message
  }

  public async verifyMessage(session: Record<string, any>, { pubKey, message, signature }: AuthInputDto): Promise<boolean> {
    if (session.message !== message) {
      throw new ForbiddenException(ERROR_MESSAGES.auth.invalidMessage.message)
    }

    const encodedMessage = new TextEncoder().encode(message)

    const signatureUint8Array = new Uint8Array(
      atob(signature)
        .split('')
        .map((char) => char.charCodeAt(0)),
    )

    const isAuthorized = nacl.sign.detached.verify(encodedMessage, signatureUint8Array, bs58.decode(pubKey))

    if (!isAuthorized) {
      throw new ForbiddenException(ERROR_MESSAGES.auth.notAuthorized.message)
    }

    let user = await this.userService.findByPubKey(pubKey)

    if (!user) {
      user = await this.userService.create(pubKey, message)
    }

    session.isAuthorized = isAuthorized
    session.userId = user.id

    return isAuthorized
  }

  public async logOut(session: Record<string, any>): Promise<boolean> {
    session.destroy()
    return true
  }
}
