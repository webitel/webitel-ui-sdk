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
import { storeToRefs } from 'pinia';
import { computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import type { createPermissionsStore } from '../stores/createPermissionsStore';

const props = withDefaults(
	defineProps<{
		store: () => typeof createPermissionsStore;
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

const route = useRoute();

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
	parentId: route.params.id,
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
