<template>
  <wt-popup
    :width="500"
    class="wt-save-failed-popup"
    @close="closePopup"
  >
    <template #title>
      {{ $t('webitelUI.saveFailedPopup.title') }}
    </template>
    <template #main>
      <div class="flow-save-filed-popup__wrapper">
        <wt-icon
          color="error"
          icon="attention"
        />
        <p>{{ $t('webitelUI.saveFailedPopup.label') }}</p>
      </div>
    </template>
    <template #actions>
      <wt-button @click="save">
        {{ $t('reusable.retry') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="download"
      >
        {{ $t('webitelUI.saveFailedPopup.exportToJson') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="closePopup"
      >
        {{ $t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'FlowSaveFailedPopup',
  emits: ['close-popup', 'save', 'download'],
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    save() {
      this.$emit('save');
    },
    download() {
      this.$emit('download');
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-save-filed-popup__wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .wt-icon {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
