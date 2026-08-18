import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { createFilterPresetsStore } from '../createFilterPresetsStore';

const NAMESPACE = 'test';
const STORAGE_KEY = `${NAMESPACE}/presets/preset`;
const CACHED_PRESET_ID = 42;

const setupStore = async () => {
	const store = createFilterPresetsStore(NAMESPACE)();
	await store.setupPresetPersistence();

	return store;
};

describe('filter presets persistence', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
	});

	it('restores the cached preset id', async () => {
		localStorage.setItem(STORAGE_KEY, String(CACHED_PRESET_ID));

		const store = await setupStore();

		expect(store.presetId).toBe(CACHED_PRESET_ID);
	});

	/*
   restore() snapshots the value through onStore before reading the storages,
    so an onStore that clears used to delete the cached preset on every setup
   */
	it('keeps the cached preset id stored while restoring it', async () => {
		localStorage.setItem(STORAGE_KEY, String(CACHED_PRESET_ID));

		await setupStore();

		expect(localStorage.getItem(STORAGE_KEY)).toBe(String(CACHED_PRESET_ID));
	});

	it('leaves presetId empty when nothing is cached, instead of NaN', async () => {
		const store = await setupStore();

		expect(store.presetId).toBeNull();
	});

	it('drops the cached preset on resetPreset', async () => {
		localStorage.setItem(STORAGE_KEY, String(CACHED_PRESET_ID));
		const store = await setupStore();

		await store.resetPreset();

		expect(store.presetId).toBeNull();
		expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
	});
});
