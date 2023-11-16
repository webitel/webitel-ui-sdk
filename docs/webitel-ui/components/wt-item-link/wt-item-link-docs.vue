<template>
  <section>
    <h2>Item link</h2>
    <article>
      <div class="example-wrapper">
        <pre><code
          class="language-html"
        >
          &lt;item-link :link="editLink(item)"&gt;&lt;/item-link&gt;
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
    value: 'link',
    code: '<wt-item-link :link="editLink(item)"></wt-item-link>',
    type: '[String, Object]',
    default: '',
    description: 'Final path if there aren\'t routeName and id',
  },
  {
    value: 'routeName',
    code: '<wt-item-link :route-name="namespace"></wt-item-link>',
    type: 'String',
  },
  {
    value: 'id',
    code: '<wt-item-link :id="1"></wt-item-link>',
    type: '[String, Number]',
    description: 'Id of the item we want to open',
  },
  {
    value: 'target',
    code: '<wt-item-link :target="_blank"></wt-item-link>',
    type: 'String',
    default: '_self',
    description: 'Full list of values: <a class="full-docs-link" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes">Link Attributes</a>',
  },
  {
    value: 'disabled',
    code: '<wt-item-link disabled></wt-item-link>',
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
