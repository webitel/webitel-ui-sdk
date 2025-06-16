import { computed, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useItemCardSaveText = ({
  isNew,
  isEdited,
                                    }: {
  isNew: Ref<boolean>;
  isEdited: Ref<boolean>;
}) => {
  const { t } = useI18n();

  const saveText = computed(() => {
    return isNew.value || isEdited.value
      ? t('reusable.save')
      : t('reusable.saved');
  });

  return {
    saveText,
  };
};
