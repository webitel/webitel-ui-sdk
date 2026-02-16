import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createUserinfoStore } from '../userinfoStore';

describe('UserinfoAccessControl', () => {
	let useUserinfoStore: ReturnType<typeof createUserinfoStore>;

	beforeEach(() => {
		const pinia = createPinia();
		setActivePinia(pinia);
		useUserinfoStore = createUserinfoStore();
	});

	it('should be defined', async () => {
		vi.mock(import('../../api/UserinfoAPI'), () => ({
			getSession: vi.fn().mockResolvedValue({
				userId: 1,
				username: 'test',
				permissions: [],
				scope: [],
				access: {},
				license: [],
			}),
			getUiVisibilityAccess: vi.fn().mockResolvedValue({}),
		}));
		const userinfoStore = useUserinfoStore();
		const { initialize } = userinfoStore;
		const { userId } = storeToRefs(userinfoStore);
		await initialize();

		expect(userId.value).toBe(1);
	});
});
