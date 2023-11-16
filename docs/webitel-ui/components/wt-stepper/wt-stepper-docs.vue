<template>
  <section>
    <h2>Stepper</h2>
    <article>
      <div class="example-wrapper">
        <wt-stepper
          :steps="[
            { name: 'Step 1' },
            { name: 'Step 2' },
          ]"
          :active-step="1"
        ></wt-stepper>
        <pre><code class="language-html">
          &lt;wt-stepper
          :steps="[
            { name: 'Step 1' },
            { name: 'Step 2' },
          ]"
          :active-step="1"&gt;&lt;/wt-stepper&gt;
        </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-stepper-docs',
  data: () => ({
    properties: [
      {
        value: 'steps',
        code: '<wt-stepper :steps="[{ name: \'Step 1\' }]"></wt-stepper>',
        type: 'Array',
        description: 'An array of displayed steps. May include "name", "description", "completed"'
      },
      {
        value: 'active-step',
        code: '<wt-stepper :active-step="1"></wt-stepper>',
        type: ['String', 'Number'],
        default: '1',
        description: 'All past and active steps are marked with "accent-secondary-color"'
      },
    ],
    slots: [
      {
        name: 'description',
        scope: [{ name: 'description' }],
        description: 'Custom description slot',
      },
      {
        name: 'main',
        scope: [{ name: 'main' }],
        description: 'Custom main slot',
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
