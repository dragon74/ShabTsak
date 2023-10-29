module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react", "react-refresh"],
  rules: {
    "import/no-unresolved": 0, // Add this line
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-no-undef": 2,
  },
};
