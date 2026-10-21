import { ConfigurationsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
	createSystemSettingsStore,
	type SystemSettingChange,
} from '../systemSettingsStore';

vi.mock('@webitel/api-services/api', () => ({
	ConfigurationsAPI: {
		getList: vi.fn(),
	},
}));

const getList = vi.mocked(ConfigurationsAPI.getList);

const useSystemSettingsStore = createSystemSettingsStore({
	names: [
		EngineSystemSettingName.WbtHideContact,
		EngineSystemSettingName.ShowFullContact,
	],
});

describe('SystemSettingsStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		getList.mockReset();
		getList.mockResolvedValue({
			items: [],
		});
	});

	it('initialize loads all tracked settings with a single request, even if called several times', async () => {
		getList.mockResolvedValue({
			items: [
				{
					name: EngineSystemSettingName.ShowFullContact,
					value: true,
				},
			],
		});
		const store = useSystemSettingsStore();

		await Promise.all([
			store.initialize(),
			store.initialize(),
		]);

		expect(getList).toHaveBeenCalledTimes(1);
		expect(getList).toHaveBeenCalledWith({
			name: [
				EngineSystemSettingName.WbtHideContact,
				EngineSystemSettingName.ShowFullContact,
			],
		});
		expect(store.settings[EngineSystemSettingName.ShowFullContact]).toBe(true);
		expect(
			store.settings[EngineSystemSettingName.WbtHideContact],
		).toBeUndefined();
	});

	it('initialize loads settings again after a failed load', async () => {
		getList.mockRejectedValueOnce(new Error('network'));
		const store = useSystemSettingsStore();

		await expect(store.initialize()).rejects.toThrow('network');
		await store.initialize();

		expect(getList).toHaveBeenCalledTimes(2);
	});

	it('reload loads settings again after initialize', async () => {
		const store = useSystemSettingsStore();
		await store.initialize();
		getList.mockResolvedValue({
			items: [
				{
					name: EngineSystemSettingName.WbtHideContact,
					value: true,
				},
			],
		});

		await store.reload();

		expect(getList).toHaveBeenCalledTimes(2);
		expect(store.settings[EngineSystemSettingName.WbtHideContact]).toBe(true);
	});

	it('applyChange applies the value from the event, including falsy values, without a request', async () => {
		const store = useSystemSettingsStore();

		await store.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
			value: true,
		});
		expect(store.settings[EngineSystemSettingName.WbtHideContact]).toBe(true);

		await store.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
			value: false,
		});
		expect(store.settings[EngineSystemSettingName.WbtHideContact]).toBe(false);

		expect(getList).not.toHaveBeenCalled();
	});

	it('applyChange re-reads the setting if the event has no value', async () => {
		const store = useSystemSettingsStore();
		await store.applyChange({
			name: EngineSystemSettingName.ShowFullContact,
			value: true,
		});

		await store.applyChange({
			name: EngineSystemSettingName.ShowFullContact,
		});

		expect(getList).toHaveBeenCalledWith({
			name: [
				EngineSystemSettingName.ShowFullContact,
			],
		});
		expect(
			store.settings[EngineSystemSettingName.ShowFullContact],
		).toBeUndefined();
	});

	it('applyChange ignores settings that are not tracked by the store', async () => {
		const store = useSystemSettingsStore();

		await store.applyChange({
			name: 'some_future_setting',
			value: 1,
		});
		await store.applyChange({
			name: EngineSystemSettingName.CallEndSoundNotification,
		});

		expect(store.settings).toEqual({});
		expect(getList).not.toHaveBeenCalled();
	});

	it('does not send requests if no settings are tracked', async () => {
		const store = createSystemSettingsStore({
			namespace: 'emptySystemSettings',
			names: [],
		})();

		await store.initialize();
		await store.reload();
		await store.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
		});

		expect(getList).not.toHaveBeenCalled();
		expect(store.settings).toEqual({});
	});

	it('subscribe applies "system_settings_changed" events of the passed client', () => {
		const store = useSystemSettingsStore();
		let emit: (change: SystemSettingChange) => void = () => {};
		const client = {
			on: vi.fn((_event, listener) => {
				emit = listener;
			}),
		};

		store.subscribe(client);
		emit({
			name: EngineSystemSettingName.WbtHideContact,
			value: true,
		});

		expect(client.on).toHaveBeenCalledWith(
			'system_settings_changed',
			expect.any(Function),
		);
		expect(store.settings[EngineSystemSettingName.WbtHideContact]).toBe(true);
	});
});
