module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'filename-rules'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.hbs'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-named-export': 'off',
    'class-methods-use-this': 'off',
    'prefer-template': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      {
        selector: ['variableLike', 'memberLike'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
    'filename-rules/match': [2, 'kebab-case'],
  },
  overrides: [
    {
      'files': ['src/orm/migrations/*.ts', 'src/orm/seeds/**/*.ts'],
      'rules': {
        'filename-rules/match': 'off',
      }
    }
  ]
};
