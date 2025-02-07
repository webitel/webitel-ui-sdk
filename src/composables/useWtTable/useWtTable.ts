import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { WtTableHeader } from '../../components/wt-table/types/WtTable.d.ts';

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
