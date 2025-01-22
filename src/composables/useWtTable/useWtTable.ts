import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtTableHeader } from '../../components/wt-table/types/WtTable.type.ts';

export const useWtTable = ({ headers }) => {
  const { t } = useI18n();

  const tableHeaders = computed<WtTableHeader[]>(() => {
    return headers
      .filter(
        (header: WtTableHeader) => header.show === undefined || header.show,
      )
      .map((header: WtTableHeader) => {
        if (!header.text && header.locale) {
          return {
            ...header,
            text:
              typeof header.locale === 'string'
                ? t(header.locale)
                : t(header.locale[0]),
          };
        }
        return header;
      });
  });

  return {
    tableHeaders,
  };
};
