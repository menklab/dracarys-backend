import { ProgramDto } from '../../../dtos/program.dto'

export const programMapperToDtoExpectedResult: ProgramDto = {
  id: 1,
  name: 'program1',
  coordinates: [1, 2],
  center: [1, 2],
  zoom: 50,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}
