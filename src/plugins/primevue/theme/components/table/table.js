import { TableScheme } from '@webitel/styleguide/component-schemes';

const table = {
  ...TableScheme.sizes,
  colorScheme: TableScheme.colorScheme,

  // Rewrite the default table styles in the theme here:
  // For customize the table styles you need write css styles for classes
  css: () => `
        .p-datatable-table-container {
          width: 100%;
        }

        .p-datatable-tbody > tr > td {
            word-break: break-all;
            overflow-wrap: break-word;
            vertical-align: top;
        }

        .p-datatable-thead > tr > th {
            overflow: hidden;
        }
        `,
};

export default table;