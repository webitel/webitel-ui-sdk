<template>
  <div class="wt-dummy">
    <div class="wt-dummy__img">
      <img
        :height="size"
        :src="src || dummy"
        :width="size"
        alt="dummy-picture"
      />
    </div>
    <p
      v-if="!hiddenText"
      class="wt-dummy__text typo-body-1"
    >
      {{ text || $t('webitelUI.dummy.text') }}
    </p>
    <wt-button
      v-if="showAction"
      @click="emits('create')"
    >
      {{ buttonText || $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import dummyDark from '../../assets/components/molecules/wt-dummy/dummyDark.svg';
import dummyLight from '../../assets/components/molecules/wt-dummy/dummyLight.svg';

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
  darkMode: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['create']);

const dummy = computed(() => (props.darkMode ? dummyDark : dummyLight));
</script>

<style  scoped>
.wt-dummy {
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  text-align: center;
}

.wt-dummy .wt-dummy__img {
width: 200px;
    height: 200px;
}

.wt-dummy .wt-dummy__text {
    color: var(--wt-dummy-text-color);
}
</style>
