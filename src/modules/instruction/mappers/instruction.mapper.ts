import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { ProgramEntity } from 'src/orm/entities'
import { CreateInstructionDto } from '../dtos/create-instruction/create-instruction.dto'
import { UpdateInstructionDto } from '../dtos/update-instruction/update-instruction.dto'
import { InstructionDto } from '../dtos/instruction.dto'

export class InstructionMapper {
  static toDto(entity: InstructionEntity): InstructionDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(program: ProgramEntity, data: CreateInstructionDto): InstructionEntity {
    return Object.assign(new InstructionEntity(), { program }, data)
  }

  static toUpdateEntity(entity: InstructionEntity, data: UpdateInstructionDto): InstructionEntity {
    return Object.assign(entity, data)
  }
}
