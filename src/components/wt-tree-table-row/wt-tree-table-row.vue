<template>
  <tr
    class="wt-tree-table-row"
    :class="[{ 'wt-tree-table-row--alternate': rowPosition % 2 }]"
  >
    <td
      v-for="(col, headerKey) of dataHeaders"
      :key="headerKey"
      class="wt-tree-table-td"
    >
      <div class="wt-tree-table-td__content">
        <div
          v-if="!headerKey"
          class="wt-tree-table-td__icon-wrapper"
        >
          <div
            v-for="treeLine in lineCount"
            :key="treeLine"
            class="wt-tree-table-row__tree-space"
          ></div>
          <!-- This two empty icons need to create space for nested elements -->
          <wt-icon-btn
            v-if="!data[childrenProp] && nestingLevel"
            :class="{ hidden: !data[childrenProp] }"
            :icon="collapsed ? 'tree-expand' : 'tree-collapse'"
            @click="collapsed = !collapsed"
          />
          <wt-checkbox
            v-if="selectable"
            :selected="isSelectedRow"
            @change="
              $emit('update:selected', {
                data,
                select: $event,
              })
            "
          />
          <wt-icon-btn
            v-if="data[childrenProp]"
            :icon="collapsed ? 'tree-expand' : 'tree-collapse'"
            @click="collapsed = !collapsed"
          />
        </div>
        <slot
          :index="rowPosition"
          :item="data"
          :name="col.value"
        >
          {{ data[col.value] }}
        </slot>
      </div>
    </td>

    <td
      v-if="gridActions"
      class="wt-tree-table-td__actions"
    >
      <div class="wt-tree-table-td__content">
        <slot
          :index="rowPosition"
          :item="data"
          name="actions"
        />
      </div>
    </td>
  </tr>

  <template v-if="!collapsed">
    <wt-tree-table-row
      v-for="(child, index) in data[childrenProp]"
      :key="index"
      :row-position="rowPosition"
      :data-headers="dataHeaders"
      :data="child"
      :selectable="selectable"
      :selected-elements="selectedElements"
      :children-prop="childrenProp"
      :nesting-level="childLevel"
      @update:selected="
        $emit('update:selected', {
          data: $event.data,
          select: $event.select,
        })
      "
    >
      <template
        v-for="(col, headerKey) of dataHeaders"
        :key="headerKey"
        #[col.value]="{ item }"
      >
        <slot
          :index="rowPosition"
          :item="item"
          :name="col.value"
        >
          <div>{{ item[col.value] }}</div>
        </slot>
      </template>
      <template #actions="{ item }">
        <slot
          :index="rowPosition"
          :item="item"
          name="actions"
        />
      </template>
    </wt-tree-table-row>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import WtCheckbox from '../wt-checkbox/wt-checkbox.vue';
import WtIconBtn from '../wt-icon-btn/wt-icon-btn.vue';
import type { TableHeader } from '../wt-table/types/table-header.ts';

const props = withDefaults(
  defineProps<{
    /**
     * 'It's a data what pass to display row.
     */
    data: Record<string, unknown>;
    /**
     * 'It's a number of position row in table.
     */
    rowPosition: number;
    /**
     * 'It's a key in data object, which contains children array. '
     */
    childrenProp: string;
    selectable?: boolean;
    selectedElements: Record<string, any>[];
    dataHeaders: TableHeader[];
    gridActions?: boolean;
    /**
     * 'It's a nesting level of row. 0 - root row, 1 - first level of nesting, etc.'
     */
    nestingLevel?: number;
  }>(),
  {
    selectable: false,
    gridActions: true,
    nestingLevel: 0,
  },
);

defineEmits(['update:selected']);

const collapsed = ref(true);
const lineCount = computed(() => {
  return props.nestingLevel;
});
const childLevel = computed(() => {
  return props.nestingLevel + 1;
});

const isSelectedRow = computed(() => {
  return props.selectedElements.includes(props.data);
});
</script>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-tree-table-td {
  @extend %typo-body-1;
  height: fit-content;
  min-height: var(--wt-tree-table-min-height);
  padding: var(--spacing-xs);
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    display: flex;
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

.wt-tree-table-row {
  background: var(--wt-tree-table-primary-color);

  &__tree-space {
    width: var(--icon-md-size);
    height: var(--icon-md-size);
  }

  &--alternate {
    background: var(--wt-tree-table-zebra-color);
  }
}
</style>
