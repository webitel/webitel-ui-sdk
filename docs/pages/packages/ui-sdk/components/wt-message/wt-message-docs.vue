<template>
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtMessageDocs',
  data: () => ({
    properties: [
      {
        value: 'severity',
        code: '<wt-message severity="info"></wt-message>',
        type: 'String',
        default: 'info',
        description: 'Severity level: info, success, warn, error, secondary, contrast',
      },
      {
        value: 'closable',
        code: '<wt-message closable></wt-message>',
        type: 'Boolean',
        default: 'false',
        description: 'Whether the message can be closed',
      },
      {
        value: 'life',
        code: '<wt-message :life="3000"></wt-message>',
        type: 'Number',
        description: 'Time in milliseconds before message auto-closes',
      },
      {
        value: 'icon',
        code: '<wt-message icon="pi pi-check"></wt-message>',
        type: 'String',
        description: 'Custom icon to display',
      },
      {
        value: 'closeIcon',
        code: '<wt-message close-icon="pi pi-times"></wt-message>',
        type: 'String',
        description: 'Custom close icon',
      },
      {
        value: 'variant',
        code: '<wt-message variant="outlined"></wt-message>',
        type: 'String',
        default: 'filled',
        description: 'Visual variant: filled, outlined, simple',
      },
      {
        value: 'size',
        code: '<wt-message size="small"></wt-message>',
        type: 'String',
        description: 'Size of the message: small, large (default is medium)',
      },
    ],
    events: [
      {
        value: 'close',
        params: [{ name: 'event', type: 'Event' }],
        description: 'Emitted when close button is clicked',
      },
    ],
    slots: [
      {
        name: 'default',
        description: 'Message content',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
