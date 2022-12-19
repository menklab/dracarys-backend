import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../orm/entities/user.entity'
import { SessionService } from '../session/session.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly sessionService: SessionService,
  ) {}

  public async create(pubKey: string, message: string): Promise<User> {
    const session = await this.sessionService.create(message)
    return this.userRepository.save({ pubKey, session })
  }
}
