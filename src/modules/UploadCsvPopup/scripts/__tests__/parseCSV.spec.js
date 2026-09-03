import parseCSV from '../parseCSV';

describe('parseCSV', () => {
	it('parses a csv into rows keyed by the header', async () => {
		const csv = 'col1,col2\nJohn,30';

		const result = await parseCSV(csv, {
			columns: true,
		});

		expect(result).toEqual([
			{
				col1: 'John',
				col2: '30',
			},
		]);
	});

	/*
	WTEL-10058: the parser used to coerce 'true'/'false' and JSON-looking cells
	for every consumer. Type casting belongs to whoever knows the field types —
	CRM does it in prepareCsvLookupRows. Everything here stays a string.
	 */
	it.each([
		'true',
		'false',
		'[1,2]',
		'{"a":1}',
		'42',
	])('keeps %s as a string', async (value) => {
		const csv = `col1\n"${value.replaceAll('"', '""')}"`;

		const result = await parseCSV(csv, {
			columns: true,
		});

		expect(result[0].col1).toBe(value);
	});

	it('respects a custom delimiter', async () => {
		const csv = 'col1;col2\nJohn;30';

		const result = await parseCSV(csv, {
			columns: true,
			delimiter: ';',
		});

		expect(result[0]).toEqual({
			col1: 'John',
			col2: '30',
		});
	});

	it('rejects on a malformed csv', async () => {
		const csv = 'col1,col2\n"unterminated,30\nJane,25';

		await expect(
			parseCSV(csv, {
				columns: true,
			}),
		).rejects.toBeTruthy();
	});
});
