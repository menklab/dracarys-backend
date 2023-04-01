import { InstructionEntity } from '../../../../../orm/entities/instruction.entity'
import { ProgramEntity } from '../../../../../orm/entities'

const instructionData = {
  programId: 1,
  name: 'instruction1',
  description: 'instructionDescription1',
}

const programData = {
  id: 1,
  name: 'program1',
  coordinates: [1, 2],
  center: [1, 2],
  zoom: 50,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

const program = Object.assign(new ProgramEntity(), programData)

export const instructionMapperToCreateEntityExpectedResult = Object.assign(new InstructionEntity(), instructionData, { program })
