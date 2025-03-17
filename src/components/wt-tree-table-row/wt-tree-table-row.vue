<template>
  <tr
    :class="[{ 'wt-tree-table-row--alternate': rowPosition % 2 }]"
    class="wt-tree-table-row"
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
      :children-prop="childrenProp"
      :data="child"
      :data-headers="dataHeaders"
      :nesting-level="childLevel"
      :row-position="rowPosition"
      :searched-prop="searchedProp"
      :selectable="selectable"
      :selected-elements="selectedElements"
      @expanded-collapse="openCollapse"
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

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import WtCheckbox from '../wt-checkbox/wt-checkbox.vue';
import WtIconBtn from '../wt-icon-btn/wt-icon-btn.vue';
import type { WtTableHeader } from '../wt-table/types/WtTable.d.ts';

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
    dataHeaders: WtTableHeader[];
    gridActions?: boolean;
    /**
     * 'It's a nesting level of row. 0 - root row, 1 - first level of nesting, etc.'
     */
    nestingLevel?: number;
    /**
     * 'It's a key in data object, which contains field what display searched elements. By this field, table will be opened to elements with this field value. '
     */
    searchedProp?: string;
  }>(),
  {
    selectable: false,
    gridActions: true,
    nestingLevel: 0,
    searchedProp: 'searched',
  },
);

const emit = defineEmits(['update:selected', 'expanded-collapse']);

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

const openCollapse = () => {
  collapsed.value = false;
  emit('expanded-collapse');
};

const hasSearchedElement = (data: Record<string, any>, nestedLevel = 0) => {
  // Check if the object itself has searched
  if (data[props.searchedProp] && nestedLevel) {
    return true;
  }

  // Check if the object has children
  if (Array.isArray(data[props.childrenProp])) {
    // Iterate through the array
    for (const child of data[props.childrenProp]) {
      // Recursively check nested objects
      if (hasSearchedElement(child, nestedLevel + 1)) {
        return true;
      }
    }
  }

  // If no match is found, return false
  return false;
};

onMounted(() => {
  if (props.searchedProp && hasSearchedElement(props.data)) {
    openCollapse();
  }
});
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-tree-table-td {
  @extend %typo-body-1;
  height: fit-content;
  min-height: var(--wt-tree-table-min-height);
  padding: var(--spacing-xs);
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    .wt-tree-table-td__content {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }
  }

  &__icon-wrapper {
    display: flex;
    align-items: flex-start;
    margin-right: var(--spacing-xs);
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
