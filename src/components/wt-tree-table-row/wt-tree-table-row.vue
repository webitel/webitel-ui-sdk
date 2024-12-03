<script setup>
import { computed, ref } from 'vue';
import WtCheckbox from '../wt-checkbox/wt-checkbox.vue';
import WtIconBtn from '../wt-icon-btn/wt-icon-btn.vue';

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  dataKey: {
    type: Number,
  },
  children: {
    type: String,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  columnsStyle: {
    type: String,
    default: '',
  },
  _selected: {
    type: Array,
    default: () => [],
  },
  dataHeaders: {
    type: Array,
    required: true,
  },
  gridActions: {
    type: Boolean,
    default: true,
  },
  nestedLevel: {
    type: Number,
    default: 0,
  },
});

defineEmits(['handleSelection']);

const collapsed = ref(true);
const lineCount = computed(() => {
  if (props.nestedLevel <= 1) return 0;

  return props.nestedLevel - 1;
});
</script>

<template>
  <tr
    :class="[`wt-tree-table__tr__${row.id || dataKey} wt-tree-table-row`, { 'wt-tree-table-row--secondary': dataKey % 2 }]"
    :style="[`--child-space:calc(var(--spacing-sm)*${nestedLevel})`, `--nested-level:${nestedLevel}`]"
    class="wt-tree-table__tr wt-tree-table__tr__body"
  >
    <td
      v-for="(col, headerKey) of dataHeaders"
      :key="headerKey"
      class="wt-tree-table__td"
    >
      <div class="wt-tree-table__td__content">
        <div v-if="headerKey === 0" class="wt-tree-table__td__icon-wrapper">
          <wt-icon-btn v-for="n in lineCount" :key="n" icon="tree-line1" class="wt-tree-table-row__tree-icon"></wt-icon-btn>
          <wt-icon-btn v-if="nestedLevel >= 1" icon="tree-cross1" class="wt-tree-table-row__tree-icon"></wt-icon-btn>
          <wt-icon-btn v-if="!row[children]" class="wt-tree-table-row__show-button" :class="{'hidden': !row[children]}" :icon="collapsed ? 'plus' : 'minus'" @click="collapsed = !collapsed"></wt-icon-btn>
          <wt-checkbox
              v-if="selectable"
              :selected="_selected.includes(row)"
              @change="$emit('handleSelection', {
        row,
        select: $event
      })"
          />
          <wt-icon-btn v-if="row[children]" class="wt-tree-table-row__show-button" :icon="collapsed ? 'plus' : 'minus'" @click="collapsed = !collapsed"></wt-icon-btn>
        </div>
        <slot
          :index="dataKey"
          :item="row"
          :name="col.value"
        >
          <div>{{ row[col.value] }}</div>
        </slot>
      </div>
    </td>

    <td
        v-if="gridActions"
        class="wt-tree-table__td__actions"
    >
      <div class="wt-tree-table__td__content">
        <slot
          :index="dataKey"
          :item="row"
          name="actions"
        />
      </div>
    </td>
  </tr>

  <template v-if="!collapsed">
    <wt-tree-table-row
        v-for="childRow in row[children]"
        :key="childRow.id"
        :dataKey="dataKey"
        :data-headers="dataHeaders"
        :row="childRow"
        :columns-style="columnsStyle"
        :selectable="selectable"
        :_selected="_selected"
        :children="children"
        @handleSelection="$emit('handleSelection', {
      row: $event.row,
      select: $event.select
    })"
        :nestedLevel="nestedLevel + 1"
    >
      <template v-for="(col, headerKey) of dataHeaders" :key="headerKey" #[col.value]="{ item }">
        <slot
          :index="dataKey"
          :item="item"
          :name="col.value"
        >
          <div>{{ item[col.value] }}</div>
        </slot>
      </template>
      <template #actions="{ item }">
        <slot
          :index="dataKey"
          :item="item"
          name="actions"
        />
      </template>
    </wt-tree-table-row>
  </template>
</template>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-tree-table__td {
  @extend %typo-body-1;
  height: fit-content;
  min-height: var(--table-min-height);
  padding: var(--spacing-xs);
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    //display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: var(--spacing-xs);
  }

  &__icon-wrapper {
    display: flex;
    margin-right: var(--spacing-xs);
    align-items: flex-start;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    text-wrap: nowrap;
  }
}

.wt-tree-table-row--secondary {
  background: var(--wt-table-zebra-color)
}
</style>
