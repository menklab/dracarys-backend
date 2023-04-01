import { AccountEntity } from '../../../../../orm/entities'

const accountData = {
  id: 1,
  name: 'account1',
  coordinates: [1, 2],
  linkedAccounts: [1, 2],
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const accountMapperToDtoIncomeData = Object.assign(new AccountEntity(), accountData)
