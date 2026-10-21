<template>
  <section
    v-if="access.read"
    class="table-section"
  >
    <permissions-tab-role-popup
      v-if="access.create"
      :existing-grantee-ids="existingGranteeIds"
      :add-role-permissions="addRolePermissions"
    />

    <header class="table-title permissions-tab-content__header">
      <wt-action-bar
        :include="[IconAction.ADD, IconAction.REFRESH]"
        :disabled:add="!access.create"
        @click:add="openRolePopup"
        @click:refresh="refresh"
      />
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <div
        v-show="dataList.length && !isLoading"
        class="table-section__visible-scroll-wrapper"
      >
        <wt-table
          :data="localizedDataList"
          :grid-actions="access.update"
          :headers="headers"
          :selectable="false"
          sortable
          @sort="sort"
        >
          <template #grantee="{ item }">
            <permissions-role-row :role="item.grantee" />
          </template>

          <!-- [Claude] one select per rule column; "create" shows only where the headers have it, e.g. object classes OBAC -->
          <template
            v-for="(ruleName, column) of AccessRuleColumn"
            :key="column"
            #[column]="{ item }"
          >
            <wt-single-select
              :show-clear="false"
              :disabled="!access.update"
              :options="accessOptions"
              :model-value="item.access[ruleName]"
              @update:model-value="changeAccessMode({ item, ruleName, mode: $event })"
            />
          </template>

          <template #actions="{ item }">
            <wt-icon-action
              action="delete"
              @click="
                changeAccessMode({
                  item,
                  ruleName: AccessRuleName.R,
                  mode: { id: AccessMode.Forbidden },
                })
              "
            />
          </template>
        </wt-table>
      </div>

      <slot name="pagination" />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	AccessMode,
	AccessRuleColumn,
	AccessRuleName,
} from '@webitel/api-services/enums';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { DatalistTableHeader } from '../../../types/tableStore.types';
import { useAccessModeOptions } from '../../composables/useAccessModeOptions';
import type {
	ChangeAccessModePayload,
	PermissionEntity,
	PermissionGrantee,
} from '../../types/Permission.types';
import {
	DEFAULT_PERMISSIONS_USER_ACCESS,
	type PermissionsUserAccess,
} from '../../types/PermissionsUserAccess';
import PermissionsRoleRow from './permissions-role-row.vue';
import PermissionsTabRolePopup from './permissions-tab-role-popup.vue';

const props = withDefaults(
	defineProps<{
		dataList: PermissionEntity[];
		isLoading?: boolean;
		headers: DatalistTableHeader[];
		error?: unknown;
		refresh: () => unknown;
		sort: (column: DatalistTableHeader) => unknown;
		changeAccessMode: (payload: ChangeAccessModePayload) => unknown;
		existingGranteeIds?: PermissionGrantee['id'][];
		addRolePermissions: (role: PermissionGrantee) => Promise<unknown>;
		access?: PermissionsUserAccess;
	}>(),
	{
		isLoading: false,
		existingGranteeIds: () => [],
		access: () => DEFAULT_PERMISSIONS_USER_ACCESS,
	},
);

const { accessOptions, localizedDataList } = useAccessModeOptions(
	() => props.dataList,
);

const route = useRoute();
const router = useRouter();

/** [Claude] the role popup is opened by the route, so it survives a reload */
const openRolePopup = () =>
	router.push({
		name: route.name,
		query: route.query,
		hash: route.hash,
		params: {
			...route.params,
			permissionId: 'new',
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList: computed(() => props.dataList),
	error: computed(() => props.error),
	isLoading: computed(() => props.isLoading),
});
</script>

<style scoped>
/* [Claude] no title in the header, so push the action bar to the right */
.permissions-tab-content__header {
	justify-content: flex-end;
}
</style>
