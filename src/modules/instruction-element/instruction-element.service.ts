import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { businessException } from 'src/common/errors/utils/business-exception'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/orm/entities'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'
import { InstructionElementGenericTypeMap } from 'src/common/maps/instruction.element.generic.type.map'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { InstructionElementDto } from './dtos/instruction-element.dto'
import { InstructionElementMapper } from './mappers/instruction-element.mapper'
import { CreateInstructionElementDto } from './dtos/create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from './dtos/update-instruction-element/update-instruction-element.dto'

@Injectable()
export class InstructionElementService {
  constructor(
    @InjectRepository(InstructionEntity)
    private readonly instructionRepository: Repository<InstructionEntity>,
    @InjectRepository(InstructionElementEntity)
    private readonly instructionElementRepository: Repository<InstructionElementEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  public async getAll(instructionId: number): Promise<InstructionElementDto[]> {
    const instructionElements = await this.instructionElementRepository.find({
      where: {
        instruction: {
          id: instructionId,
        },
      },
      relations: { account: true },
      order: {
        order: 'ASC',
      },
    })

    return instructionElements.map(InstructionElementMapper.toDto)
  }

  public async get(id: number): Promise<InstructionElementDto> {
    const instructionElement = await this.instructionElementRepository.findOne({
      where: { id },
      relations: { account: true },
    })

    if (!instructionElement) {
      throw new NotFoundException(businessException([ERRORS.instructionElement.notFound]))
    }

    return InstructionElementMapper.toDto(instructionElement)
  }

  public async create(data: CreateInstructionElementDto): Promise<InstructionElementDto> {
    const instruction = await this.instructionRepository.findOne({
      where: { id: data.instructionId },
      relations: { elements: true },
    })

    if (!instruction) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    let account = null
    if (data.genericType && data.genericType.id && data.genericType.type === InstructionElementGenericType.CUSTOM_ACCOUNT) {
      account = await this.accountRepository.findOne({
        where: { id: data.genericType.id },
      })

      if (!account) {
        throw new NotFoundException(businessException([ERRORS.account.notFound]))
      }
    }

    const instructionElementEntity = InstructionElementMapper.toCreateEntity(instruction, data, account)
    const instructionElementSaved = await this.instructionElementRepository.save(instructionElementEntity)

    instruction.addElement(instructionElementSaved)
    await this.instructionRepository.save(instruction)

    return InstructionElementMapper.toDto(instructionElementSaved)
  }

  public async update(id: number, data: UpdateInstructionElementDto): Promise<InstructionElementDto> {
    const instructionElement = await this.instructionElementRepository.findOne({
      where: { id },
      relations: { account: true },
    })

    if (!instructionElement) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    let account = null
    if (data.genericType && data.genericType.id && data.genericType.type === InstructionElementGenericType.CUSTOM_ACCOUNT) {
      account = await this.accountRepository.findOne({
        where: { id: data.genericType.id },
      })

      if (!account) {
        throw new NotFoundException(businessException([ERRORS.account.notFound]))
      }
    }

    const instructionElementEntity = InstructionElementMapper.toUpdateEntity(instructionElement, data, account)
    const instructionElementSaved = await this.instructionElementRepository.save(instructionElementEntity)

    return InstructionElementMapper.toDto(instructionElementSaved)
  }

  public async delete(id: number): Promise<void> {
    const instructionElement = await this.instructionElementRepository.findOne({
      where: { id },
    })

    if (!instructionElement) {
      throw new NotFoundException(businessException([ERRORS.instructionElement.notFound]))
    }

    await this.instructionElementRepository.delete(id)
  }

  public async getGenericTypes(programId: number): Promise<InstructionElementGenericTypeMap> {
    const accounts = await this.accountRepository.find({
      where: {
        program: {
          id: programId,
        },
      },
    })

    const customTypes = accounts.map((account) => ({
      id: account.id,
      name: account.name,
      type: InstructionElementGenericType.CUSTOM_ACCOUNT,
    }))

    const instructionElementGenericTypeMap = new InstructionElementGenericTypeMap(customTypes)

    return instructionElementGenericTypeMap
  }
}
