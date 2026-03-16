import { parse } from 'csv-parse/browser/esm';

const parseCSV = (csvStr, options = {}) =>
	new Promise((resolve, reject) => {
		parse(
			csvStr,
			{
				columns: true,
				cast: (value, context) => {
					if (typeof value !== 'string') return value;

					const trimmed = value.trim();

					// boolean
					if (trimmed === 'true') return true;
					if (trimmed === 'false') return false;

					// array / object (JSON)
					if (
						(trimmed.startsWith('[') && trimmed.endsWith(']')) ||
						(trimmed.startsWith('{') && trimmed.endsWith('}'))
					) {
						try {
							return JSON.parse(trimmed);
						} catch {
							return value;
						}
					}

					return value;
				},
				...options,
			},
			(err, output) => {
				if (err) reject(err);
				else resolve(output);
			},
		);
	});

export default parseCSV;
