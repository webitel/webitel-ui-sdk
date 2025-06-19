import { computed, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useItemCardSaveText = ({
  isNew,
  isAnyFieldEdited,
                                    }: {
  isNew: Ref<boolean>;
  isAnyFieldEdited: Ref<boolean>;
}) => {
  const { t } = useI18n();

  const saveText = computed(() => {
    return isNew.value || isAnyFieldEdited.value
      ? t('reusable.save')
      : t('reusable.saved');
  });

  return {
    saveText,
  };
};
