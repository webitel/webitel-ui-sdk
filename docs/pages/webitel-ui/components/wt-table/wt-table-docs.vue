<template>
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTableDocs',
  data: () => ({
    properties: [
      {
        value: 'headers',
        code: '<wt-table :headers="headers"></wt-table>',
        type: Array,
        default: '[]',
        description: 'Accepts list of header objects. Draws text depending on "text" property,'
          + ' looks for data values through "value", "show" boolean controls visibility of '
          + 'a column (if undefined, all visible by default). '
          + 'Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). ',
      },
      {
        value: 'data',
        code: '<wt-table :data="data"></wt-table>',
        type: 'Array',
        default: '[]',
        description: 'List of data, represented by table. ',
      },
      {
        value: 'sortable',
        code: '<wt-table sortable></wt-table>',
        type: 'Boolean',
        default: 'false',
        description: 'If true, draws sorting arrows and sends sorting events at header click. '
          + 'Draws a sorting arrow by "sort": "asc"/"desc" header value. ',
      },
      {
        value: 'selectable',
        code: '<wt-table selectable></wt-table>',
        type: 'Boolean',
        default: 'true',
        description: 'If true, draws row selection checkboxes. '
          + 'Checkbox toggles data object _isSelected property. '
          + 'Its IMPORTANT to set this property before sending data to table. ',
      },
      {
        value: 'gridActions',
        code: '<wt-table grid-actions></wt-table>',
        type: 'Boolean',
        default: 'true',
        description: 'If true, reserves space for 3 icon actions in the last column. '
          + 'Accessible by "actions" slot. ',
      },
    ],
    events: [
      {
        value: 'sort',
        params: [
          {
            name: 'column header',
            type: 'Object',
            description: 'Column header, which is sorted. ',
          },
        ],
      },
      {
        value: 'next sort value',
        params: [
          {
            type: 'String',
            description: 'Order is "asc" -> "desc" -> null, '
              + 'depending on "sort" prop state of sorted column header. ',
          },
        ],
      },
    ],
    slots: [
      {
        name: 'actions-header',
        description: 'Table head actions row slot',
      },
      {
        name: ':headerColumn.value',
        scope: [
          { name: 'item', description: 'Data row object' },
          { name: 'index', description: 'Data row index' },
        ],
        description: 'Customize data columns. '
          + 'Recommended for representing nested data structures like object or array, '
          + 'and adding specific elements like select or chip',
      },
      {
        // eslint-disable-next-line no-template-curly-in-string
        name: ':${headerColumn.value}-footer',
        scope: [
          { name: 'header', description: 'header object' },
        ],
        description: `Add your custom aggregations for column in table footer. Table footer
          is rendered conditionally depending on templates with "-footer" name`,
      },
      {
        name: 'actions',
        scope: [
          { name: 'item', description: 'Data row object' },
          { name: 'index', description: 'Data row index' },
        ],
        description: 'Table body actions row slot',
      },
    ],
    actionsEvents: [
      { value: 'click' },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
