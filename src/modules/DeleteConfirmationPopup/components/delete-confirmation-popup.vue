<template>
  <wt-popup
    class="delete-confirmation-popup"
    v-bind="attrs"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ $t('webitelUI.deleteConfirmationPopup.title') }}
    </template>
    <template #main>
      <div class="delete-confirmation-popup__content">
        <wt-icon
          icon="attention"
          color="error"
        />
        <p class="delete-confirmation-popup__message">
          {{ deleteMessage }}
        </p>
      </div>
    </template>
    <template #actions>
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
  </wt-popup>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue';
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

const emit = defineEmits([
 'close',
]);

const attrs = useAttrs();

const { t } = useI18n();

const isDeleting = ref(false);

const deleteMessage = computed(() => {
  if (props.deleteCount === 0) {
    return t(
      'webitelUI.deleteConfirmationPopup.askingAlert',
      2,
      null,
      { count: t('webitelUI.deleteConfirmationPopup.deleteAll') },
    );
  }
  return t(
    'webitelUI.deleteConfirmationPopup.askingAlert',
    { count: props.deleteCount },
    null,
  );
});

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
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.delete-confirmation-popup__message {
  text-align: center;
}

</style>
