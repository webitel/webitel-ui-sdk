<template>
  <resizable-wrapper class="video-preview">
    <template #default>
      <wt-vidstack-player
        v-bind="attrs"
      >
        <template #controls-panel>
          <media-control-panel />
        </template>
      </wt-vidstack-player>
    </template>
  </resizable-wrapper>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {useAttrs} from 'vue';

import {ResizableWrapper} from "../../components/wt-vidstack-player/components";
import MediaControlPanel from './components/panels/media-control-panel/media-control-panel.vue'

const attrs = useAttrs();
</script>

<style lang="scss" scoped>
.video-preview {
}
</style>
