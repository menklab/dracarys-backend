import { AccountDto } from 'src/modules/account/dtos/account.dto'

export const accountMapperToDtoExpectedResult: AccountDto = {
  id: 1,
  name: 'account1',
  coordinates: [1, 2],
  linkedAccounts: [1, 2],
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}
