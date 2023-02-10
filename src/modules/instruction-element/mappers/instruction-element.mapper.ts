import { CreateInstructionElementDto } from '../dtos/create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from '../dtos/update-instruction-element/update-instruction-element.dto'
import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { InstructionElementDto } from '../dtos/instruction-element.dto'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'

export class InstructionElementMapper {
  static toDto(entity: InstructionElementEntity): InstructionElementDto {
    return {
      id: entity.id,
      order: entity.order,
      name: entity.name,
      description: entity.description,
      mut: entity.mut,
      accountType: entity.accountType,
      genericType: entity.genericType,
      genericTypeAccount: entity.genericTypeAccount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(instruction: InstructionEntity, data: CreateInstructionElementDto): InstructionElementEntity {
    return Object.assign(new InstructionElementEntity(), { instruction: instruction }, data)
  }

  static toUpdateEntity(entity: InstructionElementEntity, data: UpdateInstructionElementDto): InstructionElementEntity {
    return Object.assign(entity, data)
  }
}
