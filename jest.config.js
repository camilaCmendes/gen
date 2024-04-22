export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "^.+\\.svg$": "jest-transformer-svg",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };