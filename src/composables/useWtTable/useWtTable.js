import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
export const useWtTable = ({ headers }) => {
  const { t } = useI18n();
  const tableHeaders = computed(() => {
    return headers
      .filter((header) => header.show === undefined || header.show)
      .map((header) => {
        if (!header.text && header.locale) {
          return {
            ...header,
            text:
              typeof header.locale === 'string'
                ? t(header.locale)
                : t(...header.locale),
          };
        }
        return header;
      });
  });
  return {
    tableHeaders,
  };
};
