<template>
  <section class="audit-form-answer-editing-info">
    <header class="audit-form-answer-editing-info-header">
      <span>{{ t('reusable.updatedBy') }}</span>
      <a :href="updatedByLink">{{ answer.updatedBy.name }}</a>
      <span>{{ updateTime }}</span>
    </header>
    <p
      v-if="answer.comment"
      class="audit-form-answer-editing-info-comment"
      :class="{
        'audit-form-answer-editing-info-comment--collapsed': collapsed,
      }"
    >
      {{ answer.comment }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores atque consectetur deserunt dolores id illum, ipsa molestiae nihil nostrum officia quam quasi quo quod recusandae soluta tempore temporibus ut.
    </p>
    <footer
      v-if="collapsed"
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
import {computed, ref} from "vue";
import { useI18n } from 'vue-i18n';
import {EngineQuestionAnswer} from "webitel-sdk";

const props = withDefaults(defineProps<{
  answer: EngineQuestionAnswer;
  collapsible?: boolean;
}>(), {
  collapsible: false,
});

const collapsed = ref(props.collapsible);

const { t } = useI18n();

const updateTime = computed(() => {
  return new Date(+props.answer.updatedAt).toLocaleString();
});

const updatedByLink = computed(() => {
  return null;
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
