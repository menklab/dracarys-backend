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

    return programs.map(ProgramMapper.toDto)
  }

  public async get(id: number, userId: number): Promise<ProgramDto> {
    const program = await this.programRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
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

    const programMapped = ProgramMapper.toCreateEntity(user, data)
    const programSaved = await this.programRepository.save(programMapped)

    return ProgramMapper.toDto(programSaved)
  }

  public async update(id: number, data: UpdateProgramDto): Promise<ProgramDto> {
    let programFetched = await this.programRepository.findOne({
      where: { id },
    })
    if (!programFetched) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    const programMapped = ProgramMapper.toUpdateEntity(programFetched, data)
    const programSaved = await this.programRepository.save(programMapped)

    return ProgramMapper.toDto(programSaved)
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
