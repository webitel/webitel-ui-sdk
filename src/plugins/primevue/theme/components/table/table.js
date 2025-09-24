import { TableScheme } from '@webitel/styleguide/component-schemes';

const rowStateStyles = (state, dt) => `
            .p-datatable-tbody > tr.row-${state} {
                background: ${dt(`datatable.row.${state}Background`)};
            }

            .p-datatable-tbody > tr.row-${state}:hover {
                background: ${dt(`datatable.row.${state}HoverBackground`)};
            }
        `;

const table = {
  ...TableScheme.sizes,
  colorScheme: TableScheme.colorScheme,

  // Rewrite the default table styles in the theme here:
  // For customize the table styles you need write css styles for classes
  css: ({ dt }) => `
        .p-datatable-table-container {
          width: 100%;
        }

        .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead {
          background: transparent;
        }
        
        .p-datatable-tbody > tr:hover {
            background: ${dt('datatable.row.hoverBackground')};
        }

        ${rowStateStyles('error', dt)}
        ${rowStateStyles('warning', dt)}
        ${rowStateStyles('success', dt)}

        .p-datatable-scrollable .p-datatable-frozen-column:not(.p-datatable-header-cell) {
            background: ${dt('datatable.frozenColumn.background')};
        }

        .p-datatable-tbody > tr > td {
            word-break: break-all;
            overflow-wrap: break-word;
            vertical-align: top;
        }

        .p-datatable-thead > tr > th {
            overflow: hidden;
        }

        .p-datatable-column-resizer {
            background: ${dt('datatable.columnResizer.background')};

        }
            
        .p-datatable-resizable-table > .p-datatable-tbody > tr > td {
          white-space: normal;
        }

        .p-datatable-column-resize-indicator {
          
        }
        `,
};

export default table;