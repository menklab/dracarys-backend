import { UpdateProgramDto } from '../../../dtos/update-program/update-program.dto'
import { ProgramEntity } from '../../../../../orm/entities'

const programData = {
  id: 1,
  name: 'program1',
  coordinates: [1, 2],
  center: [2, 3],
  zoom: 50,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const programMapperToUpdateEntityIncomeData: UpdateProgramDto = {
  name: 'program2',
  coordinates: [3, 4],
  center: [5, 6],
  zoom: 65,
}

export const programMapperToUpdateEntityIncomeDataProgram = Object.assign(new ProgramEntity(), programData)
