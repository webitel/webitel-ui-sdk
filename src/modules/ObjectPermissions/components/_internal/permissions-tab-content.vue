<template>
  <section
    v-if="access.read"
    class="table-page"
  >
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('access.operations') }}
      </h3>
      <div class="table-title__actions-wrap">
        <permissions-tab-role-popup
          v-if="access.add"
          :existing-grantee-ids="existingGranteeIds"
          :add-role-permissions="addRolePermissions"
        />
        <wt-action-bar
          :include="[IconAction.REFRESH]"
          @click:refresh="refresh"
        />
      </div>
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
          :grid-actions="access.edit"
          :headers="headers"
          :selectable="false"
          sortable
          @sort="sort"
        >
          <template #grantee="{ item }">
            <permissions-role-row :role="item.grantee" />
          </template>

          <template #read="{ item }">
            <wt-single-select
              :show-clear="false"
              :disabled="!access.edit"
              :options="accessOptions"
              :model-value="item.access.r"
              @update:model-value="changeAccessMode({ item, ruleName: AccessRuleName.R, mode: $event })"
            />
          </template>

          <template #edit="{ item }">
            <wt-single-select
              :show-clear="false"
              :disabled="!access.edit"
              :options="accessOptions"
              :model-value="item.access.w"
              @update:model-value="changeAccessMode({ item, ruleName: AccessRuleName.W, mode: $event })"
            />
          </template>

          <template #delete="{ item }">
            <wt-single-select
              :show-clear="false"
              :disabled="!access.edit"
              :options="accessOptions"
              :model-value="item.access.d"
              @update:model-value="changeAccessMode({ item, ruleName: AccessRuleName.D, mode: $event })"
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

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import IconAction from '../../../../enums/IconAction/IconAction.enum';
import { useTableEmpty } from '../../../TableComponentModule/composables/useTableEmpty';
import { AccessMode, AccessRuleName } from '../../enums';
import PermissionsRoleRow from './permissions-role-row.vue';
import PermissionsTabRolePopup from './permissions-tab-role-popup.vue';

const props = defineProps({
	dataList: {
		type: Array,
		required: true,
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
	headers: {
		type: Array,
		required: true,
	},
	error: {
		type: Object,
		default: null,
	},
	refresh: {
		type: Function,
		required: true,
	},
	sort: {
		type: Function,
		required: true,
	},
	changeAccessMode: {
		type: Function,
		required: true,
	},
	existingGranteeIds: {
		type: Array,
		default: () => [],
	},
	addRolePermissions: {
		type: Function,
		required: true,
	},
	access: {
		type: Object,
		default: () => ({
			read: true,
			add: true,
			edit: true,
			delete: true,
		}),
	},
});

const { t } = useI18n();

const localizedDataList = computed(() => {
	return props.dataList.map((item) => {
		const access = Object.keys(item.access).reduce((acc, rule) => {
			acc[rule] = {
				...item.access[rule],
				name: t(`access.accessMode.${item.access[rule].id}`),
			};
			return acc;
		}, {});

		return {
			...item,
			access,
		};
	});
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

const accessOptions = computed(() => {
	return Object.values(AccessMode).map((mode) => ({
		id: mode,
		name: t(`access.accessMode.${mode}`),
	}));
});
</script>

<style lang="scss" scoped>
@use '../../../../css/pages/table-page.css';
</style>
