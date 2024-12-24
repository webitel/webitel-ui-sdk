<template>
  <wt-confirm-dialog
    v-bind="attrs"
    class="delete-confirmation-popup"
    :title="$t('webitelUI.deleteConfirmationPopup.title')"
    :callback="callback"
    @close="$emit('close')"
  >
    <template #main>
      <div class="delete-confirmation-popup__content">
        <wt-icon
          color="error"
          icon="attention"
        />
        <p class="delete-confirmation-popup__message">
          {{ deleteMessage }}
        </p>
      </div>
    </template>
    <template #actions="{ isDeleting, close, confirm}">
      <wt-button
        :loading="isDeleting"
        @click="confirm"
      >
        {{ $t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        :disabled="isDeleting"
        color="secondary"
        @click="close"
      >
        {{ $t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-confirm-dialog>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  deleteCount: {
    type: Number,
    required: true,
  },
  callback: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['close']);

const attrs = useAttrs();

const { t } = useI18n();

const deleteMessage = computed(() => {
  if (props.deleteCount === 0) {
    return t('webitelUI.deleteConfirmationPopup.tableAskingAlert', 2, null, {
      count: t('webitelUI.deleteConfirmationPopup.deleteAll'),
    });
  }
  return t('webitelUI.deleteConfirmationPopup.tableAskingAlert', { count: props.deleteCount }, null);
});
</script>

<style scoped>
.delete-confirmation-popup__content {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.delete-confirmation-popup__message {
  text-align: center;
}

</style>
