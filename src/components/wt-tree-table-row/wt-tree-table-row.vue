<script setup>
import WtCheckbox from '../wt-checkbox/wt-checkbox.vue';
import WtExpansionPanel from '../wt-expansion-panel/wt-expansion-panel.vue';
import { computed, ref } from 'vue';
import WtButton from '../wt-button/wt-button.vue';
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

const collapsed = ref(true)
const lineCount = computed(() => {
  if(props.nestedLevel <= 1) return 0

  return props.nestedLevel - 1
})
</script>

<template>
  <tr
    :class="`wt-table__tr__${row.id || dataKey} wt-tree-table-row`"
    :style="[`--child-space:calc(var(--spacing-sm)*${nestedLevel})`, `--nested-level:${nestedLevel}`, columnsStyle]"
    class="wt-table__tr wt-table__tr__body"
  >
    <td
      v-if="selectable"
      class="wt-table__td wt-table__td--checkbox"
    >
      <wt-icon-btn v-for="n in lineCount" :key="n" icon="tree-line" class="wt-tree-table-row__tree-icon"></wt-icon-btn>
      <wt-icon-btn v-if="nestedLevel >= 1" icon="tree-cross" class="wt-tree-table-row__tree-icon"></wt-icon-btn>
      <wt-checkbox
          :selected="_selected.includes(row)"
          @change="$emit('handleSelection', {
        row,
        select: $event
      })"
      />
      <wt-icon-btn class="wt-tree-table-row__show-button" :class="{'hidden': !row[children]}" :icon="collapsed ? 'plus' : 'minus'" @click="collapsed = !collapsed"></wt-icon-btn>
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
  <wt-expansion-panel :collapsed="collapsed" hideTitle>
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
  </wt-expansion-panel>
</template>

<style lang="scss" scoped>
//.wt-tree-table-row {
//  &__tree-icon {
//    flex-shrink: 0;
//  }
//}

.wt-table__td--checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
