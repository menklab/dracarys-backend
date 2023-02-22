export class AccountDto {
  id: number
  name: string
  coordinates: Array<number>
  linkedAccounts: Array<number>
  createdAt: Date
  updatedAt: Date
}
