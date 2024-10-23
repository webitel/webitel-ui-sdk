import get from 'lodash/get.js';
import { onMounted, ref, watch } from 'vue';

export const useCachedItemInstanceName = (itemInstance, { namePath = 'name' } = {}) => {
  const name = ref('');

  const updateName = () => {
    name.value = get(itemInstance.value, namePath);
  };

  watch(
    () => itemInstance.value._dirty,
    (value) => {
      if (!value) updateName();
    },
  );

  onMounted(() => {
    // itemInstance._dirty isn't init as "false",
    // so that we should set up first name representation in other way
    const unwatch = watch(
      () => itemInstance.value.name,
      (name) => {
        updateName();
        if (name) unwatch();
      },
    );
  });

  return {
    name,
  };
};
