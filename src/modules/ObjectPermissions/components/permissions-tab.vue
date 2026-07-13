<template>
  <permissions-tab-content v-bind="tabContentProps">
    <template #pagination>
      <filter-pagination
        :namespace="filtersNamespace"
        :next="isNext"
      />
    </template>
  </permissions-tab-content>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

import type { UserAccessFlags } from '../../Userinfo';
import { useTableStore } from '../../../store/new';
import FilterPagination from '../../Filters/components/filter-pagination.vue';
import { useTableFilters } from '../../Filters/composables/useTableFilters';
import PermissionsTabContent from './_internal/permissions-tab-content.vue';

const props = withDefaults(
	defineProps<{
		/** Namespace of the parent card store */
		namespace: string;
		/** Access to the component actions, related to permissions */
		access: UserAccessFlags;
	}>(),
	{
		access: () => ({
			read: false,
			add: false,
			edit: false,
			delete: false,
		}),
	},
);

const store = useStore();

const {
	namespace: tableNamespace,

	dataList,
	isLoading,
	headers,
	isNext,
	error,

	loadData,
	sort,
	onFilterEvent,
} = useTableStore(`${props.namespace}/permissions`);

const {
	namespace: filtersNamespace,
	restoreFilters,

	subscribe,
	flushSubscribers,
	resetFilters,
} = useTableFilters(tableNamespace);

subscribe({
	event: '*',
	callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
	flushSubscribers();
	resetFilters();
});

const changeAccessMode = (payload) =>
	store.dispatch(`${tableNamespace}/CHANGE_ACCESS_MODE`, payload);

const addRolePermissions = (role) =>
	store.dispatch(`${tableNamespace}/ADD_ROLE_PERMISSIONS`, role);

const existingGranteeIds = computed(() =>
	dataList.value.map((item) => item.grantee.id),
);

const tabContentProps = computed(() => ({
	dataList: dataList.value,
	isLoading: isLoading.value,
	headers: headers.value,
	error: error.value,
	refresh: loadData,
	sort,
	changeAccessMode,
	existingGranteeIds: existingGranteeIds.value,
	addRolePermissions,
	access: props.access,
}));
</script>
