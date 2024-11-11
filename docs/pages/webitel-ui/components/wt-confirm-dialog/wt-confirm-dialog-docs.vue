<template>
  <section>
    <component-props
      :properties="properties"
    />
    <component-events
      :events="events"
    />
    <component-slots
      :slots="slots"
    />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtInputDocs',
  data: () => ({
    properties: [
      {
        value: 'shown',
        code: '<wt-confirm-dialog :shown="value"></wt-confirm-dialog>',
        type: 'Boolean',
        default: '',
      },
      {
        value: 'deleteMessage',
        code: '<wt-confirm-dialog :deleteMessage="value"></wt-confirm-dialog>',
        type: 'String',
        default: '',
      },
      {
        value: 'subject',
        code: '<wt-confirm-dialog :subject="value"></wt-confirm-dialog>',
        type: 'String',
        default: '',
      },
    ],
    events: [
      {
        value: 'close',
        params: [
          { name: 'Close dialog' },
        ],
      },
      {
        value: 'confirm',
        params: [
          { name: 'Confirmed action' },
        ],
      },
    ],
    slots: [
      {
        name: 'title',
        description: 'Pass anything you want to be on the top of the dialog',
      },
      {
        name: 'main',
        description: 'Pass anything you want to be after title',
      },
      {
        actions: 'actions',
        description: 'Slot for pass custom actions',
        scope: [{ name: 'isDeleting' }, {
          name: 'confirm',
        }, { name: 'close'}],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
