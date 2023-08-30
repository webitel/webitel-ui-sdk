<template>
  <wt-popup
    class="delete-confirmation-popup"
    width="332"
    @close="close"
  >
    <template v-slot:title>{{ $t('webitelUI.deleteConfirmationPopup.title') }}</template>
    <template v-slot:main>
      <div class="delete-confirmation-popup__content">
        <wt-icon icon="attention" color="danger"/>
        <p class="delete-confirmation-popup__message">
          {{ $t('webitelUI.deleteConfirmationPopup.askingAlert',
          { entity: props.entity || defaultEntity }) }}
        </p>
      </div>
    </template>
    <template v-slot:actions>
      <wt-button
        color="accent"
        :loading="isDeleting"
        @click="confirm"
      >{{ $t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        color="secondary"
        :disabled="isDeleting"
        @click="close"
      >{{ $t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { computed, ref } from 'vue';
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
  entity: {
    type: String,
  },
});

const emit = defineEmits([
  'close',
]);

const { t } = useI18n();

const isDeleting = ref(false);

const defaultEntity = props.deleteCount === 1 ? 'item' : 'items';

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
