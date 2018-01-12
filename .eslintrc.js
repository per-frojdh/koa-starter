module.exports = {
  plugins: ['node', 'security'],
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:security/recommended',
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    'node/no-unsupported-features': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
  },
};
