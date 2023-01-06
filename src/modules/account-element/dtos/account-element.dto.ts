import { AccountElementTypeEnum } from 'src/orm/entities/account.element.type.enum'

export class AccountElementDto {
  id: number
  name: string
  type: AccountElementTypeEnum
  createdAt: Date
  updatedAt: Date
}
