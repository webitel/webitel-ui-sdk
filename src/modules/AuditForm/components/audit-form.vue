<template>
  <section class="audit-form">
    <div
      v-if="!reloadSortable"
      ref="sortableWrapper"
      class="audit-form__sortable-wrapper"
    >
      <template
        v-for="item of items"
        :key="item.key"
      >
        <audit-form-group
          v-if="item.group"
          :group="item.group"
          :name-in-use="isGroupNameInUse(item.group.name)"
          :drop-zone="!item.questions.length || isDraggingQuestion"
          :data-group-id="item.group.id"
          @update:group="updateGroup"
          @copy="copyGroup(item)"
          @delete="deleteGroup(item.group)"
          @add-question="addQuestion(item.group.id)"
          @drag:start="handleDragStart"
          @drag:end="handleDragEnd"
        >
          <audit-form-question
            v-for="question of item.questions"
            :key="question.id"
            v-bind="buildQuestionBindings(question)"
          />
        </audit-form-group>
        <audit-form-question
          v-else
          v-bind="buildQuestionBindings(item.question)"
        />
      </template>
    </div>

    <wt-textarea
      v-if="mode === AuditFormMode.Fill"
      :model-value="resultCommentModel"
	  :disabled="readonly"
      class="call-evaluation-form__comment"
      :label="$t('reusable.comment')"
      @update:model-value="handleResultCommentUpdate"
    />

    <audit-form-footer
      :invalid="isInvalidForm"
      :disabled-save="!isAnswersTouched"
      @fill:save="saveEvaluation"
      @fill:cancel="cancelEvaluation"
      @create:add="addQuestion()"
      @create:add-group="addGroup"
    />
  </section>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';
import { computed, onMounted, provide, ref, useTemplateRef, watch } from 'vue';

import { WtTextarea } from '../../../components';
import { useDestroyableSortable } from '../../../composables/useDestroyableSortable/useDestroyableSortable.js';
import { useAuditFormDragAndDrop } from '../composables/useAuditFormDragAndDrop';
import type { AuditFormGroupModel } from '../composables/useAuditFormGroups';
import { useAuditFormGroups } from '../composables/useAuditFormGroups';
import type { AuditFormQuestionModel } from '../composables/useAuditFormQuestions';
import { useAuditFormQuestions } from '../composables/useAuditFormQuestions';
import { AuditFormMode } from '../enums/AuditFormMode.enum';
import AuditFormQuestion from './audit-form-question.vue';
import AuditFormFooter from './form/form-footer/audit-form-footer.vue';
import AuditFormGroup from './form-groups/audit-form-group.vue';

const answersModel = defineModel<EngineQuestionAnswer[]>('answers');

/**
 * todo: rename to questionsModel and use instead of 'update:questions' event
 */
const questions = defineModel<EngineQuestion[]>('questions', {});
const resultCommentModel = defineModel<string>('resultComment');
const groups = defineModel<AuditFormGroupModel[]>('groups', {
	default: () => [],
});

const props = defineProps<{
	mode: AuditFormMode;
	readonly?: boolean;
}>();

const emit = defineEmits([
	/**
	 * todo: remove and use questions model
	 */
	'update:questions',
	'update:validation',
	'save:evaluation',
	'cancel:evaluation',
]);

const v$ = useVuelidate();

const updateQuestions = (value: AuditFormQuestionModel[]) =>
	emit('update:questions', value);

const {
	questionRefs,
	activateQuestion,
	addQuestion,
	updateQuestion,
	copyQuestion,
	deleteQuestion,
} = useAuditFormQuestions({
	questions: () => props.questions || [],
	updateQuestions,
});

const { isGroupNameInUse, addGroup, updateGroup, copyGroup, deleteGroup } =
	useAuditFormGroups({
		groups,
		questions: () => props.questions || [],
		updateQuestions,
	});

const isAnswersTouched = ref(false);

const sortableWrapper = useTemplateRef('sortableWrapper');

const { isDraggingQuestion, handleDragStart, handleDragEnd } =
	useAuditFormDragAndDrop({
		wrapper: sortableWrapper,
		groups,
		questions: () => props.questions || [],
		updateQuestions,
	});

provide('readonly', props.readonly);
provide('mode', props.mode);

const isInvalidForm = computed(() => !!v$.value.$errors.length);

const items = computed(() => {
	const questionsList = props.questions || [];
	const groupItems = groups.value.map((group) => ({
		key: group.id,
		group,
		questions: questionsList.filter(({ groupId }) => groupId === group.id),
	}));
	const questionItems = questionsList.map(
		(question, index) =>
			groupItems.find(({ group }) => group.id === question.groupId) ?? {
				key: question.id ?? index,
				question,
			},
	);
	return [
		...new Set([
			...questionItems,
			...groupItems,
		]),
	];
});

function buildQuestionBindings(question: AuditFormQuestionModel) {
	const index = props.questions.indexOf(question);
	return {
		ref: (el: InstanceType<typeof AuditFormQuestion> | null) =>
			(questionRefs[question.id] = el),
		'data-question-id': question.id,
		question,
		answer: answersModel.value?.[index] ?? null,
		onCopy: () => copyQuestion(question),
		onDelete: () => deleteQuestion(question),
		'onUpdate:question': updateQuestion,
		'onUpdate:answer': (value: EngineQuestionAnswer) =>
			handleAnswerUpdate({
				key: index,
				value,
			}),
	};
}

function handleAnswerUpdate({ key, value }) {
	const answer = [
		...answersModel.value,
	];
	answer[key] = value;
	answersModel.value = answer;

	isAnswersTouched.value = true;
}

function initAnswers() {
	if (!answersModel.value?.length) {
		answersModel.value = props.questions.map(() => ({}));
	}
}

function initQuestions() {
	if (!props.questions?.length) {
		addQuestion();
	} else if (props.questions.some(({ id }) => !id)) {
		const questions = props.questions.map((question) => ({
			...question,
			id: question.id || crypto.randomUUID(),
		}));
		updateQuestions(questions);
		activateQuestion(questions[0].id);
	} else activateQuestion(props.questions[0].id);
}

function saveEvaluation() {
	emit('save:evaluation');
}

function cancelEvaluation() {
	emit('cancel:evaluation');
}

function handleResultCommentUpdate(value) {
	resultCommentModel.value = value;
	isAnswersTouched.value = true;
}

const { reloadSortable } = useDestroyableSortable(sortableWrapper, {
	group: 'audit-form-criteria',
	handle: '.audit-form-question-read__drag-icon, .audit-form-group__drag-icon',
	disabled: props.mode !== 'create',
	onStart: handleDragStart,
	onEnd: handleDragEnd,
});

watch(v$, () =>
	emit('update:validation', {
		invalid: isInvalidForm.value,
		v$: v$.value,
	}),
);

onMounted(() => {
	if (props.mode === AuditFormMode.Create && !props.readonly) {
		initQuestions();
	} else if (props.mode === AuditFormMode.Fill) {
		initAnswers();
	}
});
</script>

<style lang="scss" scoped>
.audit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__sortable-wrapper {
    display: contents;
  }
}
</style>
