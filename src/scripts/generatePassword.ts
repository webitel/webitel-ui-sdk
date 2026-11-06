// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
// local password generator for places without a backend generator (e.g. domain signup).
// Defaults follow the backend password rules used when no password settings are set:
// 12 chars, lower + upper + digit + special, must not contain the login.
// Categories are the same PasswordCategories as in the password_categories system setting

import { PasswordCategories } from '../enums/PasswordCategories/PasswordCategories.enum';

const CHARSETS: Record<PasswordCategories, string> = {
	[PasswordCategories.Lowercase]: 'abcdefghijklmnopqrstuvwxyz',
	[PasswordCategories.Uppercase]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	[PasswordCategories.Digits]: '0123456789',
	[PasswordCategories.Special]: '!@#$%^&*-_=+?',
};

export interface GeneratePasswordOptions {
	length?: number;
	categories?: PasswordCategories[];
	/** [Claude] substrings the password must not contain (case-insensitive), e.g. the login */
	exclude?: string[];
}

const MAX_ATTEMPTS = 100;

const randomIndex = (max: number): number => {
	const buffer = new Uint32Array(1);
	crypto.getRandomValues(buffer);
	return buffer[0] % max;
};

const pick = (charset: string): string => charset[randomIndex(charset.length)];

const shuffle = (chars: string[]): string[] => {
	const result = [
		...chars,
	];
	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = randomIndex(i + 1);
		[result[i], result[j]] = [
			result[j],
			result[i],
		];
	}
	return result;
};

const generateOnce = (
	length: number,
	categories: PasswordCategories[],
): string => {
	const charsets = categories.map((category) => CHARSETS[category]);
	const allChars = charsets.join('');

	// [Claude] at least one char of every category, the rest from all of them
	const required = charsets.map(pick);
	const rest = Array.from(
		{
			length: Math.max(length - required.length, 0),
		},
		() => pick(allChars),
	);

	return shuffle([
		...required,
		...rest,
	]).join('');
};

const containsExcluded = (password: string, exclude: string[]): boolean => {
	const lowered = password.toLowerCase();
	return exclude.some(
		(value) => !!value && lowered.includes(value.toLowerCase()),
	);
};

export const generatePassword = ({
	length = 12,
	categories = [
		PasswordCategories.Lowercase,
		PasswordCategories.Uppercase,
		PasswordCategories.Digits,
		PasswordCategories.Special,
	],
	exclude = [],
}: GeneratePasswordOptions = {}): string => {
	if (!categories.length) {
		throw new Error('generatePassword: at least one category is required');
	}

	let password = generateOnce(length, categories);
	for (
		let attempt = 1;
		attempt < MAX_ATTEMPTS && containsExcluded(password, exclude);
		attempt += 1
	) {
		password = generateOnce(length, categories);
	}
	return password;
};

export default generatePassword;
