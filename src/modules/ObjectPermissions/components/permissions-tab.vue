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
        <wt-action-bar
          :include="[IconAction.REFRESH]"
          @click:refresh="loadData"
        />
        <role-popup
          v-if="props.access.add"
          :namespace="tableNamespace"
        />
      </div>
    </header>

    <wt-loader v-show="isLoading" />

    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :text="textEmpty"
    />

    <div class="table-section__table-wrapper">
      <div>
        <wt-table-transition v-if="dataList.length && !isLoading">
          <wt-table
            :data="localizedDataList"
            :grid-actions="access.edit"
            :headers="headers"
            :selectable="false"
            sortable
            @sort="sort"
          >
            <template #grantee="{ item }">
              <role-column :role="item.grantee" />
            </template>

            <template #read="{ item }">
              <wt-select
                :clearable="false"
                :disabled="!access.edit"
                :options="accessOptions"
                :value="item.access.r"
                @input="changeAccessMode({ item, ruleName: 'r', mode: $event })"
              />
            </template>

            <template #edit="{ item }">
              <wt-select
                :clearable="false"
                :disabled="!access.edit"
                :options="accessOptions"
                :value="item.access.w"
                @input="changeAccessMode({ item, ruleName: 'w', mode: $event })"
              />
            </template>

            <template #delete="{ item }">
              <wt-select
                :clearable="false"
                :disabled="!access.edit"
                :options="accessOptions"
                :value="item.access.d"
                @input="changeAccessMode({ item, ruleName: 'd', mode: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="delete"
                @click="
                  changeAccessMode({
                    item,
                    ruleName: 'r',
                    mode: { id: AccessMode.FORBIDDEN },
                  })
                "
              />
            </template>
          </wt-table>
        </wt-table-transition>
      </div>
      <filter-pagination
        :namespace="filtersNamespace"
        :next="isNext"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import IconAction from '../../../enums/IconAction/IconAction.enum.js';
import { useTableEmpty } from '../../../modules/TableComponentModule/composables/useTableEmpty.js';
import { useTableStore } from '../../../store/new/index.js';
import FilterPagination from '../../Filters/components/filter-pagination.vue';
import { useTableFilters } from '../../Filters/composables/useTableFilters.js';
import RoleColumn from '../_internals/components/permissions-role-row.vue';
import RolePopup from '../_internals/components/permissions-tab-role-popup.vue';
import { AccessMode } from '../_internals/enums/AccessMode.enum.js';

const props = defineProps({
  /**
   * Namespace of the parent card store
   */
  namespace: {
    type: String,
    required: true,
  },
  /**
   * Access to the component actions, related to permissions
   */
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

const localizedDataList = computed(() => {
  return dataList.value.map((item) => {
    const access = Object.keys(item.access).reduce((access, rule) => {
      return {
        ...access,
        [rule]: {
          ...item.access[rule],
          name: t(`access.accessMode.${item.access[rule].id}`),
        },
      };
    }, {});

    return {
      ...item,
      access,
    };
  });
});

const {
  namespace: filtersNamespace,
  restoreFilters,

  subscribe,
  flushSubscribers,
} = useTableFilters(tableNamespace);

subscribe({
  event: '*',
  callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
  flushSubscribers();
});

const {
  showEmpty,
  image: imageEmpty,
  text: textEmpty,
} = useTableEmpty({ dataList, error, isLoading });

const accessOptions = computed(() => {
  return Object.values(AccessMode).map((mode) => ({
    id: mode,
    name: t(`access.accessMode.${mode}`),
  }));
});

const changeAccessMode = (payload) =>
  store.dispatch(`${tableNamespace}/CHANGE_ACCESS_MODE`, payload);
</script>

<style lang="scss" scoped>
@use '../../../css/pages/table-page';
</style>
