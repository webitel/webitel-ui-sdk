import { describe, expect, it } from 'vitest';

import { gatewaySchema } from '../gateway.validations';

const issuePaths = (value: unknown) => {
	const result = gatewaySchema.safeParse(value);
	return result.success
		? []
		: result.error.issues.map(({ path }) => path.join('.'));
};

const registerGateway = {
	register: true,
	name: 'reg',
	account: 'sip:user@example.com',
	password: 'secret',
	proxy: 'sip.example.com',
	expires: 600,
};

const trunkingGateway = {
	register: false,
	name: 'trunk',
	proxy: '10.0.0.1',
	host: 'sip:10.0.0.2:5060',
	ipacl: [
		{
			ip: '10.0.0.3',
			proto: 'udp',
			port: 5060,
		},
	],
};

describe('gatewaySchema', () => {
	it('fills defaults for a new gateway', () => {
		expect(gatewaySchema.parse(registerGateway)).toMatchObject({
			enable: true,
			schema: {},
			ipacl: [],
		});
	});

	describe('register', () => {
		it('accepts a valid gateway', () => {
			expect(issuePaths(registerGateway)).toEqual([]);
		});

		it('requires account, proxy and password on create', () => {
			expect(
				issuePaths({
					register: true,
				}),
			).toEqual([
				'proxy',
				'account',
				'password',
			]);
		});

		it('keeps the stored password on update', () => {
			expect(
				issuePaths({
					...registerGateway,
					id: '1',
					password: '',
				}),
			).toEqual([]);
		});

		it.each([
			31,
			3601,
			null,
		])('rejects expires %j', (expires) => {
			expect(
				issuePaths({
					...registerGateway,
					expires,
				}),
			).toEqual([
				'expires',
			]);
		});

		it('rejects a password with special symbols', () => {
			expect(
				issuePaths({
					...registerGateway,
					password: 'pa$$ word',
				}),
			).toEqual([
				'password',
			]);
		});

		it('does not require trunking fields', () => {
			expect(
				issuePaths({
					...registerGateway,
					host: '',
				}),
			).toEqual([]);
		});
	});

	describe('trunking', () => {
		it('accepts a valid gateway', () => {
			expect(issuePaths(trunkingGateway)).toEqual([]);
		});

		it('requires host, proxy and every acl ip', () => {
			expect(
				issuePaths({
					register: false,
					ipacl: [
						{
							ip: '',
						},
					],
				}),
			).toEqual([
				'ipacl.0.ip',
				'proxy',
				'host',
			]);
		});

		it.each([
			'127.0.0.1',
			'0.0.0.0',
			'10.0.0',
		])('rejects acl ip %j', (ip) => {
			expect(
				issuePaths({
					...trunkingGateway,
					ipacl: [
						{
							ip,
						},
					],
				}),
			).toEqual([
				'ipacl.0.ip',
			]);
		});

		it('rejects a host that is neither ip nor fqdn', () => {
			expect(
				issuePaths({
					...trunkingGateway,
					host: 'not a host',
				}),
			).toEqual([
				'host',
			]);
		});

		it('does not check registration fields', () => {
			expect(
				issuePaths({
					...trunkingGateway,
					expires: 0,
				}),
			).toEqual([]);
		});
	});
});
