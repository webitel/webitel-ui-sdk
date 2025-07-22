<template>
  <wt-popover>
    <template #activator="{ toggle }">
      <wt-button @click="toggle">Open</wt-button>
    </template>

    <template #default="{ hide }">
      <div class="flex flex-col gap-2">
        Example popover using
        <wt-button @click="hide">Button</wt-button>
      </div>
    </template>
  </wt-popover>
</template>

<script setup>
import { WtButton, WtPopover } from '@webitel/ui-sdk/components';
</script>
