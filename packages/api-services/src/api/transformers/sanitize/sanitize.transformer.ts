const sanitizeTransformer = (fieldsToSend) => (item) => {
	return Object.keys(item).reduce((sanitizedItem, key) => {
		if (fieldsToSend.indexOf(key) === -1) return sanitizedItem;
		sanitizedItem[key] = item[key];
		return sanitizedItem;
	}, {});
};

export default sanitizeTransformer;
