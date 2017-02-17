const path = require('path');
const fs = require('fs');

const core = require('./modules/core');
const config = require('./script.config');
const data = require('./script.data');

const input = path.resolve(__dirname, 'dependencies.json');

fs.readFile(input, 'UTF8', handleFile);

function handleFile(err, response) {
	if (err) throw err;

	const file = JSON.parse(response);
	let dependencies = file.dependencies;
	let devDependencies = file.devDependencies;

	dependencies = mountDependencies(dependencies);
	devDependencies = mountDevDependencies(devDependencies);

	// ---------------------------------------------------------- //

	const dependenciesTemplate = Object.keys(dependencies.template).reduce((result, key) => {
		result += `${dependencies.template[key]} \n`;
		return result;
	}, '');

	const devDependenciesTemplate = Object.keys(devDependencies.template).reduce((result, key) => {
		result += `${devDependencies.template[key]} \n`;
		return result;
	}, '');

	const dependenciesRef = Object.keys(dependencies.ref).reduce((result, key) => {
		result += `${dependencies.ref[key]} \n`;
		return result;
	}, '');

	const devDependenciesRef = Object.keys(devDependencies.ref).reduce((result, key) => {
		result += `${devDependencies.ref[key]} \n`;
		return result;
	}, '');

	const finalData = `${dependenciesTemplate} \n ${devDependenciesTemplate} \n ${dependenciesRef} ${devDependenciesRef}`;

	fs.writeFile('dependenciesTemplate.txt', finalData);

	// ---------------------------------------------------------- //
}

function mountDependencies(dependencies) {
	const cfg = config.dependencies;
	const keys = Object.keys(dependencies);
	const dependenciesData = data.dependencies;

	return create(cfg, dependenciesData, keys);
}

function mountDevDependencies(devDependencies) {
	const cfg = config.devDependencies;
	const keys = Object.keys(devDependencies);
	const devDependenciesData = data.devDependencies;

	return create(cfg, devDependenciesData, keys);
}

function create(cfg, objData, keys) {
	const createTemplate = core.prepareToCreateTemplate(cfg, objData);

	return createTemplate(keys);
}
