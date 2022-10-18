module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": ["error", "unix"],
    "no-nested-ternary": "off",
    "useTabs": false,
    "max-len": ["error", { code: 120 }],
    "vuejs-accessibility/click-events-have-key-events": "off",
    "vue/no-deprecated-slot-attribute": "off",
    "no-plusplus": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
      },
    ],
  },
};
