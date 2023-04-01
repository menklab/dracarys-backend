import { CreateProgramDto } from '../../../dtos/create-program/create-program.dto'
import { UserEntity } from '../../../../../orm/entities'

const userData = {
  pubKey: 'userPubkey1',
  message: 'userMessage1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const programMapperToCreateEntityIncomeData: CreateProgramDto = {
  name: 'program1',
}

export const programMapperToCreateEntityIncomeDataUser = Object.assign(new UserEntity(), userData)
