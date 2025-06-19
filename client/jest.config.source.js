/** @type {import('jest').Config} */
const config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(test).ts?(x)"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
	},
};

export default config;
