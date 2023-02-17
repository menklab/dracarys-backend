import { CreateInstructionDto } from './dtos/create-instruction/create-instruction.dto'
import { UpdateInstructionDto } from './dtos/update-instruction/update-instruction.dto'
import { businessException } from 'src/common/errors/utils/business-exception'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { InstructionMapper } from './mappers/instruction.mapper'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InstructionDto } from './dtos/instruction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProgramEntity } from 'src/orm/entities'
import { Repository } from 'typeorm'
import { ERRORS } from 'src/common'
import { InstructionElementEntity } from '../../orm/entities/instruction.element.entity'

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(InstructionEntity)
    private readonly instructionRepository: Repository<InstructionEntity>,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  public async getAll(programId: number): Promise<InstructionDto[]> {
    const instructions = await this.instructionRepository.find({
      where: {
        program: {
          id: programId,
        },
      },
    })

    return instructions.map(InstructionMapper.toDto)
  }

  public async get(id: number): Promise<InstructionDto> {
    const instruction = await this.instructionRepository.findOne({
      where: { id },
    })

    if (!instruction) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    return InstructionMapper.toDto(instruction)
  }

  public async create(data: CreateInstructionDto): Promise<InstructionDto> {
    const program = await this.programRepository.findOne({
      where: { id: data.programId },
    })

    if (!program) {
      throw new NotFoundException(businessException([ERRORS.program.notFound]))
    }

    const instructionMapped = InstructionMapper.toCreateEntity(program, data)
    const instructionSaved = await this.instructionRepository.save(instructionMapped)

    return InstructionMapper.toDto(instructionSaved)
  }

  public async update(id: number, data: UpdateInstructionDto): Promise<InstructionDto> {
    const instruction = await this.instructionRepository.findOne({
      where: { id: id },
    })

    if (!instruction) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    const instructionMapped = InstructionMapper.toUpdateEntity(instruction, data)
    const instructionSaved = await this.instructionRepository.save(instructionMapped)

    return InstructionMapper.toDto(instructionSaved)
  }

  public async delete(id: number): Promise<void> {
    let instruction = await this.instructionRepository.findOne({
      where: { id: id },
    })

    if (!instruction) {
      throw new NotFoundException(businessException([ERRORS.instruction.notFound]))
    }

    await this.instructionRepository.delete(id)
  }

  public async generateCode(programId: number): Promise<string[]> {
    const instructions = await this.instructionRepository.find({
      where: {
        program: {
          id: programId,
        },
      },
      relations: {
        elements: true,
      },
      order: {
        id: 'ASC',
        elements: {
          order: 'ASC',
        },
      }
    })

    if (!instructions) {
      return []
    }

    const code = ['use anchor_lang::prelude::*;', '']

    for (const instruction of instructions) {
      const camelCaseName = this.toCamelCase(instruction.name)
      const func = this.generateFunction(instruction.name, camelCaseName)
      code.push(...func)
      const structure = this.generateStructure(instruction.elements, camelCaseName)
      code.push(...structure)
    }

    return code
  }

  private generateFunction(name: string, camelCaseName: string): string[] {
    return [`pub fn ${name}(ctx: Context<${camelCaseName}>) ->`, '  Result<()> {', '', '  Ok(())', '}', '']
  }

  private generateStructure(instructionElements: InstructionElementEntity[], camelCaseName: string): string[] {
    const structure = ['#[derive(Accounts)]']
    const structureName = `pub struct ${camelCaseName}<'info> {`
    structure.push(structureName)

    for (const element of instructionElements) {
      if (element.mut) {
        structure.push('  #[account(mut)]')
      }
      const field = `  pub ${element.name}: ${element.accountType}<'info, ${element.genericType}>,`
      structure.push(field)
      structure.push('')
    }

    structure.push('}')

    return structure
  }

  private toCamelCase(str: string): string {
    return str
      .split('_')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join('')
  }
}
