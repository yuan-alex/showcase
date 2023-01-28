module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  importOrder: ["^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-tailwindcss"),
  ],
};
