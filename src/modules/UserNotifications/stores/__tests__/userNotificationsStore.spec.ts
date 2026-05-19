import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import eventBus from '../../../../scripts/eventBus';
import { getUserWarnings } from '../../api/UserNotifications';
import { createUserNotificationsStore } from '../userNotificationsStore';

vi.mock('../../api/UserNotifications', () => {
	return {
		getUserWarnings: vi.fn(),
	};
});
vi.mock('../../../../scripts/eventBus', () => ({
	default: {
		$emit: vi.fn(),
	},
}));

const mockedGetUserWarnings = vi.mocked(getUserWarnings);
const STORAGE_KEY = 'usersWithShownNotifications';
const TEST_USER_ID = 'user-123';

const mockPasswordWarning = {
	id: ApiUserWarningId.PasswordExpiresSoon,
	warningData: {
		passwordExpiry: {
			daysRemaining: 3,
		},
	},
};

const mockLicenseWarning = {
	id: ApiUserWarningId.LicenseExpiresSoon,
	warningData: {
		licenseExpiry: {
			daysRemaining: 5,
			licenseName: 'Enterprise',
		},
	},
};

describe('userNotificationsStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	describe('showNotifications', () => {
		it('does not show notifications that the user is already in storage', async () => {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify([
					TEST_USER_ID,
				]),
			);

			const useStore = createUserNotificationsStore();
			const store = useStore();

			await store.showNotifications(TEST_USER_ID);

			expect(getUserWarnings).not.toHaveBeenCalled();
		});

		it('shows notifications and saves the user in storage', async () => {
			mockedGetUserWarnings.mockResolvedValue({
				warnings: [
					mockPasswordWarning,
				],
			});

			const useStore = createUserNotificationsStore();
			const store = useStore();

			await store.showNotifications(TEST_USER_ID);
			vi.runAllTimers();

			expect(eventBus.$emit).toHaveBeenCalledWith(
				'notification',
				expect.objectContaining({
					type: 'info',
				}),
			);

			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
			expect(stored).toContain(TEST_USER_ID);
		});

		it('Do not ignore API notifications by turning an empty array', async () => {
			mockedGetUserWarnings.mockResolvedValue({
				warnings: [],
			});

			const useStore = createUserNotificationsStore();
			const store = useStore();

			await store.showNotifications(TEST_USER_ID);
			vi.runAllTimers();

			expect(eventBus.$emit).not.toHaveBeenCalled();
		});

		it('Do not save if the id is not found in the map config', async () => {
			mockedGetUserWarnings.mockResolvedValue({
				warnings: [
					{
						id: 'unknown_warning',
						warningData: {},
					},
				],
			});

			const useStore = createUserNotificationsStore();
			const store = useStore();

			await store.showNotifications(TEST_USER_ID);
			vi.runAllTimers();

			expect(eventBus.$emit).not.toHaveBeenCalled();
		});

		it('shows some notifications', async () => {
			mockedGetUserWarnings.mockResolvedValue({
				warnings: [
					mockPasswordWarning,
					mockLicenseWarning,
				],
			});

			const useStore = createUserNotificationsStore();
			const store = useStore();

			await store.showNotifications(TEST_USER_ID);
			vi.runAllTimers();

			expect(eventBus.$emit).toHaveBeenCalledTimes(2);
		});
	});

	describe('clearShownUserNotifications', () => {
		it('clear localStorage', async () => {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify([
					TEST_USER_ID,
					'user-456',
				]),
			);

			const useStore = createUserNotificationsStore();
			const store = useStore();

			store.clearShownUserNotifications(TEST_USER_ID);

			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
			expect(stored).not.toContain(TEST_USER_ID);
			expect(stored).toContain('user-456');
		});

		it('after clearShownUserNotifications notifications display again', async () => {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify([
					TEST_USER_ID,
				]),
			);
			mockedGetUserWarnings.mockResolvedValue({
				warnings: [
					mockPasswordWarning,
				],
			});

			const useStore = createUserNotificationsStore();
			const store = useStore();

			store.clearShownUserNotifications(TEST_USER_ID);
			await store.showNotifications(TEST_USER_ID);
			vi.runAllTimers();

			expect(eventBus.$emit).toHaveBeenCalled();
		});
	});
});
