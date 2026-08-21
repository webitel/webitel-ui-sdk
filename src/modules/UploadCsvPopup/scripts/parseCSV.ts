import { type Options, parse } from 'csv-parse/browser/esm';

const parseCSV = (csvStr: string, options: Options = {}): Promise<unknown[]> =>
	new Promise((resolve, reject) => {
		parse(
			csvStr,
			{
				columns: true,
				...options,
			},
			(err, output) => {
				if (err) reject(err);
				else resolve(output);
			},
		);
	});

export default parseCSV;
