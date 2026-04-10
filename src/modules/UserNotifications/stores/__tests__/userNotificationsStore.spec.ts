import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';

// Mocks for modules used by the store
vi.mock('../../api/UserNotifications', () => {
	return {
		getUserWarnings: vi.fn(),
	};
});

vi.mock('../../../../locale/i18n', () => {
	return {
		default: {
			global: {
				t: (key: string, payload?: any) => `${key}:${JSON.stringify(payload)}`,
			},
		},
	};
});

vi.mock('../../../../scripts/eventBus', () => {
	const emitMock = vi.fn();
	return {
		default: {
			$emit: emitMock,
			$: {
				emit: emitMock,
			},
		},
	};
});

import eventBus from '../../../../scripts/eventBus';
import { getUserWarnings } from '../../api/UserNotifications';
import { USER_NOTIFICATIONS_MAP } from '../../maps/userNotificationsMap';
import { createUserNotificationsStore } from '../userNotificationsStore';

describe('createUserNotificationsStore', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		const pinia = createPinia();
		const app = createApp({});
		app.use(pinia);
		setActivePinia(pinia);
	});

	it('fetch should call API and populate notifications', async () => {
		// Arrange: mock API to return warnings
		const notificationsResponse = {
			warnings: [
				{
					id: 'app.password.expires_soon',
					warningData: {
						passwordExpiry: {
							daysRemaining: 5,
						},
					},
				},
			],
		};
		(getUserWarnings as unknown as vi.Mock).mockResolvedValue(
			notificationsResponse,
		);

		const store = createUserNotificationsStore();

		// Act
		await store.initialize();

		// Assert: internal mappedNotifications should reflect map config
		expect(store.mappedNotifications.length).toBe(1);
		expect(store.mappedNotifications[0].days).toBe(5);
		expect(store.mappedNotifications[0].localeKey).toBe(
			USER_NOTIFICATIONS_MAP.get('app.password.expires_soon')?.localeKey,
		);
	});

	it('show should emit notification for mapped warnings and not repeat when already shown', async () => {
		const notificationsResponse = {
			warnings: [
				{
					id: 'app.password.expires_soon',
					warningData: {
						passwordExpiry: {
							daysRemaining: 3,
						},
					},
				},
			],
		};
		(getUserWarnings as unknown as vi.Mock).mockResolvedValue(
			notificationsResponse,
		);

		const store = createUserNotificationsStore();
		await store.initialize();

		// Act: show should emit once
		store.show();
		expect(eventBus.$.emit).toHaveBeenCalled();
		const [[eventName, payload]] = (eventBus.$.emit as vi.Mock).mock.calls;
		expect(eventName).toBe('notification');
		expect(payload.type).toBe('info');
		expect(payload.text).toContain(
			'systemNotifications.warnings.passwordExpirationMessage',
		);

		// Act: calling show again should not emit
		(eventBus.$.emit as vi.Mock).mockClear();
		store.show();
		expect(eventBus.$.emit).not.toHaveBeenCalled();
	});
});
