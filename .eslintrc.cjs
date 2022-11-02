module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "sourceType": "module",
    "project": "./tsconfig.json",
  },
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ["*.config.ts"],
  rules: {
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        "ignoreArrowShorthand": true
      }
    ],
    "@typescript-eslint/prefer-readonly": [
      "warn"
    ],
    "@typescript-eslint/semi": [
      "error",
      "never"
    ],
    "@typescript-eslint/space-before-blocks": [
      "error"
    ],
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        "allowNullableObject": true
      }
    ],
    "@typescript-eslint/switch-exhaustiveness-check": [
      "warn"
    ],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        "before": false,
        "after": true,
        "overrides": {
          "arrow": {
            "before": true,
            "after": true
          }
        }
      }
    ]
  }
};
