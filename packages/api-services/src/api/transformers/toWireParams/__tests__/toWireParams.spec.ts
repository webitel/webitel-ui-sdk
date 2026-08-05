import { describe, expect, it } from 'vitest';

import toWireParams from '../toWireParams.transformer';

const FILE_FIELDS = [
	'page',
	'size',
	'q',
	'sort',
	'fields',
	'id',
	'uploaded_at.from',
	'uploaded_at.to',
	'uploaded_by',
	'reference_id',
	'channel',
	'retention_until.from',
	'retention_until.to',
];

const DIALOG_FIELDS = [
	'page',
	'size',
	'q',
	'via.id',
	'via.name',
	'date.since',
	'online',
	'group[string]',
];

describe('toWireParams', () => {
	it('renames dotted range filters', () => {
		expect(
			toWireParams(FILE_FIELDS)({
				uploadedAtFrom: 'a',
				uploadedAtTo: 'b',
				retentionUntilFrom: 'c',
			}),
		).toEqual({
			'uploaded_at.from': 'a',
			'uploaded_at.to': 'b',
			'retention_until.from': 'c',
		});
	});

	it('renames plain snake_case params', () => {
		expect(
			toWireParams(FILE_FIELDS)({
				uploadedBy: [
					'1',
				],
				referenceId: [
					'2',
				],
			}),
		).toEqual({
			uploaded_by: [
				'1',
			],
			reference_id: [
				'2',
			],
		});
	});

	it('renames nested and bracketed params', () => {
		expect(
			toWireParams(DIALOG_FIELDS)({
				viaId: '1',
				viaName: 'chat',
				dateSince: '2',
				groupString: 'x',
			}),
		).toEqual({
			'via.id': '1',
			'via.name': 'chat',
			'date.since': '2',
			'group[string]': 'x',
		});
	});

	it('leaves keys that need no rename and keys not in the list', () => {
		expect(
			toWireParams(FILE_FIELDS)({
				page: 1,
				q: 'term',
				online: true,
			}),
		).toEqual({
			page: 1,
			q: 'term',
			online: true,
		});
	});

	it('passes already-wire-spelled keys through untouched', () => {
		expect(
			toWireParams(FILE_FIELDS)({
				'uploaded_at.from': 'a',
			}),
		).toEqual({
			'uploaded_at.from': 'a',
		});
	});

	it('matches names that camelisation cannot round-trip', () => {
		const fields = [
			'sha256sum',
			'@type',
			'tls.PEM',
			'input.userID.id',
		];

		expect(
			toWireParams(fields)({
				sha256Sum: 'a',
				'@type': 'b',
				tlsPem: 'c',
				inputUserIdId: 'd',
			}),
		).toEqual({
			sha256sum: 'a',
			'@type': 'b',
			'tls.PEM': 'c',
			'input.userID.id': 'd',
		});
	});

	it('does not invent keys the caller omitted', () => {
		expect(
			Object.keys(
				toWireParams(FILE_FIELDS)({
					page: 1,
				}),
			),
		).toEqual([
			'page',
		]);
	});
});
