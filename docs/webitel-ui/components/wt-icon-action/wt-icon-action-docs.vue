<template>
  <section>
    <h2>Icon Action</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon-action
          action="edit"
        ></wt-icon-action>
        <wt-icon-action
          action="delete"
        ></wt-icon-action>
        <wt-icon-action
          action="add"
        ></wt-icon-action>
        <wt-icon-action
          action="history"
        ></wt-icon-action>
        <wt-icon-action
          action="download"
        ></wt-icon-action>
        <wt-icon-action
          action="refresh"
        ></wt-icon-action>
        <pre><code
          class="language-html"
        >
        &ltwt-icon-action
          action="edit"
        &gt;&lt;/wt-icon-action&gt;
        </code></pre>
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

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'action',
    type: 'String',
    required: true,
    options: ['delete', 'edit', 'add', 'history', 'download', 'refresh'],
  },
  {
    value: 'disabled',
    code: '<wt-icon-action disabled></wt-icon-action>',
    type: 'Boolean',
    default: 'false',
  },
];


const events = [
  { value: 'click' },
];

onMounted(() => Prism.highlightAll());
</script>

<style lang="scss" scoped>
</style>
