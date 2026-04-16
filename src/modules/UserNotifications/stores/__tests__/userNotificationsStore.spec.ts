import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';
import { ApiUserWarningId } from '@webitel/api-services/gen/models';

type ViMock = ReturnType<typeof vi.fn>;

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
				t: (key: string, payload?: number) =>
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
import { USER_NOTIFICATION_CONFIGS_MAP } from '../../maps/userNotificationConfigsMap';
import { createUserNotificationsStore } from '../userNotificationsStore';

describe('createUserNotificationsStore', () => {
	let useStore: ReturnType<typeof createUserNotificationsStore>;
	let pinia: ReturnType<typeof createPinia>;

	beforeEach(() => {
		vi.clearAllMocks();

		pinia = createPinia();
		const app = createApp({});
		app.use(pinia);
		setActivePinia(pinia);

		useStore = createUserNotificationsStore();
	});

	it('fetch should call API and populate notifications', async () => {
		// Arrange: mock API to return warnings
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

		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();

		// Act
		await store.initialize();

		// Assert
		expect(store.notifications.length).toBe(1);
		expect(store.notifications[0].days).toBe(5);
		expect(store.notifications[0].localeKey).toBe(
			USER_NOTIFICATION_CONFIGS_MAP.get(ApiUserWarningId.PasswordExpiresSoon)
				?.localeKey,
		);
		expect(getUserWarnings).toHaveBeenCalledOnce();
	});

	it('show should emit notification for mapped warnings', async () => {
		const notificationsResponse = {
			warnings: [
				{
					id: ApiUserWarningId.PasswordExpiresSoon,
					warningData: {
						passwordExpiry: {
							daysRemaining: 3,
						},
					},
				},
			],
		};

		(getUserWarnings as ViMock).mockResolvedValue(notificationsResponse);

		const store = useStore();
		await store.initialize();

		// Act: show should emit once
		store.show();
		expect(eventBus.$emit).toHaveBeenCalledOnce();
		const [[eventName, payload]] = (eventBus.$emit as ViMock).mock.calls;
		expect(eventName).toBe('notification');
		expect(payload.type).toBe('info');
		expect(payload.text).toContain(
			'systemNotifications.warnings.passwordExpirationMessage',
		);
	});
});
