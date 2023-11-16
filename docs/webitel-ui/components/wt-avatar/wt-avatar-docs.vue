<template>
  <section>
    <h2>Avatar</h2>
    <article>
      <div class="example-wrapper">
        <wt-avatar
          size="lg"
          :src="pic"
        ></wt-avatar>
        <pre><code class="language-html">&lt;wt-avatar size="lg" :src="pic"&gt;&lt;/wt-avatar&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-avatar
          size="lg"
          username="Daniil Lohvinov"
        ></wt-avatar>
        <pre><code class="language-html">&lt;wt-avatar size="lg" username="Daniil Lohvinov"&gt;&lt;/wt-avatar&gt;</code></pre>
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
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="2xl"
          badge
        ></wt-avatar>
        <wt-avatar
          :status="AbstractUserStatus.ACTIVE"
          size="3xl"
          badge
        ></wt-avatar>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <article>
      <h2>Why to pass image itself as src prop?</h2>
      <pre>
        <code class="language-javascript">
          &lt;wt-avatar :src="pic"&gt;&lt;/wt-avatar&gt;

          import pic from './pic.png';

          data: () => ({ pic }),
        </code>
      </pre>
      <pre>
      <p>
        NOTE ONLY FOR LOCAL IMAGES INSIDE PROJECT FILES!

        If you would pass LOCAL path url to img to :src prop instead of image itself,
        first, webpack will build app (and build this pic too),
        and then Vue will try to find this img by passed path -- Vue won't find it,
        because webpack have already repacked it somewhere else.

        So that, first, we need to import this image and pass it as object through data
        so that webpack won't lose it.
      </p>
        </pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import AbstractUserStatus from '@webitel/ui-sdk/src/enums/AbstractUserStatus/AbstractUserStatus.enum';
import pic from './pic.jpg';

export default {
  name: 'wt-avatar-docs',
  data: () => ({
    pic,
    AbstractUserStatus,
    properties: [
      {
        value: 'src',
        code: '<wt-avatar :src="pic"></wt-avatar>',
        type: 'String',
        description: 'Avatar pic. IMPORTANT: if this pic is stored locally in project, pass to this prop only pic, imported and passed to data as property',
      },
      {
        value: 'username',
        code: '<wt-avatar username="Daniil Lohvinov"></wt-avatar>',
        type: 'String',
        description: 'If passed, avatar is letter-based (if not passed src)',
      },
      {
        value: 'size',
        code: '<wt-avatar size="md"></wt-avatar>',
        type: 'String',
        default: 'md',
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
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
