<template>
  <permissions-tab-content v-bind="tabContentProps">
    <template #pagination>
      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </template>
  </permissions-tab-content>
</template>

<script setup lang="ts">
import { PermissionsTabContent } from '@webitel/ui-sdk/modules/ObjectPermissions';
import type { UserAccessFlags } from '@webitel/ui-sdk/modules/Userinfo';
import type { Id } from '@webitel/ui-sdk/src/api/types/ApiModule';
import { storeToRefs } from 'pinia';
import { computed, onUnmounted } from 'vue';
import type { PermissionsPiniaStore } from '../stores/createPermissionsStore';

const props = withDefaults(
	defineProps<{
		store: () => PermissionsPiniaStore;
		access: UserAccessFlags;
		parentId?: Id;
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

const permissionsStore = props.store();

const { dataList, isLoading, headers, page, size, next, error } =
	storeToRefs(permissionsStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	changeAccessMode,
	addRolePermissions,
	$reset,
} = permissionsStore;

initialize({
	parentId: props.parentId,
});

onUnmounted(() => {
	$reset();
});

const existingGranteeIds = computed(() =>
	dataList.value.map((item) => item.grantee.id),
);

const tabContentProps = computed(() => ({
	dataList: dataList.value,
	isLoading: isLoading.value,
	headers: headers.value,
	error: error.value,
	refresh: loadDataList,
	sort: updateSort,
	changeAccessMode,
	existingGranteeIds: existingGranteeIds.value,
	addRolePermissions,
	access: props.access,
}));
</script>
