<template>
  <wt-expansion-panel
    class="audit-form-group"
    card
  >
    <template #title>
      <div class="audit-form-group-title">
        <wt-icon
          v-if="!readonly"
          class="audit-form-group__drag-icon"
          icon="move"
          @click.stop
        />
        <span>{{ group.name }}</span>
      </div>
    </template>

    <template #actions>
      <wt-icon-btn
        v-tooltip="$t('reusable.copy')"
        :disabled="readonly"
        icon="copy"
        @click.stop="emit('copy')"
      />
      <wt-icon-btn
        v-tooltip="$t('reusable.delete')"
        :disabled="readonly"
        icon="bucket"
        @click.stop="emit('delete')"
      />
    </template>

    <section class="audit-form-group-content">
      <div class="audit-form-group-content__name">
        <wt-input-text
          :label="$t('webitelUI.auditForm.groupName')"
          :placeholder="$t('webitelUI.auditForm.groupName')"
          :model-value="group.name"
          :v="v$.name"
          :disabled="readonly"
          required
          @update:model-value="emit('update:group', { ...group, name: $event })"
        />
        <wt-button
          v-if="!readonly"
          @click="emit('add-question')"
        >
          {{ $t('webitelUI.auditForm.addQuestion') }}
        </wt-button>
      </div>

      <div
        ref="criteriaList"
        class="audit-form-group-criteria"
      >
        <slot />
        <div
          v-if="dropZone"
          class="audit-form-group-drop-zone"
        >
          <wt-icon
            :color="IconColor.PRIMARY"
            :size="ComponentSize.XXL"
            icon="upload"
          />
          <p>{{ $t('webitelUI.auditForm.dropCriteriaHint') }}</p>
        </div>
      </div>
    </section>
  </wt-expansion-panel>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, inject, onMounted, useTemplateRef } from 'vue';

import {
	WtButton,
	WtIcon,
	WtIconBtn,
	WtInputText,
} from '../../../../components';
import WtExpansionPanel from '../../../../components/wt-expansion-panel/wt-expansion-panel.vue';
import { ComponentSize, IconColor } from '../../../../enums';
import type { AuditFormSortableEvent } from '../../composables/useAuditFormSortable';
import { useAuditFormSortable } from '../../composables/useAuditFormSortable';
import type { AuditFormGroupItem } from '../../scripts/criteriaTree';

const props = defineProps<{
	group: AuditFormGroupItem;
	nameInUse?: boolean;
	dropZone?: boolean;
}>();

const emit = defineEmits<{
	'update:group': [
		AuditFormGroupItem,
	];
	copy: [];
	delete: [];
	'add-question': [];
	'drag:start': [
		AuditFormSortableEvent,
	];
	'drag:end': [
		AuditFormSortableEvent,
	];
}>();

const readonly = inject<boolean>('readonly', false);

const v$ = useVuelidate(
	{
		name: {
			required,
			nameAlreadyInUse: () => !props.nameInUse,
		},
	},
	{
		name: computed(() => props.group.name),
	},
	{
		$autoDirty: true,
	},
);

const criteriaList = useTemplateRef('criteriaList');

onMounted(() => v$.value.$touch());

useAuditFormSortable(criteriaList, {
	group: {
		name: 'audit-form-criteria',
		put: (_to, _from, dragEl: HTMLElement) => !!dragEl.dataset.questionId,
	},
	handle: '.audit-form-question-read__drag-icon',
	draggable: '[data-question-id]',
	onStart: (event: AuditFormSortableEvent) => emit('drag:start', event),
	onEnd: (event: AuditFormSortableEvent) => emit('drag:end', event),
});
</script>

<style lang="scss" scoped>
.audit-form-group-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.audit-form-group-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs);

  &__name {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-xs);

    .wt-input-text {
      flex: 1;
    }
  }
}

.audit-form-group-criteria {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.audit-form-group-drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  border: 2px dashed var(--primary-color);
  border-radius: var(--border-radius);
  background: var(--primary-light-color);
  padding: var(--spacing-sm);
}
</style>
