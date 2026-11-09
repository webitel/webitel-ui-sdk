import { PasswordCategories } from '../../enums/PasswordCategories/PasswordCategories.enum';
import { generatePassword } from '../generatePassword';

describe('generatePassword', () => {
	it('generates 12 chars by default', () => {
		expect(generatePassword()).toHaveLength(12);
	});

	it('contains every default category', () => {
		for (let i = 0; i < 50; i += 1) {
			const password = generatePassword();
			expect(password).toMatch(/[a-z]/);
			expect(password).toMatch(/[A-Z]/);
			expect(password).toMatch(/\d/);
			expect(password).toMatch(/[^a-zA-Z\d]/);
		}
	});

	it('respects a custom length', () => {
		expect(
			generatePassword({
				length: 20,
			}),
		).toHaveLength(20);
	});

	it('uses only the passed categories', () => {
		for (let i = 0; i < 50; i += 1) {
			const password = generatePassword({
				categories: [
					PasswordCategories.Lowercase,
					PasswordCategories.Digits,
				],
			});
			expect(password).toMatch(/^[a-z\d]+$/);
			expect(password).toMatch(/[a-z]/);
			expect(password).toMatch(/\d/);
		}
	});

	it('does not contain excluded values', () => {
		for (let i = 0; i < 50; i += 1) {
			const password = generatePassword({
				length: 4,
				categories: [
					PasswordCategories.Lowercase,
				],
				exclude: [
					'A',
					'b',
					'',
				],
			});
			expect(password).not.toMatch(/[ab]/);
		}
	});

	it('throws without categories', () => {
		expect(() =>
			generatePassword({
				categories: [],
			}),
		).toThrow();
	});
});
