import { CreateInstructionElementDto } from '../dtos/create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from '../dtos/update-instruction-element/update-instruction-element.dto'
import { InstructionElementEntity } from 'src/orm/entities/instruction.element.entity'
import { InstructionElementDto } from '../dtos/instruction-element.dto'
import { InstructionEntity } from 'src/orm/entities/instruction.entity'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { AccountEntity } from 'src/orm/entities'
import { AccountMapper } from 'src/modules/account/mappers/account.mapper'

export class InstructionElementMapper {
  static toDto(entity: InstructionElementEntity): InstructionElementDto {
    return {
      id: entity.id,
      order: entity.order,
      name: entity.name,
      description: entity.description,
      mut: entity.mut,
      accountType: entity.accountType,
      genericType: {
        id: entity.genericType === InstructionElementGenericType.CUSTOM_ACCOUNT && entity.genericTypeAccount ? entity.genericTypeAccount.id : null,
        type: entity.genericType,
        name: entity.genericType === InstructionElementGenericType.CUSTOM_ACCOUNT && entity.genericTypeAccount ? entity.genericTypeAccount.name : entity.genericType,
      },
      genericTypeAccount: entity.genericTypeAccount ? AccountMapper.toDto(entity.genericTypeAccount) : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(instruction: InstructionEntity, data: CreateInstructionElementDto, genericTypeAccount: AccountEntity | null): InstructionElementEntity {
    let instructionElement: InstructionElementEntity = Object.assign(new InstructionElementEntity(), { instruction }, data)
    if (data.genericType) {
      instructionElement.genericType = data.genericType.type
      if (genericTypeAccount) {
        instructionElement.genericTypeAccount = genericTypeAccount
      }
    }
    return instructionElement
  }

  static toUpdateEntity(entity: InstructionElementEntity, data: UpdateInstructionElementDto, genericTypeAccount: AccountEntity | null): InstructionElementEntity {
    let instructionElement: InstructionElementEntity = Object.assign(entity, data)
    if (data.genericType) {
      instructionElement.genericType = data.genericType.type
      if (genericTypeAccount) {
        instructionElement.genericTypeAccount = genericTypeAccount
      }
      else {
        instructionElement.genericTypeAccount = null
      }
    }

    return instructionElement
  }
}
