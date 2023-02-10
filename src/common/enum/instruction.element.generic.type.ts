export enum InstructionElementGenericType {
  // Predefined Program Options:
  SYSTEM = 'System',
  ASSOCIATED_TOKEN = 'AssociatedToken',
  TOKEN = 'Token',
  // Predefined Account Options:
  TOKEN_ACCOUNT = 'TokenAccount',
  MINT = 'Mint',
  BPF_UPGRADABLE_LOADER_STATE = 'BPFUpgradableLoaderState',
  PROGRAM_DATA = 'ProgramData',
  // Predefined Sysvar Options:
  RENT = 'Rent',
  CLOCK = 'Clock',
  // Custom Account Option:
  CUSTOM_ACCOUNT = 'CustomAccount'
}

