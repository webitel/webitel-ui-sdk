<template>
  <div class="wt-upload-file-icon-btn">
    <wt-icon-btn
      v-tooltip="t('reusable.upload')"
      icon="import-csv"
      @click="triggerFileInput"
    />

    <input
      ref="fileInput"
      :accept="accept"
      class="wt-upload-file-icon-btn__input"
      type="file"
      @change="inputFileHandler"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
	name: 'UploadFileIconBtn',
});

interface Props {
	accept?: string;
}

const props = withDefaults(defineProps<Props>(), {
	accept: '.csv',
});

const emit =
	defineEmits<(e: 'change', files: FileList | null, event: Event) => void>();

const { t } = useI18n();

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
	fileInput.value?.click();
};

const clearFileInput = () => {
	if (fileInput.value) fileInput.value.value = '';
};

const inputFileHandler = (event: Event) => {
	const target = event.target as HTMLInputElement | null;
	const files = target?.files ?? null;

	emit('change', files, event);
	clearFileInput();
};

const { accept } = props;
</script>

<style lang="scss">
.wt-upload-file-icon-btn {
  position: relative;
  line-height: 0;

  .wt-upload-file-icon-btn__input {
    position: absolute;
    top: -2px;
    left: 0;
    visibility: hidden;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 0;
  }
}
</style>
