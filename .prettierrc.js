/** @type {import('prettier').Config} */
export default {
  endOfLine: 'lf',
  semi: false,
  useTabs: false,
  singleQuote: true,
  arrowParens: 'avoid',
  tabWidth: 2,
  trailingComma: 'none',
  importOrder: [
    '^react$',
    '^next/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$',
    '^@/lib/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@prettier/plugin-sort-imports']
}