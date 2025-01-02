<script setup>
import { IActionData } from '__lib__/components/wt-icon-action/IActionData.js';
import { IconAction } from '__lib__/enums/index.js';

const IAMap = Object.entries(IconAction).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const availableActions = Object.keys(IActionData);
</script>

<template>
  <wt-table
    :data="availableActions.map((action) => ({ icon: action, action: IAMap[action],  }))"
    :headers="[{ value: 'icon', width: '80px' }, { value: 'action', text: 'IconAction enum key' }]"
    :selectable="false"
  >
    <template #icon="{ item }">
      <wt-icon-action
        :action="item.icon"
      />
    </template>

    <template #action="{ item }">
      <wt-copy-action
        :text="`IconAction.${ item.action }`"
        style="margin-right: var(--spacing-2xs);"
      />
      <code>IconAction.{{ item.action }}</code>
    </template>
  </wt-table>
</template>

<style scoped lang="scss">

</style>
