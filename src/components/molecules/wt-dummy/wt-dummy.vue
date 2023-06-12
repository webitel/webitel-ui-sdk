<template>
  <div class="wt-dummy">
    <div class="wt-dummy__img">
      <img
        :src="props.src"
        :width="props.size"
        :height="props.size"
        alt="dummy-picture"
      >
    </div>
    <h1
      v-if="props.locale"
      class="wt-dummy__title">{{ props.locale }}</h1>
    <wt-button
      v-if="props.action"
      @click="emits('create')"
      >{{ $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>

const props = defineProps({
  src: {
    type: String,
  },
  locale: {
    type: String,
  },
  action: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String, Number],
  },
});

const emits = defineEmits([
  'create',
]);

</script>

<style lang="scss" scoped>
.wt-dummy {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    @extend %typo-body-1;
    margin-bottom: var(--spacing-sm);
  }

  &__img {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
