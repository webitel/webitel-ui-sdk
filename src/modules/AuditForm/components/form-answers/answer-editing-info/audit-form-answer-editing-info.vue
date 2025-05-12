<template>
  <section class="audit-form-answer-editing-info">
    <header class="audit-form-answer-editing-info-header">
      <span>{{ t('reusable.updatedBy') }}</span>
      <span>{{ answer.updatedBy.name }}</span>
      <span>{{ updateTime }}</span>
    </header>
    <p
      v-if="!hideComment && initialComment"
      ref="answer-editing-comment"
      class="audit-form-answer-editing-info-comment"
      :class="{
        'audit-form-answer-editing-info-comment--collapsed': collapsed,
      }"
    >
      {{ initialComment }}
    </p>
    <footer
      v-if="collapsed && isCommentClamped"
      class="audit-form-answer-editing-info-footer"
    >
      <button
        class="audit-form-answer-editing-info-expand-action"
        type="button"
        @click="collapsed = false"
      >
        {{ t('reusable.more') }}
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import {computed, ref, useTemplateRef } from "vue";
import { useI18n } from 'vue-i18n';
import {EngineQuestionAnswer} from "webitel-sdk";

const props = withDefaults(defineProps<{
  answer: EngineQuestionAnswer;
  collapsible?: boolean;
  hideComment?: boolean;
}>(), {
  collapsible: false,
  hideComment: false,
});

const commentElRef = useTemplateRef('answer-editing-comment');

const collapsed = ref(props.collapsible);

const { t } = useI18n();

const initialComment = props.answer.comment; /* prevent editing-info change if comment is changing  */

const updateTime = computed(() => {
  return new Date(+props.answer.updatedAt).toLocaleString();
});

const isCommentClamped = props.collapsible && computed(() => {
  // https://stackoverflow.com/a/67455839
  return commentElRef.value?.clientHeight !== commentElRef.value?.scrollHeight;
});

</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.audit-form-answer-editing-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.audit-form-answer-editing-info-header {
  @extend %typo-caption;
  display: flex;
  gap: var(--spacing-xs);
}

.audit-form-answer-editing-info-comment {
  @extend %typo-body-1;

  &--collapsed {
    line-clamp: 2;
    -webkit-line-clamp: 2; /* coz autoprefixer wont write "-webkit" for us https://github.com/postcss/autoprefixer/issues/1322 */
    -webkit-box-orient: vertical; /* is needed for line-clamp */
    display: -webkit-box;
    overflow: hidden;
  }
}

.audit-form-answer-editing-info-footer {
  display: flex;
  justify-content: flex-end;
}

.audit-form-answer-editing-info-expand-action {
  @extend %typo-body-1;
  color: var(--text-link-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    text-decoration: underline;
  }
}
</style>
