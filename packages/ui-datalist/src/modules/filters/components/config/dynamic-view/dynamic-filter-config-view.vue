<template>
  <div class="dynamic-filter-config-view">
    <wt-popover ref="popover" :disabled="props.disabled">
      <template #activator="{ toggle }">
        <slot
          name="activator"
          v-bind="{ toggle, disabled: props.disabled }"
        />
      </template>

      <template #default="{ hide }">
        <slot
          name="content"
          v-bind="{ hide }"
        />
      </template>
    </wt-popover>
  </div>
</template>

<script lang="ts" setup>
/**
 * this component should only be used for config view representation: tooltip/popup/etc,
 * and their styling
 */
import { WtPopover } from '@webitel/ui-sdk/components';
import { defineExpose, ref } from 'vue';

interface Props {
	disabled?: boolean;
	disableClickAway?: boolean;
}

const props = defineProps<Props>();

const popover = ref(null);

const hidePopover = () => {
	popover.value?.hide();
};

defineExpose({
	hidePopover,
});
</script>

<style scoped></style>
