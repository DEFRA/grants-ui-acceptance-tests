/**
 * Prettier config
 * @type {Config}
 */
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 300,
  overrides: [
    {
      files: '*.md',
      options: {
        embeddedLanguageFormatting: 'off',
        singleQuote: false
      }
    },
    {
      files: '*.scss',
      options: {
        printWidth: 150,
        singleQuote: false
      }
    }
  ]
}

/**
 * @import { Config } from 'prettier'
 */
