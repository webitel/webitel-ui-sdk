import convertDuration from '../convertDuration.js';

describe('Case converters', () => {
	it('duration from sec value', () => {
		const time = 111;
		const duration = '00:01:51';
		expect(convertDuration(time)).toBe(duration);
	});

	it('duration from sec string value', () => {
		const time = '61';
		const duration = '00:01:01';
		expect(convertDuration(time)).toBe(duration);
	});

	it('duration from false value', () => {
		const time = null;
		const duration = '00:00:00';
		expect(convertDuration(time)).toBe(duration);
	});

	describe('alwaysShowHours: false', () => {
		it('drops the hours segment below an hour', () => {
			expect(
				convertDuration(111, {
					alwaysShowHours: false,
				}),
			).toBe('01:51');
		});

		it('keeps the hours segment once there are hours to show', () => {
			expect(
				convertDuration(3725, {
					alwaysShowHours: false,
				}),
			).toBe('01:02:05');
		});

		it('drops the hours segment for a false value too', () => {
			expect(
				convertDuration(null, {
					alwaysShowHours: false,
				}),
			).toBe('00:00');
		});
	});

	// live timers rely on the width staying fixed as they tick past an hour
	it('keeps the hours segment by default', () => {
		expect(convertDuration(111)).toBe('00:01:51');
		expect(convertDuration(111, {})).toBe('00:01:51');
	});
});
