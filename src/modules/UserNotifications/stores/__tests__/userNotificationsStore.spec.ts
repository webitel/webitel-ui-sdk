import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';

type ViMock = ReturnType<typeof vi.fn>;

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Mocks for modules used by the store
vi.mock('../../api/UserNotifications', () => {
	return {
		getUserWarnings: vi.fn(),
	};
});

vi.mock('../../../../scripts/isEmpty', () => {
	return {
		default: (obj: object) => Object.keys(obj).length === 0,
	};
});

vi.mock('../maps/userNotificationConfigsMap', async () => {
	const actual = await vi.importActual('../maps/userNotificationConfigsMap');

	return {
		...actual,
		USER_NOTIFICATION_CONFIGS_MAP: new Map([
			[
				ApiUserWarningId.PasswordExpiresSoon,
				{
					type: 'warning',
					getId: () => 'test-id',
					getLocaleKey: () => ApiUserWarningId.PasswordExpiresSoon,
					getParams: () => ({
						days: 3,
					}),
				},
			],
		]),
	};
});

vi.mock('../../../../locale/i18n', () => {
	return {
		default: {
			global: {
				t: (key: string, payload?: Record<string, unknown>) =>
					`${key}:${JSON.stringify(payload)}`,
			},
		},
	};
});

vi.mock('../../../../scripts/eventBus', () => {
	const emitMock = vi.fn();
	return {
		default: {
			$on: vi.fn(),
			$off: vi.fn(),
			$emit: emitMock,
		},
	};
});

import eventBus from '../../../../scripts/eventBus';
import { getUserWarnings } from '../../api/UserNotifications';
import { createUserNotificationsStore } from '../userNotificationsStore';

describe('createUserNotificationsStore', () => {
	let useStore: ReturnType<typeof createUserNotificationsStore>;
	let pinia: ReturnType<typeof createPinia>;
	const userId = 'test-user-123';

	const notificationsResponse = {
		warnings: [
			{
				id: ApiUserWarningId.PasswordExpiresSoon,
				warningData: {
					passwordExpiry: {
						daysRemaining: 5,
					},
				},
			},
		],
	};

	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();

		pinia = createPinia();
		const app = createApp({});
		app.use(pinia);
		setActivePinia(pinia);

		useStore = createUserNotificationsStore();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('showNotifications should fetch, map and emit notifications', async () => {
		vi.useFakeTimers();
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();

		await store.showNotifications(userId);

		vi.runAllTimers();

		expect(getUserWarnings).toHaveBeenCalledOnce();
		expect(eventBus.$emit).toHaveBeenCalled();

		vi.useRealTimers();
	});

	it('showNotifications should not re-fetch if notifications already shown', async () => {
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);
		const store = useStore();

		await store.showNotifications(userId);
		vi.clearAllMocks();
		await store.showNotifications(userId);

		expect(getUserWarnings).not.toHaveBeenCalled();
	});

	it('clearShownMap should remove stored notifications', () => {
		const storageKey = `userNotifications/${userId}/shown`;
		localStorage.setItem(
			storageKey,
			JSON.stringify({
				'notification-1': true,
			}),
		);

		const store = useStore();

		store.clearShownMap(userId);

		expect(localStorage.getItem(storageKey)).toBeNull();
	});
});
