<template>
  <section>
    <h2>Avatar</h2>
    <article>
      <div class="example-wrapper">
        <wt-avatar></wt-avatar>
        <pre><code class="language-html">&lt;wt-avatar&gt;&lt;/wt-avatar&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          badge
        ></wt-avatar>
        <pre><code class="language-html">&lt;wt-avatar :status="AbstractUserStatus.ACTIVE" badged&gt;&lt;/wt-avatar&gt;</code></pre>
      </div>
      <div class="example-wrapper avatars-row">
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="xs"
          badge
        ></wt-avatar>
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="sm"
          badge
        ></wt-avatar>
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          badge
        ></wt-avatar>
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="lg"
          badge
        ></wt-avatar>
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="xl"
          badge
        ></wt-avatar>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';
  import AbstractUserStatus from '@webitel/ui-sdk/src/enums/AbstractUserStatus/AbstractUserStatus.enum';

  export default {
    name: 'wt-avatar-docs',
    data: () => ({
      AbstractUserStatus,
      properties: [
        {
          value: 'size',
          code: '<wt-avatar size="md"></wt-avatar>',
          type: 'String',
          default: 'md',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          description: 'Avatar size',
        },
        {
          value: 'badge',
          code: '<wt-avatar badge></wt-avatar>',
          type: 'Boolean',
          default: 'false',
          description: 'Draw status badge',
        },
        {
          value: 'status',
          code: '<wt-avatar :status="AbstractUserStatus.ACTIVE"></wt-avatar>',
          type: 'String <AbstractUserStatus>',
          options: ['AbstractUserStatus enum from @webitel/ui-sdk/src/enums/AbstractUserStatus'],
          default: 'AbstractUserStatus.OFFLINE',
          description: 'Color of the badge',
        },
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
.avatars-row {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: nowrap;
}
</style>
