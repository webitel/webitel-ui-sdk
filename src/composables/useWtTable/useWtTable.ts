import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TableHeader } from '../../components/wt-table/types/table-header.ts';

export const useWtTable = ({ headers }) => {
  const { t } = useI18n();

  const tableHeaders = computed<TableHeader[]>(() => {
    return headers
      .filter((header: TableHeader) => header.show === undefined || header.show)
      .map((header: TableHeader) => {
        if (!header.text && header.locale) {
          return {
            ...header,
            text: typeof header.locale === 'string' ? t(header.locale) : t(header.locale[0]),
          };
        }
        return header;
      });
  });

  return {
    tableHeaders,
  };
};
