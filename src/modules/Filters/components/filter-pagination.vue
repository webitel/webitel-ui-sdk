<template>
  <wt-pagination
    :next="isNext"
    :prev="page > 1"
    :size="localSize"
    debounce
    @input="localSize = $event"
    @change="setSize(localSize)"
    @next="setPage(+page + 1)"
    @prev="setPage(+page - 1)"
  />
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

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

const page = computed(() => store.getters[`${props.namespace}/GET_FILTER`](pageFilterName));
const size = computed(() => store.getters[`${props.namespace}/GET_FILTER`](sizeFilterName));

function setFilter(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function setPage(value) {
  return setFilter({ value, name: pageFilterName });
}

function setSize(value) {
  if (value === size.value) return;
  return setFilter({ value, name: sizeFilterName });
}

watch(size, () => {
  localSize.value = size.value;
}, { immediate: true });
</script>

<style lang="scss" scoped>

</style>
