// craco.config.js
module.exports = {
  jest: {
    configure: {
      moduleFileExtensions: ["js", "jsx", "ts", "tsx", "cjs", "mjs"],
      transform: {
        "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
      },
      // Whitelist axios, react-pull-to-refresh, etc.
      transformIgnorePatterns: [
        "node_modules[/\\\\](?!axios|react-pull-to-refresh|@mui/material|@emotion/react|@emotion/styled|react-router-dom|framer-motion)"
      ],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      moduleNameMapper: {
        "^react/jsx-runtime$": "<rootDir>/node_modules/react/jsx-runtime.js",
        "^react$": "<rootDir>/node_modules/react",
        "^react-dom$": "<rootDir>/node_modules/react-dom",
        "^axios$": "<rootDir>/__mocks__/axios.js",
        "^react-pull-to-refresh$": "<rootDir>/__mocks__/react-pull-to-refresh.js"
      },
    },
  },
};
