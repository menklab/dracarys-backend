import { AccountElementEntity } from '../../../../../orm/entities/account.element.entity'
import { AccountElementType } from '../../../../../common/enum/account.element.type'

const accountElementData = {
  id: 1,
  name: 'accountElement1',
  type: AccountElementType.BOOL,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const accountElementMapperToDtoIncomeData = Object.assign(new AccountElementEntity(), accountElementData)
