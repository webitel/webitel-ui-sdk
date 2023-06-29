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
      v-if="props.text"
      class="wt-dummy__text">{{ props.text }}</h1>
    <wt-button
      v-if="props.showAction"
      @click="emits('create')"
      >{{ buttonText || $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>

const props = defineProps({
  src: {
    type: String,
  },
  text: {
    type: String,
  },
  buttonText: {
    type: String,
  },
  showAction: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String, Number],
    default: 200,
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

  &__text {
    @extend %typo-body-1;
    margin-bottom: var(--spacing-sm);
  }

  &__img {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
