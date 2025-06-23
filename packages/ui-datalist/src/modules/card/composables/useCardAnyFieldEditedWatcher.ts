import { ref, watch } from 'vue';

export const useCardAnyFieldEditedWatcher = ({ value }) => {
  const isAnyFieldEdited = ref(false);

  let prevValue: object;

  watch(
    value,
    () => {
      isAnyFieldEdited.value = prevValue === value.value; // if object value ref changes, object was overwritten completely
      prevValue = value.value;
    },
    {
      deep: true,
    },
  );

  return {
    isAnyFieldEdited,
  };
};
