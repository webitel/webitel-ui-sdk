<template>
  <div class="duration-filter">
    <wt-timepicker
      v-if="model"
      :label="t('reusable.from')"
      :value="model.from"
      format="mm:ss"
      @input="handleInput('from', $event)"
    />
    <wt-timepicker
      v-if="model"
      :label="t('reusable.to')"
      :value="model.to"
      format="mm:ss"
      @input="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();

type ModelValue = {
  from: number;
  to: number;
};

const model = defineModel<ModelValue>();

if (!model.value) {
  model.value = {
    from: 0,
    to: 0,
  };
}

const handleInput = (key: keyof ModelValue, value: number) => {
  const newValue = { ...model.value };
  newValue[key] = value;
  model.value = newValue;
};
</script>

<style lang="scss" scoped>
//.duration-filter {}
</style>
