import { TableScheme } from '@webitel/styleguide/component-schemes';

const rowStateStyles = (state, dt) => `
  .p-datatable-tbody > tr.row-${state},
  .p-datatable-tbody > tr.row-${state} > td,
  .p-datatable-tbody > tr.row-${state} > td.p-datatable-frozen-column {
    background: ${dt(`datatable.row.${state}Background`)};
  }

  .p-datatable-tbody > tr.row-${state}:hover,
  .p-datatable-tbody > tr.row-${state}:hover > td,
  .p-datatable-tbody > tr.row-${state}:hover > td.p-datatable-frozen-column {
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
        
        .p-datatable-tbody > tr:hover > td,
        .p-datatable-tbody > tr:hover > td.p-datatable-frozen-column {
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
            position: relative;
            z-index: 2;
        }

        .p-datatable-column-resizer {
            background: ${dt('datatable.columnResizer.background')};

        }
            
        .p-datatable-resizable-table > .p-datatable-tbody > tr > td {
          white-space: normal;
        }

        .p-datatable-column-resize-indicator {
          
        }

        .p-datatable-row-expansion .p-datatable-thead {
          z-index: 0;
        }
        
        .p-datatable-tbody > tr:has(+ .p-datatable-row-expansion:hover) > td {
            background: ${dt('datatable.row.hoverBackground')};
        }

        .p-datatable-row-reorder-indicator-down {
            height: 100%;
            z-index: 1;
            margin-top: -41px;
            width: 1px;
            background: ${dt('datatable.reorderIndicator.color')};
            margin-left: 7px;
        }

        .p-datatable-row-reorder-indicator-down svg {
            display: none;
        }
        `,
};

export default table;
