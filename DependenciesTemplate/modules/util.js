const util = {
	reduceData,
	getTheBiggestIndex,
	setSpaces,
	setDivisor
};

function reduceData(data, keys) {
	const reducedData = data.reduce((result, cur) => {
		Object.keys(cur).forEach((key) => {
			if (!result[key]) Object.assign(result, { [key]: [] });

			result[key].push(cur[key]);
		});

		return result;
	}, {});

	keys.forEach((attribute) => {
		if (reducedData.name.indexOf(attribute) === -1) {
			console.warn('Não existem dados para a dependencia [%s]', attribute.toUpperCase());
		}
	});

	return reducedData;
}

function getTheBiggestIndex(array) {
	return array.sort((prev, cur) => prev.length - cur.length)[array.length - 1].length;
}

function setDivisor(numberOfSpaces, isWrapped) {
	return setSpaces(numberOfSpaces, 0, isWrapped).replace(/\s/g, '-');
}

function setSpaces(numberOfSpaces, length, isWrapped) {
	let space = '';
	let diff = Math.abs((isWrapped ? (numberOfSpaces + 2) : numberOfSpaces) - length);
	while (diff > 0) {
		space += ' ';
		diff -= 1;
	}

	return space;
}

module.exports = util;
