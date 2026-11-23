<template>
  <div
    ref="root"
    class="debug-recorder-indicator"
  >
    <div
      v-if="open"
      class="debug-recorder-indicator__panel"
      role="dialog"
      :aria-label="t(`${KEY}.title`)"
    >
      <p class="typo-subtitle-2">
        {{ t(`${KEY}.title`) }}
      </p>
      <p class="debug-recorder-indicator__muted typo-body-2">
        {{ info }}
      </p>
      <wt-button
        :color="ButtonColor.SECONDARY"
        :disabled="busy"
        :size="ComponentSize.SM"
        wide
        @click="run('preparing', actions.download)"
      >
        {{ t(`${KEY}.download`) }}
      </wt-button>
      <wt-button
        v-if="!confirming"
        :color="ButtonColor.ERROR"
        :disabled="busy"
        :size="ComponentSize.SM"
        wide
        @click="confirming = true"
      >
        {{ t(`${KEY}.stop`) }}
      </wt-button>
      <template v-else>
        <p class="typo-body-2">
          {{ t(`${KEY}.confirm`) }}
        </p>
        <wt-button
          :color="ButtonColor.ERROR"
          :disabled="busy"
          :size="ComponentSize.SM"
          wide
          @click="run('deleting', actions.stop)"
        >
          {{ t(`${KEY}.confirmDelete`) }}
        </wt-button>
        <wt-button
          :color="ButtonColor.SECONDARY"
          :disabled="busy"
          :size="ComponentSize.SM"
          wide
          @click="confirming = false"
        >
          {{ t(`${KEY}.cancel`) }}
        </wt-button>
      </template>
      <p
        v-if="status"
        class="debug-recorder-indicator__muted typo-body-2"
      >
        {{ status }}
      </p>
    </div>
    <wt-button
      class="debug-recorder-indicator__chip"
      :color="ButtonColor.ERROR"
      :size="ComponentSize.SM"
      :title="t(`${KEY}.chipTitle`)"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      ● REC
    </wt-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import WtButton from '../../../components/wt-button/wt-button.vue';
import { ButtonColor, ComponentSize } from '../../../enums';
import { DEBUG_RECORDER_LOCALE_KEY as KEY, pickLocale } from '../indicator';
import type { RecorderStats } from '../types';

export interface IndicatorActions {
	download(): Promise<void>;
	stop(): Promise<void>;
	stats(): Promise<RecorderStats | null>;
}

const props = defineProps<{
	actions: IndicatorActions;
}>();

const { t, locale, availableLocales } = useI18n();

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const confirming = ref(false);
const busy = ref(false);
const status = ref('');
const info = ref('');

// BCP 47 for dates and numbers: webitel's Kazakh is `kz`, the standard code is `kk`
const localeTag = () => (locale.value === 'kz' ? 'kk' : locale.value);

function summary(stats: RecorderStats | null): string {
	if (!stats) return t(`${KEY}.recordingOn`);
	const since = stats.firstT
		? new Date(stats.firstT).toLocaleString(localeTag(), {
				dateStyle: 'short',
				timeStyle: 'short',
			})
		: '—';
	return t(`${KEY}.summary`, {
		count: stats.records.toLocaleString(localeTag()),
		since,
	});
}

function close() {
	open.value = false;
}

function toggle() {
	if (open.value) return close();
	// the app's language may have changed since the chip appeared
	locale.value = pickLocale(availableLocales);
	open.value = true;
	confirming.value = false;
	status.value = '';
	info.value = t(`${KEY}.recordingOn`);
	props.actions
		.stats()
		.then((stats) => {
			info.value = summary(stats);
		})
		.catch(() => {});
}

async function run(label: string, task: () => Promise<void>) {
	status.value = t(`${KEY}.${label}`);
	busy.value = true;
	try {
		await task();
		status.value = '';
	} catch {
		status.value = t(`${KEY}.failed`);
	} finally {
		busy.value = false;
	}
}

const onOutside = (event: MouseEvent) => {
	if (root.value && !root.value.contains(event.target as Node)) close();
};
const onKey = (event: KeyboardEvent) => {
	if (event.key === 'Escape') close();
};

onMounted(() => {
	document.addEventListener('mousedown', onOutside, true);
	document.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => {
	document.removeEventListener('mousedown', onOutside, true);
	document.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.debug-recorder-indicator {
  position: fixed;
  left: var(--spacing-xs);
  bottom: var(--spacing-xs);
  z-index: 2147483647;
}

.debug-recorder-indicator__panel {
  position: absolute;
  left: 0;
  bottom: calc(100% + var(--spacing-xs));
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 280px;
  padding: var(--spacing-sm);
  color: var(--text-main-color);
  background: var(--content-wrapper-color);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
}

.debug-recorder-indicator__muted {
  color: var(--text-disabled-color);
}
</style>
