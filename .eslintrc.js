module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier", "only-warn"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
