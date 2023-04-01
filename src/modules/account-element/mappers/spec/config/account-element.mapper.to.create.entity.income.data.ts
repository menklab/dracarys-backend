import { CreateAccountElementDto } from '../../../dtos/create-account-element/create-account-element.dto'
import { AccountElementType } from '../../../../../common/enum/account.element.type'
import { AccountEntity } from '../../../../../orm/entities'

const accountData = {
  id: 1,
  name: 'account1',
  coordinates: [1, 2],
  linkedAccounts: [1, 2],
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const accountElementMapperToCreateEntityIncomeData: CreateAccountElementDto = {
  accountId: 1,
  name: 'accountElement1',
  type: AccountElementType.BOOL,
}

export const accountElementMapperToCreateEntityIncomeDataAccount = Object.assign(new AccountEntity(), accountData)
