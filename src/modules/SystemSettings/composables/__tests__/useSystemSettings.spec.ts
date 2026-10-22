import { ConfigurationsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { createPinia, defineStore, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Client } from 'webitel-sdk';

import {
	type SystemSettingChange,
	useSystemSettings,
} from '../useSystemSettings';

vi.mock('@webitel/api-services/api', () => ({
	ConfigurationsAPI: {
		getList: vi.fn(),
	},
}));

const getList = vi.mocked(ConfigurationsAPI.getList);

const createSystemSettings = () =>
	useSystemSettings([
		EngineSystemSettingName.WbtHideContact,
		EngineSystemSettingName.ShowFullContact,
	]);

describe('useSystemSettings', () => {
	beforeEach(() => {
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
		const systemSettings = createSystemSettings();

		await Promise.all([
			systemSettings.initialize(),
			systemSettings.initialize(),
		]);

		expect(getList).toHaveBeenCalledTimes(1);
		expect(getList).toHaveBeenCalledWith({
			name: [
				EngineSystemSettingName.WbtHideContact,
				EngineSystemSettingName.ShowFullContact,
			],
		});
		expect(
			systemSettings.settings.value[EngineSystemSettingName.ShowFullContact],
		).toBe(true);
		expect(
			systemSettings.settings.value[EngineSystemSettingName.WbtHideContact],
		).toBeUndefined();
	});

	it('initialize loads settings again after a failed load', async () => {
		getList.mockRejectedValueOnce(new Error('network'));
		const systemSettings = createSystemSettings();

		await expect(systemSettings.initialize()).rejects.toThrow('network');
		await systemSettings.initialize();

		expect(getList).toHaveBeenCalledTimes(2);
	});

	it('reload loads settings again after initialize', async () => {
		const systemSettings = createSystemSettings();
		await systemSettings.initialize();
		getList.mockResolvedValue({
			items: [
				{
					name: EngineSystemSettingName.WbtHideContact,
					value: true,
				},
			],
		});

		await systemSettings.reload();

		expect(getList).toHaveBeenCalledTimes(2);
		expect(
			systemSettings.settings.value[EngineSystemSettingName.WbtHideContact],
		).toBe(true);
	});

	it('applyChange applies the value from the event, including falsy values, without a request', async () => {
		const systemSettings = createSystemSettings();

		await systemSettings.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
			value: true,
		});
		expect(
			systemSettings.settings.value[EngineSystemSettingName.WbtHideContact],
		).toBe(true);

		await systemSettings.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
			value: false,
		});
		expect(
			systemSettings.settings.value[EngineSystemSettingName.WbtHideContact],
		).toBe(false);

		expect(getList).not.toHaveBeenCalled();
	});

	it('applyChange re-reads the setting if the event has no value', async () => {
		const systemSettings = createSystemSettings();
		await systemSettings.applyChange({
			name: EngineSystemSettingName.ShowFullContact,
			value: true,
		});

		await systemSettings.applyChange({
			name: EngineSystemSettingName.ShowFullContact,
		});

		expect(getList).toHaveBeenCalledWith({
			name: [
				EngineSystemSettingName.ShowFullContact,
			],
		});
		expect(
			systemSettings.settings.value[EngineSystemSettingName.ShowFullContact],
		).toBeUndefined();
	});

	it('applyChange ignores settings that are not tracked', async () => {
		const systemSettings = createSystemSettings();

		await systemSettings.applyChange({
			name: 'some_future_setting',
			value: 1,
		});
		await systemSettings.applyChange({
			name: EngineSystemSettingName.CallEndSoundNotification,
		});

		expect(systemSettings.settings.value).toEqual({});
		expect(getList).not.toHaveBeenCalled();
	});

	it('does not send requests if no settings are tracked', async () => {
		const systemSettings = useSystemSettings([]);

		await systemSettings.initialize();
		await systemSettings.reload();
		await systemSettings.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
		});

		expect(getList).not.toHaveBeenCalled();
		expect(systemSettings.settings.value).toEqual({});
	});

	it('subscribe applies "system_settings_changed" events of the passed client', () => {
		const systemSettings = createSystemSettings();
		let emit: (change: SystemSettingChange) => void = () => {};
		const client = {
			on: vi.fn((_event, listener) => {
				emit = listener;
			}),
		};

		systemSettings.subscribe(client as unknown as Client);
		emit({
			name: EngineSystemSettingName.WbtHideContact,
			value: true,
		});

		expect(client.on).toHaveBeenCalledWith(
			'system_settings_changed',
			expect.any(Function),
		);
		expect(
			systemSettings.settings.value[EngineSystemSettingName.WbtHideContact],
		).toBe(true);
	});

	it('works as the state of a setup store', async () => {
		setActivePinia(createPinia());
		const useSystemSettingsStore = defineStore('systemSettings', () => {
			const { settings, applyChange } = useSystemSettings([
				EngineSystemSettingName.WbtHideContact,
			]);
			return {
				settings,
				applyChange,
			};
		});
		const store = useSystemSettingsStore();

		await store.applyChange({
			name: EngineSystemSettingName.WbtHideContact,
			value: true,
		});

		expect(store.settings[EngineSystemSettingName.WbtHideContact]).toBe(true);
	});
});
