import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';
import type { z } from 'zod';

import {
	getResourceGroupTimeRangeErrors,
	resourceGroupSchema,
} from '../resourceGroup.validations';

const issueKey = (issue: z.core.$ZodIssue) =>
	issue.code === 'custom' ? issue.params?.i18nKey : undefined;

const communication = {
	id: '1',
	name: 'Phone',
};

const validInput = {
	name: 'Group',
	communication,
	time: [
		{
			start: 540,
			end: 1200,
		},
	],
};

describe('resourceGroupSchema', () => {
	it('seeds a new group with one 9:00-20:00 range', () => {
		expect(getDefaultsFromZodSchema(resourceGroupSchema, {})).toMatchObject({
			description: '',
			time: [
				{
					start: 540,
					end: 1200,
				},
			],
		});
	});

	it('accepts a filled group', () => {
		expect(resourceGroupSchema.safeParse(validInput).success).toBe(true);
	});

	it('requires name and communication', () => {
		const result = resourceGroupSchema.safeParse({
			...validInput,
			name: '',
			communication: {},
		});

		const paths = result.error?.issues.map((issue) => issue.path.join('.'));
		expect(paths).toContain('name');
		expect(paths).toContain('communication.id');
	});

	it('requires at least one time range', () => {
		const result = resourceGroupSchema.safeParse({
			...validInput,
			time: [],
		});

		expect(result.success).toBe(false);
	});

	it('rejects a range that starts after it ends', () => {
		const result = resourceGroupSchema.safeParse({
			...validInput,
			time: [
				{
					start: 600,
					end: 540,
				},
			],
		});

		expect(result.error?.issues.map(issueKey)).toContain(
			'timerangeStartLessThanEnd',
		);
	});

	it('rejects intersecting ranges', () => {
		const result = resourceGroupSchema.safeParse({
			...validInput,
			time: [
				{
					start: 540,
					end: 720,
				},
				{
					start: 600,
					end: 800,
				},
			],
		});

		expect(result.error?.issues.map(issueKey)).toContain(
			'timerangeNotIntersect',
		);
	});
});

describe('getResourceGroupTimeRangeErrors', () => {
	it('returns nothing for valid ranges', () => {
		expect(
			getResourceGroupTimeRangeErrors([
				{
					start: 540,
					end: 600,
				},
				{
					start: 700,
					end: 800,
				},
			]),
		).toEqual([]);
	});

	it('reports a reversed range on both its ends', () => {
		expect(
			getResourceGroupTimeRangeErrors([
				{
					start: 600,
					end: 540,
				},
			]),
		).toEqual([
			{
				index: 0,
				prop: 'start',
				key: 'timerangeStartLessThanEnd',
			},
			{
				index: 0,
				prop: 'end',
				key: 'timerangeStartLessThanEnd',
			},
		]);
	});

	it('reports both ends of every intersecting range', () => {
		const errors = getResourceGroupTimeRangeErrors([
			{
				start: 540,
				end: 720,
			},
			{
				start: 1000,
				end: 1100,
			},
			{
				start: 600,
				end: 800,
			},
		]);

		expect(errors).toEqual(
			expect.arrayContaining([
				{
					index: 0,
					prop: 'start',
					key: 'timerangeNotIntersect',
				},
				{
					index: 2,
					prop: 'end',
					key: 'timerangeNotIntersect',
				},
			]),
		);
		expect(errors.some(({ index }) => index === 1)).toBe(false);
	});

	it('reports a minute outside the day', () => {
		expect(
			getResourceGroupTimeRangeErrors([
				{
					start: 0,
					end: 1440,
				},
			]),
		).toEqual([
			{
				index: 0,
				prop: 'end',
				key: 'hourRange',
			},
		]);
	});
});
