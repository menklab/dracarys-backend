import { CreateAccountElementDto } from '../dtos/create-account-element/create-account-element.dto'
import { UpdateAccountElementDto } from '../dtos/update-account-element/update-account-element.dto'
import { AccountElementEntity } from 'src/orm/entities/account.element.entity'
import { AccountElementDto } from '../dtos/account-element.dto'
import { AccountEntity } from 'src/orm/entities'

export class AccountElementMapper {
  static toDto(entity: AccountElementEntity): AccountElementDto {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toCreateEntity(account: AccountEntity, data: CreateAccountElementDto): AccountElementEntity {
    return Object.assign(new AccountElementEntity(), { account: account }, data)
  }

  static toUpdateEntity(entity: AccountElementEntity, data: UpdateAccountElementDto): AccountElementEntity {
    return Object.assign(entity, data)
  }
}
