<template>
  <section class="chat-input">
    <chat-text-field
        v-model:text="draft"
    />
    <chat-input-actions-wrapper>
      <template #actions>
        <slot name="actions" />
      </template>
    </chat-input-actions-wrapper>
  </section>
</template>

<script setup lang="ts">
import ChatTextField from './chat-text-field.vue';
import ChatInputActionsWrapper from './chat-input-actions-wrapper.vue';

const draft = defineModel<string>('draft', { required: true });

</script>

<style scoped>
.chat-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
}
</style>