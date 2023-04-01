import { InstructionElementEntity } from '../../../orm/entities/instruction.element.entity'
import { InstructionEntity } from '../../../orm/entities/instruction.entity'
import { InstructionElementGenericType } from '../../../common/enum/instruction.element.generic.type'
import { AccountEntity } from '../../../orm/entities'
import { AccountMapper } from '../../account/mappers/account.mapper'
import { InstructionElementDto } from '../dtos/instruction-element.dto'
import { CreateInstructionElementDto } from '../dtos/create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from '../dtos/update-instruction-element/update-instruction-element.dto'

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
        id: entity.genericType === InstructionElementGenericType.CUSTOM_ACCOUNT && entity.account ? entity.account.id : null,
        type: entity.genericType,
        name: entity.genericType === InstructionElementGenericType.CUSTOM_ACCOUNT && entity.account ? entity.account.name : entity.genericType,
      },
      account: entity.account ? AccountMapper.toDto(entity.account) : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(instruction: InstructionEntity, data: CreateInstructionElementDto, account: AccountEntity | null): InstructionElementEntity {
    const instructionElement: InstructionElementEntity = Object.assign(new InstructionElementEntity(), { instruction }, data)
    if (data.genericType) {
      instructionElement.genericType = data.genericType.type
      if (account) {
        instructionElement.account = account
      }
    }

    return instructionElement
  }

  static toUpdateEntity(
    entity: InstructionElementEntity,
    data: UpdateInstructionElementDto,
    account: AccountEntity | null,
  ): InstructionElementEntity {
    const instructionElement: InstructionElementEntity = Object.assign(entity, data)
    if (data.genericType) {
      instructionElement.genericType = data.genericType.type
      instructionElement.account = account
    }

    return instructionElement
  }
}
