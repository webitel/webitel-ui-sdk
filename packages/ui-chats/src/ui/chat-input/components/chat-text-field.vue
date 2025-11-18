<template>
    <wt-textarea
        ref="chatTextFieldInput"
        :model-value="textModel"
        :size="size"
        autoresize
        @update:model-value="textModel = $event"
    />
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { WtTextarea } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';

const textModel = defineModel<string>('text', { required: true });

const props = defineProps<{
  size: ComponentSize;
}>();

defineExpose({
  focus,
});

const chatTextFieldInputRef = useTemplateRef<HTMLTextAreaElement>('chatTextFieldInput');

function focus() {
  chatTextFieldInputRef.value!.focus();
};
</script>