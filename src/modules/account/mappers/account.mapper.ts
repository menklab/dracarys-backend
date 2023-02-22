import { AccountEntity, ProgramEntity } from 'src/orm/entities'
import { CreateAccountDto } from '../dtos/create-account/create-account.dto'
import { UpdateAccountDto } from '../dtos/update-account/update-account.dto'
import { AccountDto } from '../dtos/account.dto'

export class AccountMapper {
  static toDto(account: AccountEntity): AccountDto {
    return {
      id: account.id,
      name: account.name,
      coordinates: account.coordinates,
      linkedAccounts: account.linkedAccounts,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }
  }

  static toCreateEntity(program: ProgramEntity, data: CreateAccountDto): AccountEntity {
    return Object.assign(new AccountEntity(), { program }, data)
  }

  static toUpdateEntity(account: AccountEntity, data: UpdateAccountDto): AccountEntity {
    return Object.assign(account, data)
  }

  static toUpdateLinkedAccounts(account: AccountEntity, linkedAccounts: Array<number>): AccountEntity {
    return Object.assign(account, { linkedAccounts })
  }
}
