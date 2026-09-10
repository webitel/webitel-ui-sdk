<template>
  <wt-popup
    v-bind="attrs"
    :shown="shown"
    size="sm"
    class="save-copy-popup"
    @close="emit('close')"
  >
    <template #title>
      {{ t('webitelUI.saveCopyPopup.title') }}
    </template>
    <template #main>
      <wt-input-text
        v-model:model-value="name"
        required
        :label="t('webitelUI.saveCopyPopup.name')"
        @keyup.enter="save"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!name"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
	shown?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	shown: false,
});

const emit = defineEmits<{
	save: [
		name: string,
	];
	close: [];
}>();

const attrs = useAttrs();

const name = ref('');

watch(
	() => props.shown,
	(isShown) => {
		if (isShown) name.value = '';
	},
);

function save() {
	if (!name.value) return;
	emit('save', name.value);
}
</script>
