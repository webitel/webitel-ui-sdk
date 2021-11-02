<template>
  <section>
    <h2>Icon Button</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon-btn
          icon="bucket"
          tooltip="Bucket icon"
        ></wt-icon-btn>
        <pre><code class="language-html">&lt;wt-icon-btn icon="bucket" tooltip="Bucket icon"&gt;&lt;/wt-icon-btn&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-icon-btn
          icon="done"
          tooltip="Active color icon"
          color="active"
        ></wt-icon-btn>
        <wt-icon-btn
          icon="done"
          tooltip="Success color icon"
          color="success"
        ></wt-icon-btn>
        <wt-icon-btn
          icon="done"
          tooltip="Success color icon"
          color="success"
          disabled
        ></wt-icon-btn>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-icon-btn-docs',
    data: () => ({
      properties: [
        {
          value: 'icon',
          code: '<wt-icon-btn icon="edit"></wt-icon-btn>',
          type: 'String',
          required: true,
          description: 'icon name. For more information check "Icons" docs',
        },
        {
          value: 'icon-prefix',
          code: '<wt-icon-btn icon-prefix="adm" icon="permissions"></wt-icon-btn>',
          type: 'String',
          default: '',
          description: 'icon name prefix. For more information check "Icons" docs',
        },
        {
          value: 'size',
          code: '<wt-icon-btn icon="edit" size="sm"></wt-icon-btn>',
          type: 'String',
          description: 'icon size. For more information check "Icons" docs',
        },
        {
          value: 'color',
          code: '<wt-icon-btn icon="edit" color="success"></wt-icon-btn>',
          type: 'String',
          description: 'icon color. For more information check "Icons" docs',
        },
        {
          value: 'tooltip',
          code: '<wt-icon-btn icon="edit" tooltip="Tooltip"></wt-icon-btn>',
          type: 'String',
          description: 'At btn hover shows tooltip with passed string value',
        },
        {
          value: 'tooltipPosition',
          code: '<wt-icon-btn  icon="edit" tooltip="Tooltip" tooltip-position="left"></wt-icon-btn>',
          type: 'String',
          default: 'bottom',
          description: 'changes tooltip position relative to icon. Available options are: top, bottom, left, right.',
        },
        {
          value: 'disabled',
          code: '<wt-icon-btn icon="edit" disabled></wt-icon-btn>',
          type: 'Boolean',
          default: 'false',
          description: 'Disables btn',
        },
      ],
      events: [
        {
          value: 'click',
          params: [
            { name: 'event', type: 'DOM event' },
          ],
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
