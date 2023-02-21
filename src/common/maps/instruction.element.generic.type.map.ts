import { InstructionElementGenericType } from '../enum/instruction.element.generic.type'

export class InstructionElementGenericTypeMap {
  predefined_program_options = {
    name: 'Predefined Program Options',
    options: [
      {
        id: null,
        name: InstructionElementGenericType.SYSTEM,
        type: InstructionElementGenericType.SYSTEM,
      },
      {
        id: null,
        name: InstructionElementGenericType.ASSOCIATED_TOKEN,
        type: InstructionElementGenericType.ASSOCIATED_TOKEN,
      },
      {
        id: null,
        name: InstructionElementGenericType.TOKEN,
        type: InstructionElementGenericType.TOKEN,
      },
    ],
  }
  predefined_account_options = {
    name: 'Predefined Account Options',
    options: [
      {
        id: null,
        name: InstructionElementGenericType.TOKEN_ACCOUNT,
        type: InstructionElementGenericType.TOKEN_ACCOUNT,
      },
      {
        id: null,
        name: InstructionElementGenericType.MINT,
        type: InstructionElementGenericType.MINT,
      },
      {
        id: null,
        name: InstructionElementGenericType.BPF_UPGRADABLE_LOADER_STATE,
        type: InstructionElementGenericType.BPF_UPGRADABLE_LOADER_STATE,
      },
      {
        id: null,
        name: InstructionElementGenericType.PROGRAM_DATA,
        type: InstructionElementGenericType.PROGRAM_DATA,
      },
    ],
  }
  predefined_sysvar_options = {
    name: 'Predefined Sysvar Options',
    options: [
      {
        id: null,
        name: InstructionElementGenericType.RENT,
        type: InstructionElementGenericType.RENT,
      },
      {
        id: null,
        name: InstructionElementGenericType.CLOCK,
        type: InstructionElementGenericType.CLOCK,
      },
    ],
  }
  custom_account_options = {
    name: 'Custom Account Options',
    options: [
    ],
  }
}