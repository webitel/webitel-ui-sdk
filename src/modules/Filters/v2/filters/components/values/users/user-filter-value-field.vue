<template>
  <wt-select
    :close-on-select="false"
    :search-method="searchMethod"
    :value="model"
    multiple
    use-value-from-options-by-prop="id"
    class="user-filter-value-field"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { searchMethod } from './config';

type ModelValue = number[];

const model = defineModel<ModelValue>();

const handleInput = (value: ModelValue) => {
  model.value = value;
};
</script>

<style lang="scss" scoped>
.user-filter-value-field {
}
</style>
