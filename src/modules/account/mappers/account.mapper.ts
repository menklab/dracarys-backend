import { CreateAccountDto } from '../dtos/create-account/create-account.dto'
import { UpdateAccountDto } from '../dtos/update-account/update-account.dto'
import { Account, Program } from 'src/orm/entities'
import { AccountDto } from '../dtos/account.dto'

export function toAccountsDto(accounts: Account[]): AccountDto[] {
  return accounts.map((account) => {
    return toAccountDto(account)
  })
}

export function toAccountDto(account: Account): AccountDto {
  return {
    id: account.id,
    name: account.name,
    created_at: account.created_at,
    updated_at: account.updated_at
  }
}

export function toCreateAccountEntity(program: Program, data: CreateAccountDto): Account {
  let result = new Account()
  result.program = program
  result.name = data.name

  return result
}

export function toUpdateAccountEntity(account: Account, data: UpdateAccountDto): Account {
  account.name = data.name

  return account
}
