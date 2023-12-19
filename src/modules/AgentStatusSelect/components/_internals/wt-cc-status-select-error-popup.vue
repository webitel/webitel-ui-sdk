<template>
  <wt-popup
    class="wt-cc-status-select-error-popup"
    min-width="480"
    @close="close"
  >
    <template #header>
      {{ $t('webitelUI.agentStatusSelect.statusSelectErrorPopup.title') }}
    </template>
    <template #main>
      <article class="wt-cc-status-select-error-popup__main-wrapper">
        <wt-icon
          icon="attention"
          color="error"
        />
        <p class="wt-cc-status-select-error-popup__message">
          {{ $t('webitelUI.agentStatusSelect.statusSelectErrorPopup.message') }}
        </p>
      </article>
    </template>
    <template #actions>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('reusable.ok') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

function close() {
  emit('close');
}

</script>

<style lang="scss" scoped>
.wt-cc-status-select-error-popup__main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
