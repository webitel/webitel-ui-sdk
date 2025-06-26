<template>
  <div>
    <wt-button @click="toggle">Open</wt-button>
    <wt-popover ref="popover">
      <div class="flex flex-col gap-2">
        Example popover using
        <wt-button @click="toggleInsert">Button</wt-button>
      </div>
    </wt-popover>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue';

import { WtButton, WtPopover } from '@webitel/ui-sdk/components';

const popover = useTemplateRef('popover');

const toggle = (event) => {
  popover.value.toggle(event);
};
</script>
