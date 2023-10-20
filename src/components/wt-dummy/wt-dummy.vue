<template>
  <div class="wt-dummy">
    <div class="wt-dummy__img">
      <img
        :src="src || dummy"
        :width="size"
        :height="size"
        alt="dummy-picture"
      >
    </div>
    <p
      v-if="!hiddenText"
      class="wt-dummy__text">{{ text || $t('webitelUI.dummy.text') }}</p>
    <wt-button
      v-if="showAction"
      @click="emits('create')"
      >{{ buttonText || $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>
import dummy from '../../assets/components/molecules/wt-dummy/dummy.svg';

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
  hiddenText: {
    type: Boolean,
    default: false,
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
  gap: var(--spacing-sm);

  &__img {
    height: 200px;
    width: 200px;
  }

  &__text {
    @extend %typo-body-1;
  }
}
</style>
