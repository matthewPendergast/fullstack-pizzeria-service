import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
	moduleFileExtensions: ["ts", "js", "json"],
};

export default config;
