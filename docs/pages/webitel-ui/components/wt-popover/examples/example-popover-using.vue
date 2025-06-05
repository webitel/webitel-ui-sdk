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

import WtButton from '../../../../../../src/components/wt-button/wt-button.vue';
import WtPopover from '../../../../../../src/components/wt-popover/wt-popover.vue';

const popover = useTemplateRef('popover');

const toggle = (event) => {
  popover.value.toggle(event);
};
</script>
