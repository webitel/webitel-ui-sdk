<template>
  <wt-popup
    class="delete-confirmation-popup"
    size="sm"
    v-bind="attrs"
    @close="close"
  >
    <template #title>
      {{ title }}
    </template>
    <template #main>
      <slot name="main">
        <div class="delete-confirmation-popup__content">
          <p class="delete-confirmation-popup__message">
            {{ deleteMessage ? deleteMessage : $t('webitelUI.deleteConfirmationPopup.askingAlert', { subject }) }}
          </p>
        </div>
      </slot>
    </template>
    <template #actions>
      <slot name="actions" :isDeleting="isDeleting" :confirm="confirm" :close="close">
        <wt-button
          :disabled="isDeleting"
          color="secondary"
          @click="close"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
        <wt-button
          :loading="isDeleting"
          color="error"
          @click="confirm"
        >
          {{ $t('reusable.delete') }}
        </wt-button>
      </slot>
    </template>
  </wt-popup>
</template>

<script setup>
import { ref, useAttrs } from 'vue';
import i18n from '../../locale/i18n.js';

const props = defineProps({
  title: {
    type: String,
    default: i18n.global.t('webitelUI.deleteConfirmationPopup.title'),
  },
  deleteMessage: {
    type: String,
    default: '',
  },
  subject: {
    type: String,
    default: '',
  },
  callback: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['close']);

const attrs = useAttrs();

const isDeleting = ref(false);

function close() {
  emit('close');
}

async function confirm() {
  try {
    isDeleting.value = true;
    await props.callback();
    close();
  } finally {
    isDeleting.value = false;
  }
}
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
