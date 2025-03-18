<template>
  <wt-popup
    class="wt-confirm-dialog"
    size="sm"
    v-bind="attrs"
    @close="close"
  >
    <template #title>
      {{ title }}
    </template>
    <template #main>
      <slot name="main">
        <div class="wt-confirm-dialog__content">
          <p class="wt-confirm-dialog__message">
            {{
              deleteMessage
                ? deleteMessage
                : $t('webitelUI.deleteConfirmationPopup.askingAlert', {
                    subject,
                  })
            }}
          </p>
        </div>
      </slot>
    </template>
    <template #actions>
      <slot
        name="actions"
        :is-deleting="isDeleting"
        :confirm="confirm"
        :close="close"
      >
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

const props = defineProps({
  title: {
    type: String,
    required: true,
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

const emit = defineEmits(['close', 'confirm']);

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
.wt-confirm-dialog__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.wt-confirm-dialog__message {
  text-align: center;
}
</style>
