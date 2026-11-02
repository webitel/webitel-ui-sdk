<template>
  <wt-popup
    :shown="shown"
    overflow
    size="sm"
    @close="close"
  >
    <template #title>
      {{ `${t('reusable.new')} ${t('objects.grantee', 1).toLowerCase()}` }}
    </template>
    <template #main>
      <permissions-role-select
        v-model:model-value="grantee"
        :clearable="false"
        :placeholder="t('objects.role', 1)"
        :search-method="getAvailableGrantees"
      />
    </template>
    <template #actions>
      <wt-button @click="save(grantee)">
        {{ t('reusable.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
// [Claude] TODO: remove after the roles refactor (WTEL-10721) — import { RolesAPI } from '@webitel/api-services/api' instead
import RolesAPI from '@webitel/ui-sdk/api/clients/roles/roles';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import type { PermissionGrantee } from '../../types/Permission.types';
import PermissionsRoleSelect from './permissions-role-select.vue';

const props = withDefaults(
	defineProps<{
		existingGranteeIds?: PermissionGrantee['id'][];
		addRolePermissions: (role: PermissionGrantee) => Promise<unknown>;
	}>(),
	{
		existingGranteeIds: () => [],
	},
);

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const grantee = ref<PermissionGrantee | null>(null);

/** [Claude] opened by the route, the tab's "add" action sets `permissionId` */
const shown = computed(() => !!route.params.permissionId);

const close = () => {
	const { query, hash, name } = route;
	const { permissionId, ...params } = route.params;

	grantee.value = null;

	return router.push({
		query,
		hash,
		name,
		params,
	});
};

const getAvailableGrantees = async (params: Record<string, unknown>) => {
	const { items, ...rest } = await RolesAPI.getLookup(params);
	return {
		/** [Claude] acl grantee ids come as strings, role ids as numbers */
		items: (items as PermissionGrantee[]).filter(
			(role) =>
				!props.existingGranteeIds.some((id) => String(id) === String(role.id)),
		),
		...rest,
	};
};

const save = async (newGrantee: PermissionGrantee | null) => {
	if (!newGrantee) return;
	await props.addRolePermissions(newGrantee);
	return close();
};
</script>

<style lang="scss" scoped></style>
