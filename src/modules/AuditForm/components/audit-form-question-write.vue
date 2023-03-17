<template>
  <article class="audit-form-question-write">
    <header class="audit-form-question-write-header">
      <wt-switcher
        :value="question.required"
        @change="updateQuestion({ path: 'required', value: $event })"
      ></wt-switcher>
      <div class="audit-form-question-write-header__actions">
        <wt-icon-btn
          icon="copy"
          @click="emit('copy')"
        ></wt-icon-btn>
        <wt-icon-btn
          icon="bucket"
          @click="emit('delete')"
        ></wt-icon-btn>
      </div>
    </header>
    <section class="audit-form-question-write-content">
      <div class="audit-form-question-write-content-question">
        <wt-input
          :value="question.text"
          @input="updateQuestion({ path: 'text', value: $event })"
        ></wt-input>
        <wt-select
          :value="question.type"
          :options="QuestionType"
          :track-by="null"
          @input="handleQuestionTypeChange"
        ></wt-select>
      </div>
      <div v-if="question.type === 'options'">
        <div
          v-for="({ text, score }, key) of question.options"
          :key="key"
        >
          <wt-input
            :value="text"
            @input="updateQuestion({ path: `options[${key}].text`, value: $event })"
          ></wt-input>
          <wt-input
            :value="score"
            type="number"
            @input="updateQuestion({ path: `options[${key}].score`, value: $event })"
          ></wt-input>
          <wt-icon-btn
            icon="bucket"
            @click="deleteQuestionOption({ key })"
          ></wt-icon-btn>
        </div>
        <wt-button
          @click="addQuestionOption"
        >Add</wt-button>
      </div>
      <div v-if="question.type === 'score'">
        <wt-input
          :value="question.min"
          @input="updateQuestion({ path: 'min', value: $event })"
        ></wt-input>
        <wt-input
          :value="question.max"
          @input="updateQuestion({ path: 'max', value: $event })"
        ></wt-input>
      </div>
    </section>
    <footer>
      <wt-button
        @click="emit('save')"
      >Save me</wt-button>
    </footer>
  </article>
</template>

<script setup>
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import WtSwitcher from '../../../components/molecules/wt-switcher/wt-switcher.vue';
import WtIconBtn from '../../../components/molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../components/molecules/wt-input/wt-input.vue';
import WtSelect from '../../../components/molecules/wt-select/wt-select.vue';
import WtButton from '../../../components/atoms/wt-button/wt-button.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'change:question',
  'copy',
  'delete',
  'save',
]);

const QuestionType = ['options', 'score'];

function updateQuestion({ path, value }) {
  const question = set(cloneDeep(props.question), path, value);
  emit('change:question', question);
}

function addQuestionOption() {
  const option = {
    text: 'My first var!',
    score: 5,
  };
  const options = [...props.question.options, option];
  return updateQuestion({ path: 'options', value: options });
}

function deleteQuestionOption({ key }) {
  const options = [...props.question.options];
  options.splice(key, 1);
  return updateQuestion({ path: 'options', value: options });
}

function handleQuestionTypeChange(type) {
  const question = { ...props.question, type };
  if (type === 'options') {
    delete question.min;
    delete question.max;
    question.options = [
      { text: 'title', score: 10 },
    ];
  } else if (type === 'score') {
    delete question.options;
    question.min = 1;
    question.max = 10;
  }
  emit('change:question', question);
}

</script>

<style lang="scss" scoped>

</style>
