import { CreateInstructionElementDto } from './dtos/create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from './dtos/update-instruction-element/update-instruction-element.dto'
import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { InstructionElementMapper } from './mappers/instruction-element.mapper'
import { businessException } from 'src/common/errors/utils/business-exception'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { InstructionElementDto } from './dtos/instruction-element.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/orm/entities'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'
import { InstructionElementGenericTypeMap } from 'src/common/maps/instruction.element.generic.type.map'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'

@Injectable()
export class InstructionElementService {
  constructor(
    @InjectRepository(InstructionEntity)
    private readonly instructionRepository: Repository<InstructionEntity>,
    @InjectRepository(InstructionElementEntity)
    private readonly instructionElementRepository: Repository<InstructionElementEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) { }

  public async getAll(instructionId: number): Promise<InstructionElementDto[]> {
    const instructionElements = await this.instructionElementRepository.find({
      where: {
        instruction: {
          id: instructionId,
        },
      },
      relations: { genericTypeAccount: true },
      order: {
        order: 'ASC',
      },
    })

    return instructionElements.map(InstructionElementMapper.toDto)
  }

  public async get(id: number): Promise<InstructionElementDto> {
    const instructionElement = await this.instructionElementRepository.findOne({
      where: { id },
      relations: { genericTypeAccount: true },
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

    let account = undefined
    if (data.genericType && data.genericType.type === InstructionElementGenericType.CUSTOM_ACCOUNT) {
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
      where: { id: id },
      relations: { genericTypeAccount: true },
    })

    if (!instructionElement) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    let account = undefined
    if (data.genericType && data.genericType.type === InstructionElementGenericType.CUSTOM_ACCOUNT) {
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
      where: { id: id },
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

    let customTypes = []

    for (let account of accounts) {
      customTypes.push({
        id: account.id,
        name: account.name,
        type: InstructionElementGenericType.CUSTOM_ACCOUNT,
      })
    }

    let instructionElementGenericTypeMap = new InstructionElementGenericTypeMap
    instructionElementGenericTypeMap.custom_account_options.options = customTypes as []

    return instructionElementGenericTypeMap
  }
}
