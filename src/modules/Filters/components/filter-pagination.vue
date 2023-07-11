<template>
  <wt-pagination
    :next="isNext"
    :prev="page > 1"
    :size="localSize"
    debounce
    @input="localSize = $event"
    @change="setSize(localSize)"
    @next="setPage(+page + 1)"
    @prev="setPage(page - 1)"
  ></wt-pagination>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  isNext: {
    type: Boolean,
    default: false,
  },
});

const pageFilterName = 'page';
const sizeFilterName = 'size';

const store = useStore();

const localSize = ref(0);

const page = computed(() => getNamespacedState(store.state, props.namespace)[pageFilterName].value);
const size = computed(() => getNamespacedState(store.state, props.namespace)[sizeFilterName].value);

function setFilter(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function setPage(value) {
  return setFilter({ value, filter: pageFilterName });
}

function setSize(value) {
  if (value === size.value) return;
  // eslint-disable-next-line consistent-return
  return setFilter({ value, filter: sizeFilterName });
}

watch(size, () => {
  localSize.value = size.value;
}, { immediate: true });
</script>

<style lang="scss" scoped>

</style>
