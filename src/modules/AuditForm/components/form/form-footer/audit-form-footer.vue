<template>
  <footer class="audit-form-footer">
    <template
      v-if="mode === 'fill'"
    >
      <wt-button
        :disabled="props.invalid || disabledSave"
        @click="emit('fill:save')"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('fill:cancel')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>


    <template v-else-if="mode === 'create' && !readonly">
      <wt-button
        color="secondary"
        :disabled="props.invalid"
        @click="emit('create:add-group')"
      >
        {{ t('webitelUI.auditForm.addGroup') }}
      </wt-button>
      <wt-button
        class="audit-form-footer-create-question-action"
        :disabled="props.invalid"
        @click="emit('create:add')"
      >
        {{ t('webitelUI.auditForm.addQuestion') }}
      </wt-button>
    </template>
  </footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';

import WtButton from '../../../../../components/wt-button/wt-button.vue';

const mode = inject('mode');
const readonly = inject('readonly');

const props = defineProps<{
	invalid: boolean;
	disabledSave?: boolean;
}>();

const emit = defineEmits<{
	'fill:save': [];
	'fill:cancel': [];
	'create:add': [];
	'create:add-group': [];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.audit-form-footer {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.audit-form-footer-create-question-action {
  margin-left: auto;
}
</style>
