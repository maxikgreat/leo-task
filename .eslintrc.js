module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx'
      ],
      env: {
        jest: true
      },
      rules: {
        'react/react-in-jsx-scope': 'off'
      }
    }
  ],
  rules: {
    semi: ['error', 'always'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/prop-types': 'off'
  }
};
