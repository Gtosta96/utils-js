const utils = {
	getTheBiggestIndex,
	prepareToCreateTemplate
};

function getTheBiggestIndex(array) {
	return array.sort((prev, cur) => prev.length - cur.length)[array.length - 1].length;
}

function prepareToCreateTemplate(numberOfSpaces, config, data) {
	const minRange = config.minRange;
	const maxRange = config.maxRange;
	let counter = minRange;

	return function createTemplate(keys) {
		const resultTemplate = keys.reduce((result, cur) => {
			let spaces = '';
			let template;
			let ref;
			let description;

			let diff = numberOfSpaces - cur.length;
			while (diff >= 0) diff -= 1; spaces += ' ';

			if (counter <= maxRange) {
				const index = `[${counter}]`;
				template = `| ${cur}${index}${spaces} |`;
				ref = `${index}: ${data[cur].url}`;
				description = `${data[cur].description}`;

				result.template.push(template);
				result.ref.push(ref);
				result.description.push(description);

				counter += 1;

				return result;
			}

			console.error('[OutOfRange], adjust min and max range in config (%i ~ %i)', minRange, maxRange);
			return null;
		}, { template: [], ref: [], description: [] });

		return resultTemplate;
	};
}

module.exports = utils;
