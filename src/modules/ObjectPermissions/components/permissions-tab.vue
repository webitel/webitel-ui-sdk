<template>
  <section
    v-if="access.read"
    class="permissions-tab"
  >
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('access.operations') }}
      </h3>
      <div class="content-header__actions-wrap">
        <!--        TODO replace wt-table-actions -->
        <!--        <wt-table-actions-->
        <!--          :icons="['refresh']"-->
        <!--          @input="(event) => event === 'refresh' && loadData()"-->
        <!--        >-->
        <!--        </wt-table-actions>-->
        <role-popup
          v-if="props.access.add"
          :namespace="tableNamespace"
        />
      </div>
    </header>

    <wt-loader v-show="isLoading" />

    <!--    TODO -->
    <!--    <wt-dummy-->
    <!--      v-if="dummy && !isLoading"-->
    <!--      :dark-mode="darkMode"-->
    <!--      :src="dummy.src"-->
    <!--      :text="dummy.text && t(dummy.text)"-->
    <!--      class="dummy-wrapper"-->
    <!--    />-->

    <div class="table-wrapper">
      <div
        v-if="dataList.length && !isLoading"
        style="display:contents;"
      >
        <!--        TODO -->
        <!--        <transition-slide-->
        <!--          :offset="{-->
        <!--              enter: ['-5%', 0],-->
        <!--              leave: [0, 0]-->
        <!--            }"-->
        <!--          duration="200"-->
        <!--          mode="out-in"-->
        <!--          appear-->
        <!--        >-->
        <wt-table
          :data="localizedDataList"
          :grid-actions="access.edit"
          :headers="headers"
          :selectable="false"
          sortable
          @sort="sort"
        >
          <template #grantee="{ item }">
            <role-column
              :role="item.grantee"
            />
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
              @click="changeAccessMode({ item, ruleName: 'r', mode: { id: AccessMode.FORBIDDEN }})"
            />
          </template>
        </wt-table>
        <!--        </transition-slide>-->
      </div>
      <filter-pagination
        :namespace="filtersNamespace"
        :next="isNext"
      />
    </div>
  </section>
</template>

<script setup>
// TODO: класи, даммі, транзішен таблички. WTEL-3392

import { computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useTableStore } from '../../../store/new/index.js';
import FilterPagination from '../../Filters/components/filter-pagination.vue';
import { useTableFilters } from '../../Filters/composables/useTableFilters.js';
import RoleColumn from '../_internals/components/permissions-role-row.vue';
import RolePopup from '../_internals/components/permissions-tab-role-popup.vue';
import { AccessMode } from '../_internals/enums/AccessMode.enum.js';

const props = defineProps({
  namespace: {
    type: String,
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
const store = useStore();

const {
  namespace: tableNamespace,

  dataList,
  isLoading,
  headers,
  isNext,
  error,

  loadData, // TODO: use for refresh button
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

// TODO
// const { dummy } = useDummy({
//   namespace,
//   hiddenText: true,
// });

const accessOptions = computed(() => {
  return Object.values(AccessMode).map((mode) => ({
    id: mode,
    name: t(`access.accessMode.${mode}`),
  }));
});

const changeAccessMode = (payload) => (
  store.dispatch(`${tableNamespace}/CHANGE_ACCESS_MODE`, payload)
);

</script>

<style lang="scss" scoped>
</style>
