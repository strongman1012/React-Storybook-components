/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	// Specifies the preset to use for running tests with TypeScript
	preset: 'ts-jest',
	// Specifies the test environment to use (in this case, jsdom)
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	// Specifies the module name mappings for importing test utilities
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},
	modulePaths: ['<rootDir>'],
    // testMatch: [
    //     "<rootDir>/src/components/link-budget/__tests__/link-budget.test.tsx"
    // ],
    // setupFilesAfterEnv: [
    //     "<rootDir>/src/components/link-budget/__tests__/jest.setup.ts"
    // ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
    },
	//dont run anything in the dist folder
	testPathIgnorePatterns: ['dist'],
	// Specifies whether to enable fake timers globally
	fakeTimers: { 'enableGlobally': true },
	transformIgnorePatterns: [
		"node_modules/(?!(uuid)/)",
		'\\.pnp\\.[^\\\/]+$',
		'\\.(css|sass|scss)$',
	],
	modulePathIgnorePatterns: ['node_modules', 'jest-test-results.json'],

};