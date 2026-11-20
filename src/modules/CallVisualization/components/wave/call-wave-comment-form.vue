<template>
  <wt-popup
    class="call-wave-comment-form"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('webitelUI.callVisualization.addNote') }}
    </template>
    <template #main>
      <div class="call-wave-comment-form__range">
        <wt-timepicker
          v-model:model-value="draft.startSec"
          :v="startSecValidation"
          :custom-validators="startCustomValidation"
          :label="t('reusable.from')"
        />
        <wt-timepicker
          v-model:model-value="draft.endSec"
          :v="endSecValidation"
          :custom-validators="endCustomValidation"
          :label="t('reusable.to')"
        />
      </div>
      <wt-textarea
        v-model:model-value="draft.note"
        class="wt-scrollbar"
        :rows="8"
        :placeholder="t('webitelUI.callVisualization.noteText')"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="disableSaving"
        :loading="isSaving"
        @click="saveComment"
      >
        {{ t('reusable.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';
import deepCopy from 'deep-copy';
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import convertDuration from '../../../../scripts/convertDuration';
import type {
	CommentFormDraft,
	NewCommentDraft,
	RangeField as RangeFieldType,
} from '../../types/callWave';
import { RangeField } from '../../types/callWave';

const props = withDefaults(
	defineProps<{
		callDuration: number;
		comment: NewCommentDraft;
		isSaving?: boolean;
	}>(),
	{
		isSaving: false,
	},
);

const emit = defineEmits<{
	save: [
		value: CommentFormDraft,
	];
	close: [];
	'update-draft-range': [
		value: {
			startSec: number;
			endSec: number;
		},
	];
}>();

const { t } = useI18n();

const draft = reactive<CommentFormDraft>({
	note: '',
	startSec: 0,
	endSec: 0,
});
const lastEditedField = ref<RangeFieldType | null>(null);

const minimalEndCommentValue = computed(() =>
	Math.min(props.callDuration, Number(draft.startSec)),
);

const maximumStartCommentValue = computed(() =>
	lastEditedField.value === RangeField.StartSec
		? Math.min(props.callDuration, Number(draft.endSec))
		: props.callDuration,
);

const rules = computed(() => ({
	draft: {
		startSec: {
			required,
			minValue: minValue(0),
			maxValue: maxValue(maximumStartCommentValue.value),
		},
		endSec: {
			required,
			minValue: minValue(
				lastEditedField.value === RangeField.EndSec
					? Number(draft.startSec)
					: 0,
			),
			maxValue: maxValue(props.callDuration),
		},
	},
}));

const v$ = useVuelidate(rules, {
	draft,
});

// vuelidate exports BaseValidation, but its `[key: string]: any` breaks Vue
// UnwrapRef / Pick, and computed rules make `v$.value.draft` infer as undefined.
interface DraftValidation {
	$touch: () => void;
	$reset: () => void;
	$pending: boolean;
	$invalid: boolean;
	startSec: {
		$touch: () => void;
		$reset: () => void;
	};
	endSec: {
		$touch: () => void;
		$reset: () => void;
	};
}

const draftValidation = computed(
	() => v$.value.draft as DraftValidation | undefined,
);
const startSecValidation = computed(() => draftValidation.value?.startSec);
const endSecValidation = computed(() => draftValidation.value?.endSec);

const disableSaving = computed(() => {
	const hasInvalidRange = Number(draft.startSec) > Number(draft.endSec);
	if (!draft.note.trim()) return true;
	const validation = draftValidation.value;
	if (!validation) return true;

	return validation.$pending || validation.$invalid || hasInvalidRange;
});

const customValidation = (minValue: number, maxValue: number) => [
	{
		name: 'minValue',
		text: t('validation.minValue', {
			min: convertDuration(minValue),
		}),
	},
	{
		name: 'maxValue',
		text: t('validation.maxValue').concat(` ${convertDuration(maxValue)}`),
	},
];

const startCustomValidation = computed(() =>
	customValidation(0, maximumStartCommentValue.value),
);

const endCustomValidation = computed(() =>
	customValidation(minimalEndCommentValue.value, props.callDuration),
);

function initDraft({ note, startSec, endSec, fileId }: NewCommentDraft) {
	Object.assign(draft, {
		note,
		startSec,
		endSec,
		fileId,
	});
}

function saveComment() {
	emit('save', deepCopy(draft));
}

function close() {
	emit('close');
}

function emitDraftRange() {
	const startSec = Number(draft.startSec);
	const endSec = Number(draft.endSec);
	if (Number.isNaN(startSec) || Number.isNaN(endSec)) {
		return;
	}
	emit('update-draft-range', {
		startSec,
		endSec,
	});
}

function handleRangeFieldChange(activeField: RangeFieldType) {
	const validation = draftValidation.value;
	if (!validation) return;

	lastEditedField.value = activeField;
	if (activeField === RangeField.StartSec) {
		validation.startSec.$touch();
		validation.endSec.$reset();
	} else {
		validation.endSec.$touch();
		validation.startSec.$reset();
	}
	emitDraftRange();
}

watch(
	() => props.comment,
	(value) => {
		initDraft(value);
		lastEditedField.value = null;
		v$.value.$reset();
	},
	{
		immediate: true,
	},
);

watch(
	() => draft.startSec,
	() => handleRangeFieldChange(RangeField.StartSec),
);
watch(
	() => draft.endSec,
	() => handleRangeFieldChange(RangeField.EndSec),
);
</script>

<style scoped>
.call-wave-comment-form__range {
  --timepicker-input-width: 100%;
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.call-wave-comment-form__range .wt-timepicker {
  flex: 1;
}
</style>
