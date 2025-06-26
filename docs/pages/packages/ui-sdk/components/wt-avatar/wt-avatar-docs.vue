<template>
  <component-props :properties="properties" />
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
</template>

<script>
import Prism from 'prismjs';

import { AbstractUserStatus } from '@webitel/ui-sdk/enums';;
import pic from './examples/pic.jpg';

export default {
  name: 'WtAvatarDocs',
  data: () => ({
    pic,
    AbstractUserStatus,
    properties: [
      {
        value: 'src',
        code: '<wt-avatar :src="pic"></wt-avatar>',
        type: 'String',
        description:
          'Avatar pic. IMPORTANT: if this pic is stored locally in project, pass to this prop only pic, imported and passed to data as property',
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
        options: [
          'AbstractUserStatus enum from @webitel/ui-sdk/src/enums/AbstractUserStatus',
        ],
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
  flex-wrap: nowrap;
  gap: var(--spacing-sm);
}
</style>
