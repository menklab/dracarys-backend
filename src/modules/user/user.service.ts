import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../orm/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {}

  public async create(pubKey: string, message: string): Promise<User> {
    return this.userRepository.save({ pubKey, message })
  }

  public async findByPubKey(pubKey: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { pubKey },
    })
  }
}
