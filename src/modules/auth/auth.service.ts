import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import * as crypto from 'crypto'
import { Response } from 'express'
import { UserService } from '../user/user.service'
import { AuthInputDto } from './dtos/auth/auth.input.dto'
import { businessException } from '../../common/errors/utils/business-exception'
import { ERRORS } from '../../common'

@Injectable()
export class AuthService {
  constructor(protected readonly userService: UserService) {}

  public generateMessage(session: Record<string, any>): string {
    const message = crypto.randomBytes(64).toString('base64')
    session.message = message // eslint-disable-line no-param-reassign
    return message
  }

  public async verifyMessage(session: Record<string, any>, { pubKey, message, signature }: AuthInputDto): Promise<boolean> {
    if (session.message !== message) {
      throw new BadRequestException(businessException([ERRORS.auth.invalidMessage]))
    }

    const encodedMessage = new TextEncoder().encode(message)

    const signatureUint8Array = new Uint8Array(
      atob(signature)
        .split('')
        .map((char) => char.charCodeAt(0)),
    )

    const isAuthorized = nacl.sign.detached.verify(encodedMessage, signatureUint8Array, bs58.decode(pubKey))

    if (!isAuthorized) {
      throw new UnauthorizedException(businessException([ERRORS.auth.notAuthorized]))
    }

    let user = await this.userService.findByPubKey(pubKey)

    if (!user) {
      user = await this.userService.create(pubKey, message)
    }

    session.isAuthorized = isAuthorized // eslint-disable-line no-param-reassign
    session.userId = user.id // eslint-disable-line no-param-reassign

    return isAuthorized
  }

  public async logOut(session: Record<string, any>, response: Response): Promise<boolean> {
    session.cookie.expires = new Date() // eslint-disable-line no-param-reassign
    response.cookie('connect.sid', '', { domain: '.dracarys.digital' })

    return true
  }
}
