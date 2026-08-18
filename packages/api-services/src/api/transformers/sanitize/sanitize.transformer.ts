const sanitizeTransformer =
	(fieldsToSend: string[]) => (item: Record<string, unknown>) => {
		return Object.keys(item).reduce<Record<string, unknown>>(
			(sanitizedItem, key) => {
				if (fieldsToSend.indexOf(key) === -1) return sanitizedItem;
				sanitizedItem[key] = item[key];
				return sanitizedItem;
			},
			{},
		);
	};

export default sanitizeTransformer;
