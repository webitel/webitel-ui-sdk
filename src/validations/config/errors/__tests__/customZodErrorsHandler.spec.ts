import { describe, expect, it } from 'vitest';
import type { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod/v4';

import { customZodErrorsHandler } from '../customZodErrorsHandler';

/** echoes the key so assertions read as "which key was asked for" */
const t = ((key: string, params?: Record<string, unknown>) =>
	params ? `${key}:${JSON.stringify(params)}` : key) as ComposerTranslation;

/** the handler is installed globally, the same way `configureZod` does it */
const parseWith = <T extends z.ZodType>(schema: T, value: unknown) => {
	z.config({
		customError: customZodErrorsHandler(t),
	});

	return schema.safeParse(value);
};

const messagesOf = (result: z.ZodSafeParseResult<unknown>) =>
	result.success ? [] : result.error.issues.map((issue) => issue.message);

describe('customZodErrorsHandler', () => {
	it('translates a custom rule by its i18nKey param', () => {
		const schema = z.number().refine((value) => value < 10, {
			params: {
				i18nKey: 'hourRange',
			},
		});

		expect(messagesOf(parseWith(schema, 100))).toEqual([
			'validation.hourRange',
		]);
	});

	it('translates a custom rule reported from superRefine', () => {
		const schema = z
			.object({
				start: z.number(),
			})
			.superRefine((_, ctx) => {
				ctx.addIssue({
					code: 'custom',
					path: [
						'start',
					],
					params: {
						i18nKey: 'timerangeStartLessThanEnd',
					},
				});
			});

		expect(
			messagesOf(
				parseWith(schema, {
					start: 1,
				}),
			),
		).toEqual([
			'validation.timerangeStartLessThanEnd',
		]);
	});

	it('leaves a custom rule without an i18nKey to zod', () => {
		const schema = z.number().refine((value) => value < 10);

		expect(messagesOf(parseWith(schema, 100))).toEqual([
			'Invalid input',
		]);
	});

	it('still reports an empty required field as required', () => {
		const schema = z.object({
			name: z.string().min(1),
		});

		expect(
			messagesOf(
				parseWith(schema, {
					name: '',
				}),
			),
		).toEqual([
			'validation.required',
		]);
	});

	it('reports a too short string by length', () => {
		const schema = z.object({
			name: z.string().min(3),
		});

		expect(
			messagesOf(
				parseWith(schema, {
					name: 'ab',
				}),
			),
		).toEqual([
			'validation.minLength:{"min":3}',
		]);
	});
});
