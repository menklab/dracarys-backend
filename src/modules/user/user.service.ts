import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../../orm/entities'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(pubKey: string, message: string): Promise<UserEntity> {
    return this.userRepository.save({ pubKey, message })
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  public async findByPubKey(pubKey: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { pubKey },
    })
  }
}
