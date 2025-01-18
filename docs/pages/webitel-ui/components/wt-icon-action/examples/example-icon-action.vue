<script setup>
import { WtIconActionIconMappings } from '__lib__/components/wt-icon-action/iconMappings.js';
import { IconAction } from '__lib__/enums/index.js';

const IAMap = Object.entries(IconAction).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const availableActions = Object.keys(WtIconActionIconMappings);
</script>

<template>
  <wt-table
    :data="
      availableActions.map((action) => ({
        icon: action,
        action: IAMap[action],
      }))
    "
    :headers="[
      { value: 'icon', width: '80px' },
      { value: 'action', text: 'IconAction enum key' },
    ]"
    :selectable="false"
  >
    <template #icon="{ item }">
      <wt-icon-action :action="item.icon" />
    </template>

    <template #action="{ item }">
      <wt-copy-action
        :text="`IconAction.${item.action}`"
        style="margin-right: var(--spacing-2xs)"
      />
      <code>IconAction.{{ item.action }}</code>
    </template>
  </wt-table>
</template>

<style lang="scss" scoped></style>
