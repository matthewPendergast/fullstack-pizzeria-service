/** @type {import('jest').Config} */
const config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(test).ts?(x)"],
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.test.json",
				diagnostics: {
					ignoreCodes: [1343],
				},
				astTransformers: {
					before: [
						{
							path: "node_modules/ts-jest-mock-import-meta",
							options: {
								metaObjectReplacement: {
									url: "https://localhost:5000",
								},
							},
						},
					],
				},
			},
		],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

export default config;
