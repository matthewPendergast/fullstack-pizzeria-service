const { pathToFileURL } = require("url");

module.exports = (async () => {
	const configModule = await import(pathToFileURL("./jest.config.source.js"));
	return configModule.default;
})();
