export class InstructionElementGenericTypeMap {
  predefined_program_options = {
    name: 'Predefined Program Options',
    options: [
      {
        name: 'System',
        type: 'System',
      },
      {
        name: 'AssociatedToken',
        type: 'AssociatedToken',
      },
      {
        name: 'Token',
        type: 'Token',
      },
    ],
  }
  predefined_account_options = {
    name: 'Predefined Account Options',
    options: [
      {
        name: 'TokenAccount',
        type: 'TokenAccount',
      },
      {
        name: 'Mint',
        type: 'Mint',
      },
      {
        name: 'BPFUpgradableLoaderState',
        type: 'BPFUpgradableLoaderState',
      },
      {
        name: 'ProgramData',
        type: 'ProgramData',
      },
    ],
  }
  predefined_sysvar_options = {
    name: 'Predefined Sysvar Options',
    options: [
      {
        name: 'Rent',
        type: 'Rent',
      },
      {
        name: 'Clock',
        type: 'Clock',
      },
    ],
  }
  custom_account_options = {
    name: 'Custom Account Options',
    options: [
    ],
  }
}