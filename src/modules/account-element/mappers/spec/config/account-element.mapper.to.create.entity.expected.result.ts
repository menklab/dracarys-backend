import { AccountElementEntity } from '../../../../../orm/entities/account.element.entity'
import { AccountElementType } from '../../../../../common/enum/account.element.type'
import { AccountEntity } from '../../../../../orm/entities'

const accountElementData = {
  accountId: 1,
  name: 'accountElement1',
  type: AccountElementType.BOOL,
}

const accountData = {
  id: 1,
  name: 'account1',
  coordinates: [1, 2],
  linkedAccounts: [1, 2],
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

const account = Object.assign(new AccountEntity(), accountData)

export const accountElementMapperToCreateEntityExpectedResult = Object.assign(new AccountElementEntity(), accountElementData, { account })
