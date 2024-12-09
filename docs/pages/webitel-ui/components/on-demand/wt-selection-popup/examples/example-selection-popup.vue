<template>
  <div>
    <wt-button
      @click="isShownPopup = true"
    >Open popup
    </wt-button>
    <wt-selection-popup
      :options="options"
      :selected="selected"
      :shown="isShownPopup"
      title="Add group"
      v-bind="$attrs"
      @add="create"
      @change="change"
      @close="close"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import WtSelectionPopup from '@webitel/ui-sdk/src/components/on-demand/wt-selection-popup/wt-selection-popup.vue';

const selected = ref(null);
const isShownPopup = ref(false);

const options = computed(() => {
  return [
    { value: 'static', title: 'static' },
    { value: 'dinamyc', title: 'dinamyc' },
  ];
});

function create() {
  console.log('create', selected.value);
}

function change(option) {
  selected.value = option;
}

function close() {
  isShownPopup.value = false;
}

onMounted(() => {
  selected.value = options.value[0];
});
</script>

<style lang="scss" scoped>

</style>

