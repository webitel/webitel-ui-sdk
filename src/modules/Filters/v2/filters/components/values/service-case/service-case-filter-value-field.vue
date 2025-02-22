<template>
  <div>
    <wt-label>
      {{ t('webitelUI.filters.filterValue') }}
    </wt-label>

    <wt-tree
      :model-value="model"
      :data="catalogData"
      item-data="id"
      item-label="name"
      children-prop="service"
      class="service-case-filter-value-field"
      multiple
      @update:model-value="onElementSelect($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import deepCopy from 'deep-copy';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtLabel from '../../../../../../../components/wt-label/wt-label.vue';
import WtTree from '../../../../../../../components/wt-tree/wt-tree.vue';
import { serviceCatalogsSearchMethod } from './config.js';

type ModelValue = string[];
const model = defineModel<ModelValue>({
  default: [],
});
const { t } = useI18n();

const catalogData = ref([]);

const v$ = useVuelidate(
  computed(() => ({
    model: {
      selection: {
        required,
      },
      conditions: {
        required,
      },
    },
  })),
  { model },
  { $autoDirty: true },
);

v$.value.$touch();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);

const loadCatalogs = async () => {
  try {
    // loading.value = true;

    const { items } = await serviceCatalogsSearchMethod({
      size: -1, // To get all catalogs with services we need to pass size -1
      fields: ['id', 'name', 'closeReasonGroup', 'status', 'service'],
      hasSubservices: true,
    });

    catalogData.value = deepCopy(items);
  } finally {
    // loading.value = false;
  }
};

if (!model.value) {
  model.value = [];
}

const onElementSelect = (val: string) => {
  const matchIdx = model.value?.indexOf(val);
  if (matchIdx !== -1) {
    model.value.splice(matchIdx, 1);
    return;
  }

  model.value.push(val);
};

onMounted(async () => await loadCatalogs());
</script>

<style lang="scss" scoped>
.service-case-filter-value-field {
  min-height: 200px;
}
</style>
