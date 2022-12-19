import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from 'src/orm/entities/session.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    protected readonly sessionRepository: Repository<Session>,
  ) {}

  public async create(message: string): Promise<Session> {
    return this.sessionRepository.save({ message })
  }

  public async findByMessage(message: string): Promise<Session> {
    const session = await this.sessionRepository.findOne({ where: { message } })
    if (!session) {
      throw new NotFoundException('session not found')
    }
    return session
  }

  public async deleteByMessage(message: string): Promise<void> {
    const deleteResponse = await this.sessionRepository.delete(message)
    if (deleteResponse.affected) {
      throw new NotFoundException('session is not exist')
    }
  }
}
