import { toCreateProgramEntity, toUpdateProgramEntity } from './mappers/program.mapper'
import { businessException } from '../../common/errors/utils/business-exception'
import { UpdateProgramDto } from './dtos/update-program/update-program.dto'
import { CreateProgramDto } from './dtos/create-program/create-program.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Program } from '../../orm/entities'
import { ERRORS } from '../../common'
import { Repository } from 'typeorm'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    private readonly userService: UserService,
  ) { }

  public async create(userId: number, data: CreateProgramDto): Promise<Program> {
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new NotFoundException(businessException([ERRORS.user.notFound]))
    }

    const program = toCreateProgramEntity(user, data)

    return await this.programRepository.save(program)
  }

  public async update(id: number, data: UpdateProgramDto): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id },
    })
    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    toUpdateProgramEntity(program, data)

    return this.programRepository.save(program)
  }

  public async getAllByUserId(userId: number): Promise<Program[]> {
    return this.programRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  public async delete(id: number): Promise<void> {
    const program = await this.programRepository.findOne({
      where: { id },
    })
    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    await this.programRepository.delete(id)
  }
}
