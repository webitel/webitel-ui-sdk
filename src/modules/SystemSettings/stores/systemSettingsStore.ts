import { ConfigurationsAPI } from '@webitel/api-services/api';
import type {
	EngineSystemSetting,
	EngineSystemSettingName,
} from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

/**
 * [Claude] Payload of webitel-sdk `system_settings_changed` event.
 * No `value` means the setting was reset to default.
 */
export type SystemSettingChange = {
	name: string;
	value?: unknown;
};

/**
 * [Claude] Structural type of webitel-sdk `Client`, so apps can pass their own client
 * instance, regardless of webitel-sdk copy they have installed.
 * The event is emitted by webitel-sdk >= 26.4.35.
 */
export type SystemSettingsEventSource = {
	on(
		event: 'system_settings_changed',
		// biome-ignore lint/suspicious/noExplicitAny: [Claude] generic ee-ts listener type of webitel-sdk Client is not assignable to an exact signature
		listener: (...args: any[]) => void,
	): unknown;
};

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

		const subscribe = (client: SystemSettingsEventSource) => {
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
