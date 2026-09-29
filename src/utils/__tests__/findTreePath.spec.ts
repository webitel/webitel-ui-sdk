import { describe, expect, it } from 'vitest';

import { findTreePath } from '../findTreePath';

interface Service {
	id: string;
	name: string;
	service?: Service[];
}

const services: Service[] = [
	{
		id: 'billing',
		name: 'Billing',
		service: [
			{
				id: 'refunds',
				name: 'Refunds',
				service: [
					{
						id: 'card',
						name: 'Card refund',
					},
				],
			},
		],
	},
	{
		id: 'support',
		name: 'Support',
	},
];

const byId = (id: string) => (service: Service) => service.id === id;

describe('findTreePath', () => {
	it('returns the nodes from the root down to the target', () => {
		expect(
			findTreePath(services, byId('card'), 'service')?.map(({ name }) => name),
		).toEqual([
			'Billing',
			'Refunds',
			'Card refund',
		]);
	});

	it('returns a one-node path for a root', () => {
		expect(findTreePath(services, byId('support'), 'service')).toEqual([
			services[1],
		]);
	});

	it('returns null when nothing matches, or there is no tree', () => {
		expect(findTreePath(services, byId('missing'), 'service')).toBeNull();
		expect(findTreePath(undefined, byId('card'), 'service')).toBeNull();
		expect(findTreePath([], byId('card'), 'service')).toBeNull();
	});

	it('stops at the first match, depth first', () => {
		const tree = [
			{
				id: 'a',
				children: [
					{
						id: 'x',
					},
				],
			},
			{
				id: 'x',
			},
		];

		expect(
			findTreePath(tree, (node) => node.id === 'x', 'children')?.map(
				({ id }) => id,
			),
		).toEqual([
			'a',
			'x',
		]);
	});
});
