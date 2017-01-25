const fs = require('fs');
const utils = require('./modules/utils');
const config = require('./modules/config/script.config');
const data = require('./data');

fs.readFile('./package.json', 'UTF8', handleFile);

function handleFile(err, response) {
	if (err) throw err;

	const file = JSON.parse(response);
	let dependencies = file.dependencies;
	let devDependencies = file.devDependencies;

	dependencies = mountDependencies(dependencies);
	devDependencies = mountDevDependencies(devDependencies);

	console.log(dependencies);
	console.log(devDependencies);
}

function mountDependencies(dependencies) {
	const cfg = config.dependencies;
	const keys = Object.keys(dependencies);
	const length = utils.getTheBiggestIndex(keys);

	return create(length, keys, cfg);
}

function mountDevDependencies(devDependencies) {
	const cfg = config.devDependencies;
	const keys = Object.keys(devDependencies);
	const length = utils.getTheBiggestIndex(keys);

	return create(length, keys, cfg);
}

function create(length, keys, cfg) {
	const createTemplate = utils.prepareToCreateTemplate(length, cfg, data);

	const output = createTemplate(keys);
	return output;
}
