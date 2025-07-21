<template>
  <div class="dynamic-filter-config-view">
    <slot
      name="activator"
      v-bind="{ toggle, disabled: props.disabled }"
    />

    <wt-popover ref="popover">
      <template #default>
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
import {useTemplateRef} from "vue";

interface Props {
  disabled?: boolean;
  disableClickAway?: boolean;
}

const props = defineProps<Props>();

const popover = useTemplateRef('popover');

const toggle = (event) => {
  popover.value.toggle(event);
};

const hide = () => {
  popover.value.hide()
};
</script>

<style scoped></style>
