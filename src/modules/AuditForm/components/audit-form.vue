<template>
  <section class="audit-form">
    <wt-empty
      v-if="isEmptyCriteria"
      v-bind="emptyCriteria"
      @click:primary="addQuestion()"
      @click:secondary="addGroup"
    >
      <template #media>
        <img
          :src="EmptyCriteria"
          alt=""
        >
      </template>
    </wt-empty>
    <div
      ref="sortableWrapper"
      class="audit-form__sortable-wrapper"
    >
      <template
        v-for="(item, index) of items"
        :key="item.id ?? index"
      >
        <audit-form-group
          v-if="isGroupItem(item)"
          :group="item"
          :name-in-use="isGroupNameInUse(item.name)"
          :drop-zone="!item.questions.length || isDraggingQuestion"
          :data-group-id="item.id"
          @update:group="updateItem"
          @copy="copyItem(item)"
          @delete="deleteItem(item)"
          @add-question="addQuestion(item.id)"
          @drag:start="handleDragStart"
          @drag:end="handleDragEnd"
        >
          <audit-form-question
            v-for="question of item.questions"
            :key="question.id"
            v-bind="buildQuestionBindings(question, item.id)"
          />
        </audit-form-group>
        <audit-form-question
          v-else
          v-bind="buildQuestionBindings(item)"
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
      v-if="!isEmptyCriteria"
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
import type { EngineQuestionAnswer } from '@webitel/api-services/gen/models';
import { computed, onMounted, provide, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtEmpty, WtTextarea } from '../../../components';
import EmptyCriteria from '../assets/empty-criteria.svg';
import { useAuditFormCriteria } from '../composables/useAuditFormCriteria';
import { useAuditFormDragAndDrop } from '../composables/useAuditFormDragAndDrop';
import { AuditFormMode } from '../enums/AuditFormMode.enum';
import type {
	AuditFormGroupModel,
	AuditFormQuestionModel,
} from '../scripts/criteriaTree';
import { isGroupItem } from '../scripts/criteriaTree';
import AuditFormQuestion from './audit-form-question.vue';
import AuditFormFooter from './form/form-footer/audit-form-footer.vue';
import AuditFormGroup from './form-groups/audit-form-group.vue';

const answersModel = defineModel<EngineQuestionAnswer[]>('answers');

/**
 * todo: rename to questionsModel and use instead of 'update:questions' event
 */
const questions = defineModel<AuditFormQuestionModel[]>('questions', {});
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
const { t } = useI18n();

const isAnswersTouched = ref(false);

provide('readonly', props.readonly);
provide('mode', props.mode);

const isInvalidForm = computed(() => !!v$.value.$errors.length);

const {
	items,
	questionRefs,
	activateQuestion,
	addQuestion,
	addGroup,
	updateItem,
	copyItem,
	deleteItem,
	moveItem,
	isGroupNameInUse,
} = useAuditFormCriteria({
	groups,
	questions,
	updateQuestions: (value) => emit('update:questions', value),
});

const isEmptyCriteria = computed(
	() => props.mode === AuditFormMode.Create && !items.value.length,
);

const emptyCriteria = computed(() => ({
	text: t('webitelUI.auditForm.noCriteria'),
	...(!props.readonly && {
		primaryActionText: t('webitelUI.auditForm.addQuestion'),
		secondaryActionText: t('webitelUI.auditForm.addGroup'),
	}),
}));

const { isDraggingQuestion, handleDragStart, handleDragEnd } =
	useAuditFormDragAndDrop({
		wrapper: useTemplateRef('sortableWrapper'),
		disabled: props.mode !== AuditFormMode.Create,
		moveItem,
	});

function buildQuestionBindings(question: AuditFormQuestionModel, groupId = '') {
	const index = questions.value.indexOf(question);
	return {
		ref: (el: InstanceType<typeof AuditFormQuestion> | null) =>
			(questionRefs[question.id] = el),
		'data-question-id': question.id,
		question,
		answer: answersModel.value?.[index] ?? null,
		onCopy: () => copyItem(question, groupId),
		onDelete: () => deleteItem(question, groupId),
		'onUpdate:question': (value: AuditFormQuestionModel) =>
			updateItem(value, groupId),
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
		answersModel.value = questions.value.map(() => ({}));
	}
}

function initQuestions() {
	if (!questions.value?.length) return;
	if (questions.value.some(({ id }) => !id)) {
		const list = questions.value.map((question) => ({
			...question,
			id: question.id || crypto.randomUUID(),
		}));
		emit('update:questions', list);
		activateQuestion(list[0].id);
	} else activateQuestion(questions.value[0].id);
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
