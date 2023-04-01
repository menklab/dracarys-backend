import { ProgramEntity, UserEntity } from '../../../../../orm/entities'

const programData = {
  name: 'program1',
}

const userData = {
  pubKey: 'userPubkey1',
  message: 'userMessage1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

const user = Object.assign(new UserEntity(), userData)

export const programMapperToCreateEntityExpectedResult = Object.assign(new ProgramEntity(), programData, { user })
