import { UpdateAccountElementDto } from '../../../dtos/update-account-element/update-account-element.dto'
import { AccountElementEntity } from '../../../../../orm/entities/account.element.entity'
import { AccountElementType } from '../../../../../common/enum/account.element.type'

const accountElementData = {
  id: 1,
  name: 'accountElement1',
  type: AccountElementType.BOOL,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const accountElementMapperToUpdateEntityIncomeData: UpdateAccountElementDto = {
  name: 'accountElement2',
  type: AccountElementType.I32,
}

export const accountElementMapperToUpdateEntityIncomeDataAccount = Object.assign(new AccountElementEntity(), accountElementData)
