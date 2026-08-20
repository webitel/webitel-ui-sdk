import normalizeCSVData from '../normalizeCSVData';

describe('normalizeCSVData', () => {
	const mappings = [
		{
			// webitel field name
			name: 'name',
			// csv column name
			csv: 'col1',
			// is this webitel field required?
			required: true,
			// ui
			locale: '',
		},
		{
			name: 'phone',
			csv: [
				'col2',
				'col3',
			],
			required: true,
		},
	];

	it('normalizes simple data', () => {
		const input = [
			{
				col1: 'John',
				col2: '123',
				col3: '456',
			},
			{
				col1: 'Jane',
				col2: '789',
				col3: '012',
			},
		];
		const result = normalizeCSVData({
			data: input,
			mappings,
		});
		const output = [
			{
				name: 'John',
				phone: [
					'123',
					'456',
				],
			},
			{
				name: 'Jane',
				phone: [
					'789',
					'012',
				],
			},
		];
		expect(result).toEqual(output);
	});

	it('throws an error at normalizing data with required (!) empty value', () => {
		const input = [
			{
				col1: '',
				col2: '123',
				col3: '3424',
			},
			{
				col1: 'name',
				col2: '131312',
				col3: '012',
			},
		];
		try {
			normalizeCSVData({
				data: input,
				mappings,
			});
		} catch (err) {
			expect(err).toBeTruthy();
			return;
		}
		expect(false).toBe(true); // reject test if no error
	});

	it(`returns correct fields for mapping, including empty fields,
   if one of them is empty`, () => {
		const input = [
			{
				col1: 'name',
				col2: '123',
				col3: '',
			},
			{
				col1: 'name',
				col2: '123',
				col3: '012',
			},
		];

		const result = normalizeCSVData({
			data: input,
			mappings,
		});

		const output = [
			{
				name: 'name',
				phone: [
					'123',
					'',
				],
			},
			{
				name: 'name',
				phone: [
					'123',
					'012',
				],
			},
		];

		expect(result).toEqual(output);
	});
});
