const util = require('./util');

const logic = {
	prepareToCreateTemplate
};

function prepareToCreateTemplate(config, data) {
	debugger;
	let spacesArray;
	return function createTemplate(keys) {
		const reducedData = util.reduceData(data, keys);

		spacesArray = Object.keys(reducedData).reduce((result, cur) => {
			const array = reducedData[cur];
			if (!result[cur]) Object.assign(result, { [cur]: [] });

			const numberOfSpaces = util.getTheBiggestIndex(array);
			Object.assign(result, { [cur]: numberOfSpaces });

			return result;
		}, {});

		const resultTemplate = keys.reduce((result, cur) => {
			Object.keys(data).forEach((index) => {
				const curData = data[index];

				if (curData.name === cur) {
					const bodySpaces = Object.keys(curData).reduce((_result, key) => {
						const space = util.setSpaces(spacesArray[key], curData[key].length);
						Object.assign(_result, { [key]: space });

						return _result;
					}, {});

					const template = `| [${curData.name}]${bodySpaces.name} | ${curData.description}${bodySpaces.description} |`;
					const ref = `[${cur}]: ${curData.url}`;

					result.template.push(template);
					result.ref.push(ref);
				}
			});

			return result;
		}, { template: [], ref: [] });

		const headerArray = Object.keys(config.columns).reduce((result, key) => {
			const curHeader = config.columns[key];

			const isMainValue = key === 'name';
			const divisorSpace = util.setDivisor(spacesArray[key], isMainValue);
			const headerSpace = util.setSpaces(spacesArray[key], curHeader.length, isMainValue);

			const headerTemplate = `| ${curHeader + headerSpace} |`;
			const divisorTemplate = `| ${divisorSpace} |`;

			result.header.push(headerTemplate);
			result.divisor.push(divisorTemplate);

			return result;
		}, { header: [], divisor: [] });

		const divisor = headerArray.divisor.join().replace(',|', '');
		const header = headerArray.header.join().replace(',|', '');

		resultTemplate.template.unshift(divisor);
		resultTemplate.template.unshift(header);

		return resultTemplate;
	};
}

module.exports = logic;
