<script setup>
import WtCheckbox from '../wt-checkbox/wt-checkbox.vue';

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
    default: false
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
})

defineEmits(['handleSelection'])
</script>

<template>
  <tr
    :class="`wt-table__tr__${row.id || dataKey}`"
    :style="[columnsStyle,`--child-space:calc(var(--spacing-sm)*${nestedLevel})`]"
    class="wt-table__tr wt-table__tr__body"
  >
    <td
      v-if="selectable"
      class="wt-table__td wt-table__td--checkbox"
    >
      <wt-checkbox
          :selected="_selected.includes(row)"
          @change="$emit('handleSelection', {
        row,
        select: $event
      })"
      />
    </td>

    <td
      v-for="(col, headerKey) of dataHeaders"
      :key="headerKey"
      class="wt-table__td"
    >
      <div>{{ row[col.value] }}</div>
      <slot
        :index="dataKey"
        :item="row"
        :name="col.value"
      >
        <div>{{ row[col.value] }}</div>
      </slot>
    </td>

    <td
        v-if="gridActions"
        class="wt-table__td__actions"
    >
      <slot
        :index="dataKey"
        :item="row"
        name="actions"
      />
    </td>
  </tr>
  <wt-tree-table-row
    v-for="childRow in row[children]"
    :key="childRow.id"
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
    <template
      v-for="(col, headerKey) of dataHeaders"
      :key="headerKey"
      #[col.value]
    >
      <slot
        :index="headerKey"
        :item="childRow"
        :name="`${col.value}-child`"
      >
        <div>{{ childRow[col.value]  }}</div>
        <strong>{{ col.value }}</strong>
      </slot>
    </template>
  </wt-tree-table-row>
</template>
