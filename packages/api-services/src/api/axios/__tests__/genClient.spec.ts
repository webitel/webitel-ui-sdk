import fs from 'node:fs';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAgentService } from '../../../gen-wire/agent-service/agent-service';
import { getDefaultAxiosInstance, setDefaultAxiosInstance } from '../genClient';

const makeFakeInstance = () => ({
	get: vi.fn().mockResolvedValue({
		data: {},
	}),
});

describe('genClient', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('generated services use an explicitly passed instance', async () => {
		const explicit = makeFakeInstance();

		// biome-ignore lint/suspicious/noExplicitAny: test double
		await getAgentService(explicit as any).searchAgent({
			size: 1,
		});

		expect(explicit.get).toHaveBeenCalledWith(
			'/call_center/agents',
			expect.objectContaining({
				params: {
					size: 1,
				},
			}),
		);
	});

	it('falls back to the built-in default instance when none was set', () => {
		const fallback = getDefaultAxiosInstance();

		expect(typeof fallback.get).toBe('function');
		expect(fallback.defaults.headers['X-Webitel-Access']).toBeDefined();
	});

	/*
	 * runs last on purpose: setDefaultAxiosInstance mutates module state shared
	 * by the whole file, and the fallback assertion above needs the built-in one.
	 */
	it('generated services use the instance set via setDefaultAxiosInstance', async () => {
		const injected = makeFakeInstance();

		// biome-ignore lint/suspicious/noExplicitAny: test double
		setDefaultAxiosInstance(injected as any);
		await getAgentService().searchAgent({
			size: 2,
		});

		expect(injected.get).toHaveBeenCalledWith(
			'/call_center/agents',
			expect.objectContaining({
				params: {
					size: 2,
				},
			}),
		);
	});
});

/*
 * Guards orval.config.ts: generated services must import their default axios
 * instance from the internal genClient module. They used to import an
 * unresolvable '@aliasedDeps/api-services/axios' specifier, which forced every
 * consumer app to declare a build-time alias.
 */
describe('generated services axios import', () => {
	const genDir = path.resolve(import.meta.dirname, '../../../gen-wire');

	const serviceFiles = fs
		.readdirSync(genDir, {
			withFileTypes: true,
		})
		.filter((entry) => entry.isDirectory() && entry.name !== '_models')
		.map((entry) => path.join(genDir, entry.name, `${entry.name}.ts`))
		.filter((file) => fs.existsSync(file));

	it('finds generated service files to check', () => {
		expect(serviceFiles.length).toBeGreaterThan(0);
	});

	it('imports axios from the internal genClient module, never from an alias', () => {
		const offenders = serviceFiles.filter((file) => {
			const source = fs.readFileSync(file, 'utf8');
			if (!source.includes('import axios from')) return false;
			return !source.includes(`import axios from '../../api/axios/genClient'`);
		});

		expect(offenders).toEqual([]);
	});
});
