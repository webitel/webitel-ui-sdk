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
import type { Ref } from 'vue';
import { computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import type { DatalistTableHeader } from '../../types/tableStore.types';
import type {
	ChangeAccessModePayload,
	PermissionEntity,
} from '../types/Permission.types';

const props = withDefaults(
	defineProps<{
		store: () => any;
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
const routeParentId = Array.isArray(route.params.id)
	? route.params.id[0]
	: route.params.id;

const permissionsStore = props.store();

type PermissionsStoreRefs = {
	dataList: Ref<PermissionEntity[]>;
	isLoading: Ref<boolean>;
	headers: Ref<DatalistTableHeader[]>;
	page: Ref<number>;
	size: Ref<number>;
	next: Ref<boolean>;
	error: Ref<unknown>;
};

const { dataList, isLoading, headers, page, size, next, error } = storeToRefs(
	permissionsStore,
) as PermissionsStoreRefs;

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	changeAccessMode,
	addRolePermissions,
	$reset,
}: {
	initialize: (payload?: { parentId?: Id }) => Promise<unknown>;
	loadDataList: () => Promise<unknown>;
	updatePage: (page: number) => void;
	updateSize: (size: number) => void;
	updateSort: (column: object) => void;
	changeAccessMode: (payload: ChangeAccessModePayload) => Promise<unknown>;
	addRolePermissions: (role: { id: Id }) => Promise<unknown>;
	$reset: () => void;
} = permissionsStore;

initialize({
	parentId: routeParentId,
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
