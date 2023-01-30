module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  importOrder: ["^@showcasejs/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
