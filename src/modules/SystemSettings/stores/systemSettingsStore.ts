import { ConfigurationsAPI } from '@webitel/api-services/api';
import type {
	EngineSystemSetting,
	EngineSystemSettingName,
} from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import type { Client, ClientEvents } from 'webitel-sdk';

/**
 * [Claude] Payload of webitel-sdk `system_settings_changed` event (webitel-sdk >= 26.4.35).
 * No `value` means the setting was reset to default.
 * Derived from `ClientEvents`, because webitel-sdk does not export the payload type itself.
 */
export type SystemSettingChange = Parameters<
	ClientEvents['system_settings_changed']
>[0];

export const createSystemSettingsStore = <
	Name extends EngineSystemSettingName,
>({
	namespace = 'systemSettings',
	names,
}: {
	namespace?: string;
	names: readonly Name[];
}) => {
	const isTrackedName = (name: string): name is Name =>
		(names as readonly string[]).includes(name);

	const store = defineStore(namespace, () => {
		const settings = ref({}) as Ref<Partial<Record<Name, unknown>>>;

		let initPromise: Promise<void> | null = null;

		const loadSettings = async (namesToLoad: readonly Name[]) => {
			// [Claude] nothing is tracked: skip the request instead of sending an empty name filter
			if (!namesToLoad.length) return;
			const { items } = await ConfigurationsAPI.getList({
				name: namesToLoad,
			});
			namesToLoad.forEach((name) => {
				settings.value[name] = items.find(
					(item: EngineSystemSetting) => item.name === name,
				)?.value;
			});
		};

		// [Claude] loads once, afterwards values are kept up to date by applyChange()
		const initialize = () => {
			initPromise ??= loadSettings(names).catch((err) => {
				initPromise = null;
				throw err;
			});
			return initPromise;
		};

		// [Claude] changes made while the socket was down are never delivered, so call it after reconnect
		const reload = () => loadSettings(names);

		const applyChange = async ({ name, value }: SystemSettingChange) => {
			if (!isTrackedName(name)) return;
			if (value === undefined) {
				await loadSettings([
					name,
				]);
				return;
			}
			settings.value[name] = value;
		};

		const subscribe = (client: Client) => {
			client.on('system_settings_changed', applyChange);
		};

		return {
			settings,

			initialize,
			reload,
			applyChange,
			subscribe,
		};
	});

	return store;
};
