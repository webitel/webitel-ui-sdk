<template>
  <div class="wt-screen-recordings-action">
    <wt-context-menu
      :options="contextOptions"
      max-width="400px"
      @click="handleOptionSelect"
    >
      <template #activator="{ toggle }">
        <wt-icon-btn
          v-if="contextOptions?.length"
          icon="preview-tag-video"
          @click="toggle"
        />
      </template>
      <template #option="{ text }">
        <div class="wt-screen-recordings-action__option">
          <wt-icon icon="preview-tag-video" />
          {{ text }}
        </div>
      </template>
    </wt-context-menu>
    <p>
      {{ contextOptions?.length || EMPTY_SYMBOL }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { computed } from 'vue';

import { EMPTY_SYMBOL } from '../../../utils/index.ts';

interface Props {
	files: unknown[];
}

const props = defineProps<Props>();

const emit = defineEmits<(e: 'set-video', val: unknown) => void>();

const contextOptions = computed(() =>
	props?.files?.[EngineCallFileType.FileTypeScreensharing]?.map(
		({ name, id, mimeType, type }) => ({
			text: name,
			id,
			mimeType,
			type,
		}),
	),
);

const handleOptionSelect = ({ option }) => {
	if (option.id && option.type === EngineCallFileType.FileTypeScreensharing) {
		emit('set-video', option);
	}
};
</script>

<style lang="scss" scoped>
.wt-screen-recordings-action {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.wt-screen-recordings-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
