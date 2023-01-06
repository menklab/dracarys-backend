import { AccountElementType } from 'src/common/enum/account.element.type'

export class AccountElementDto {
  id: number
  name: string
  type: AccountElementType
  createdAt: Date
  updatedAt: Date
}
