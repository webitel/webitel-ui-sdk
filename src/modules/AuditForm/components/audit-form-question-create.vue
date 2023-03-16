<template>
  <article class="audit-form-question-create">
    <header class="audit-form-question-create-header">
      <wt-switcher
        :value="question.required"
      ></wt-switcher>
      <div class="audit-form-question-create-header__actions">
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
    <section class="audit-form-question-create-content">
      <div class="audit-form-question-create-content-question">
        <wt-input
          :value="question.text"
        ></wt-input>
        <wt-select
          :value="question.type"
        ></wt-select>
      </div>
      <div v-if="question.type === 'options'">
        <div
          v-for="({ text, score }, key) of question.options"
          :key="key"
        >
          <wt-input
            :value="text"
          ></wt-input>
          <wt-input
            :value="score"
            type="number"
          ></wt-input>
          <wt-icon-btn
            icon="bucket"
          ></wt-icon-btn>
        </div>
        <wt-button>Add</wt-button>
      </div>
      <div v-if="question.type === 'score'">
        <wt-input
          :value="question.min"
        ></wt-input>
        <wt-input
          :value="question.max"
        ></wt-input>
      </div>
    </section>
  </article>
</template>

<script setup>
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

const emit = defineEmits(['copy', 'delete']);

</script>

<style lang="scss" scoped>

</style>
