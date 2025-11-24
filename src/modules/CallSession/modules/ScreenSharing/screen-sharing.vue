<template>
  <resizable-wrapper>
    <template #default="{ size }">
      <wt-vidstack-player
        v-bind="attrs"
        :class="`screen-sharing--${size}`"
        class="screen-sharing"
        autoplay
        muted
        closable
      >
        <template #content>
          <div class="screen-sharing__indicator">
            <record-indicator
              v-if="props.session.recordings"
              :recording="props.session.recordings"
            />
          </div>
        </template>

        <template #controls-panel>
          <screen-sharing-controls-panel
            :session="props.session"
            :screenshot-status="props.screenshotStatus"
            :screenshot-is-loading="props.screenshotIsLoading"
            @close-session="emit('close-session')"
            @make-screenshot="emit('make-screenshot')"
            @toggle-record="emit('toggle-record')"
          />
        </template>
      </wt-vidstack-player>
    </template>
  </resizable-wrapper>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {defineEmits, useAttrs} from 'vue';

import {ResizableWrapper} from "../../../../components/wt-vidstack-player/components";
import ScreenSharingControlsPanel
  from '../../components/panels/screen-sharing-controls-panel/screen-sharing-controls-panel.vue'
import RecordIndicator from '../../components/record-indicator/record-indicator.vue'
import {ScreenSharingSession, ScreenshotStatus} from '../../types';

interface Props {
  session: ScreenSharingSession
  screenshotStatus: ScreenshotStatus | null
  screenshotIsLoading: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
}>()

const attrs = useAttrs();
</script>

<style lang="scss" scoped>
.screen-sharing {
  position: relative;

  &--sm {
    .screen-sharing__indicator {
      position: relative;
    }
  }

  &--md {
    .screen-sharing__indicator {
      right: var(--p-player-counter-position-padding-md);
      bottom: var(--p-player-counter-position-padding-md);
    }
  }

  &--lg {
    .screen-sharing__indicator {
      right: var(--p-player-counter-position-padding-lg);
      bottom: var(--p-player-counter-position-padding-lg);
    }
  }

  &__indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: flex-end;
    padding: var(--p-player-counter-position-padding-sm);
  }
}
</style>
