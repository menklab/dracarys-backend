import { ProgramEntity } from '../../../../../orm/entities'

const programData = {
  id: 1,
  name: 'program2',
  coordinates: [3, 4],
  center: [5, 6],
  zoom: 65,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const programMapperToUpdateEntityExpectedResult = Object.assign(new ProgramEntity(), programData)
