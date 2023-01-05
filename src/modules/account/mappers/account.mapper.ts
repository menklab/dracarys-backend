import { CreateAccountDto } from '../dtos/create-account/create-account.dto'
import { UpdateAccountDto } from '../dtos/update-account/update-account.dto'
import { AccountEntity, ProgramEntity } from 'src/orm/entities'
import { AccountDto } from '../dtos/account.dto'

export class AccountMapper {
  static toDto(account: AccountEntity): AccountDto {
    return {
      id: account.id,
      name: account.name,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }
  }

  static toCreateEntity(program: ProgramEntity, data: CreateAccountDto): AccountEntity {
    let result = Object.assign(new AccountEntity(), program, data)

    return result
  }

  static toUpdateEntity(account: AccountEntity, data: UpdateAccountDto): AccountEntity {
    let result = Object.assign(account, data)

    return result
  }
}
