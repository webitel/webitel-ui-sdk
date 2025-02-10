<template>
  <wt-select
    :close-on-select="false"
    :search-method="searchMethod"
    :value="model"
    multiple
    use-value-from-options-by-prop="id"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import WtSelect from '@webitel/ui-sdk/src/components/wt-select/wt-select.vue';

import { searchMethod } from './config';

type ModelValue = number[];

const model = defineModel<ModelValue>();

// const props = defineProps({});
//
// const emit = defineEmits([]);

const handleInput = (value: ModelValue) => {
  model.value = value;
};

</script>

<style lang="scss" scoped>
.user-filter {

}
</style>
