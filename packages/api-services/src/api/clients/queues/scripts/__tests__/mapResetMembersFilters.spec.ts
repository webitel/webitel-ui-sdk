import { describe, expect, it } from 'vitest';

import {
	mapResetMembersFilters,
	mapResetMembersQuantityFilters,
} from '../mapResetMembersFilters';

describe('mapResetMembersFilters', () => {
	it('maps the datalist filter names onto the reset body', () => {
		expect(
			mapResetMembersFilters({
				agent: [
					1,
				],
				bucket: [
					2,
				],
				createdAt: {
					from: 100,
					to: 200,
				},
				memberPriority: {
					from: 1,
					to: 9,
				},
				search: 'joe',
				stopCause: [
					'cancel',
				],
			}),
		).toEqual({
			agent_id: [
				1,
			],
			bucket_id: [
				2,
			],
			created_at: {
				from: 100,
				to: 200,
			},
			priority: {
				from: 1,
				to: 9,
			},
			q: 'joe',
			stop_cause: [
				'cancel',
			],
		});
	});

	/**
	 * The members table shipped flat `from`/`to`/`cause`/`priority` names before
	 * the migration; both spellings are accepted so the two can coexist.
	 */
	it('still accepts the legacy flat filter names', () => {
		const mapped = mapResetMembersFilters({
			from: 100,
			to: 200,
			cause: [
				'cancel',
			],
			priority: {
				from: 1,
				to: 9,
			},
		});

		expect(mapped.created_at).toEqual({
			from: 100,
			to: 200,
		});
		expect(mapped.priority).toEqual({
			from: 1,
			to: 9,
		});
		expect(mapped.stop_cause).toEqual([
			'cancel',
		]);
	});

	it('leaves every bound undefined when nothing is filtered', () => {
		expect(mapResetMembersFilters()).toEqual({
			agent_id: undefined,
			bucket_id: undefined,
			created_at: {
				from: undefined,
				to: undefined,
			},
			priority: {
				from: undefined,
				to: undefined,
			},
			q: undefined,
			stop_cause: undefined,
		});
	});
});

describe('mapResetMembersQuantityFilters', () => {
	/**
	 * The count endpoint is a GET, so the nested range messages have to be
	 * spelled out as dotted query keys rather than nested objects.
	 */
	it('flattens the ranges into dotted query keys', () => {
		const mapped = mapResetMembersQuantityFilters({
			createdAt: {
				from: 100,
				to: 200,
			},
			memberPriority: {
				from: 1,
				to: 9,
			},
			search: 'joe',
		});

		expect(mapped).toEqual({
			agent_id: undefined,
			bucket_id: undefined,
			'created_at.from': 100,
			'created_at.to': 200,
			'priority.from': 1,
			'priority.to': 9,
			q: 'joe',
			stop_cause: undefined,
		});
		expect(mapped).not.toHaveProperty('created_at');
		expect(mapped).not.toHaveProperty('priority');
	});
});
