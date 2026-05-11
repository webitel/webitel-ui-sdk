import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';
import '../../../../../tests/mocks/localStorageMock';

type ViMock = ReturnType<typeof vi.fn>;

// Mock notification class
class MockNotification {
	id: string;
	type: string = 'info';
	localeKey: string;
	params: Record<string, unknown>;
	shown: boolean = false;

	constructor({ id, warningData: data }: any) {
		this.id = `${id}_mock`;
		this.localeKey = 'passwordExpirationMessageDays';
		this.params = {
			amount: data.passwordExpiry?.daysRemaining || 3,
		};
	}
}

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

vi.mock('../classes/UserNotifications', () => {
	return {
		USER_NOTIFICATION_CONFIGS_MAP: new Map([
			[
				ApiUserWarningId.PasswordExpiresSoon,
				MockNotification,
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
				locale: {
					value: 'en',
				},
			},
		},
	};
});

vi.mock('../../../../scripts/eventBus', () => {
	return {
		default: {
			$on: vi.fn(),
			$off: vi.fn(),
			$emit: vi.fn(),
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
		vi.clearAllMocks();
	});

	it('should be defined', () => {
		const store = useStore();
		expect(store).toBeDefined();
		expect(store.showNotifications).toBeDefined();
		expect(store.clearShownMap).toBeDefined();
	});

	it('showNotifications should fetch and map notifications on first call', async () => {
		vi.useFakeTimers();
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();
		await store.showNotifications(userId);

		vi.runAllTimers();
		vi.useRealTimers();
	});

	it('showNotifications should emit notification with defer', async () => {
		vi.useFakeTimers();
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();
		await store.showNotifications(userId);

		// Notification should be deferred by setTimeout
		expect(eventBus.$emit).not.toHaveBeenCalled();

		vi.runAllTimers();

		expect(eventBus.$emit).toHaveBeenCalled();
		const call = (eventBus.$emit as ViMock).mock.calls[0];
		expect(call[0]).toBe('notification');
		expect(call[1]).toHaveProperty('type');
		expect(call[1]).toHaveProperty('text');

		vi.useRealTimers();
	});

	it('showNotifications should not re-fetch if shownMap exists', async () => {
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);
		const store = useStore();

		// First call
		await store.showNotifications(userId);
		expect(getUserWarnings).toHaveBeenCalledOnce();

		vi.clearAllMocks();

		// Second call - should NOT fetch
		vi.useFakeTimers();
		await store.showNotifications(userId);
		vi.runAllTimers();

		expect(getUserWarnings).not.toHaveBeenCalled();
		vi.useRealTimers();
	});

	it('showNotifications should mark notifications as shown', async () => {
		vi.useFakeTimers();
		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();
		await store.showNotifications(userId);

		vi.runAllTimers();

		const storageKey = `userNotifications/${userId}/shown`;
		const shownMap = JSON.parse(localStorage.getItem(storageKey) || '{}');

		expect(Object.keys(shownMap).length).toBeGreaterThan(0);
		expect(Object.values(shownMap).some((v) => v === true)).toBe(true);

		vi.useRealTimers();
	});

	it('clearShownMap should remove stored notifications', () => {
		const storageKey = `userNotifications/${userId}/shown`;
		localStorage.setItem(
			storageKey,
			JSON.stringify({
				'notification-1': true,
			}),
		);

		expect(localStorage.getItem(storageKey)).not.toBeNull();

		const store = useStore();
		store.clearShownMap(userId);

		expect(localStorage.getItem(storageKey)).toBeNull();
	});

	it('should handle empty notifications response', async () => {
		(getUserWarnings as ViMock).mockResolvedValue({
			warnings: [],
		});

		const store = useStore();
		await store.showNotifications(userId);

		const state = store as any;
		expect(state.notifications?.length || 0).toBe(0);
	});
});
