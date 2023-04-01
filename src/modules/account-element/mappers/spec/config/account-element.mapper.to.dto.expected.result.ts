import { AccountElementType } from '../../../../../common/enum/account.element.type'
import { AccountElementDto } from '../../../dtos/account-element.dto'

export const accountElementMapperToDtoExpectedResult: AccountElementDto = {
  id: 1,
  name: 'accountElement1',
  type: AccountElementType.BOOL,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}
