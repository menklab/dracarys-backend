import { businessException } from '../../common/errors/utils/business-exception'
import { CreateProgramDto } from './dtos/create-program/create-program.dto'
import { UpdateProgramDto } from './dtos/update-program/update-program.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ProgramMapper } from './mappers/program.mapper'
import { InjectRepository } from '@nestjs/typeorm'
import { ProgramEntity } from '../../orm/entities'
import { UserService } from '../user/user.service'
import { ProgramDto } from './dtos/program.dto'
import { ERRORS } from '../../common'
import { Repository } from 'typeorm'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    private readonly userService: UserService,
  ) {}

  public async getAllByUserId(userId: number): Promise<ProgramDto[]> {
    const programs = await this.programRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })

    const result = programs.map((program) => {
      return ProgramMapper.toDto(program)
    })

    return result
  }

  public async get(id: number): Promise<ProgramDto> {
    const program = await this.programRepository.findOne({
      where: { id },
    })
    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    return ProgramMapper.toDto(program)
  }

  public async create(userId: number, data: CreateProgramDto): Promise<ProgramDto> {
    const user = await this.userService.findById(userId)
    if (!user) {
      throw new NotFoundException(businessException([ERRORS.user.notFound]))
    }

    let program = ProgramMapper.toCreateEntity(user, data)
    program = await this.programRepository.save(program)

    return ProgramMapper.toDto(program)
  }

  public async update(id: number, data: UpdateProgramDto): Promise<ProgramDto> {
    let program = await this.programRepository.findOne({
      where: { id },
    })
    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    program = ProgramMapper.toUpdateEntity(program, data)
    program = await this.programRepository.save(program)

    return ProgramMapper.toDto(program)
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
