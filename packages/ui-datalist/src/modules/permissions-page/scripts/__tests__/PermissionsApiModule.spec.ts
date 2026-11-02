import { describe, expect, it, vi } from 'vitest';

import { PermissionsApiModule } from '../PermissionsApiModule';

describe('PermissionsApiModule', () => {
	it('asks for one `granted` in place of the rule columns, and never for `id`', async () => {
		const getPermissionsList = vi.fn();
		const { getList } = PermissionsApiModule({
			getPermissionsList,
		} as never);

		await getList({
			fields: [
				'id',
				'grantee',
				'r',
				'w',
				'd',
			],
			sort: '+w',
		} as never);

		expect(getPermissionsList).toHaveBeenCalledWith({
			fields: [
				'grantee',
				'granted',
			],
			sort: '+w',
		});
	});
});
