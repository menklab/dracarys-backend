import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ProgramEntity } from '../../orm/entities'
import { CreateProgramDto } from './dtos/create-program/create-program.dto'
import { UserService } from '../user/user.service'
import { UpdateProgramDto } from './dtos/update-program/update-program.dto'
import { businessException } from '../../common/errors/utils/business-exception'
import { ERRORS } from '../../common'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(userId: number, createProgramDto: CreateProgramDto): Promise<ProgramEntity> {
    const user = await this.userService.findById(userId)
    if (!user) {
      throw new NotFoundException(businessException([ERRORS.user.notFound]))
    }
    createProgramDto.user = user // TODO: FIX IT

    return this.programRepository.save(createProgramDto)
  }

  public async update(id: number, updateProgramDto: UpdateProgramDto): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({
      where: { id },
    })
    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    return this.programRepository.save({
      ...program,
      ...updateProgramDto,
    })
  }

  public async getAllByUserId(userId: number): Promise<ProgramEntity[]> {
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
