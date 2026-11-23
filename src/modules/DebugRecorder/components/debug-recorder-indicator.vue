<template>
  <div
    ref="root"
    class="debug-recorder-indicator"
  >
    <div
      v-if="open"
      class="debug-recorder-indicator__menu"
      role="dialog"
      :aria-label="text('title')"
    >
      <div class="debug-recorder-indicator__title">
        {{ text('title') }}
      </div>
      <div class="debug-recorder-indicator__muted">
        {{ info }}
      </div>
      <button
        type="button"
        class="debug-recorder-indicator__item"
        :disabled="busy"
        @click="run('preparing', actions.download)"
      >
        {{ text('download') }}
      </button>
      <button
        v-if="!confirming"
        type="button"
        class="debug-recorder-indicator__item debug-recorder-indicator__item--danger"
        :disabled="busy"
        @click="confirming = true"
      >
        {{ text('stop') }}
      </button>
      <div
        v-else
        class="debug-recorder-indicator__confirm"
      >
        <div>{{ text('confirm') }}</div>
        <button
          type="button"
          class="debug-recorder-indicator__item debug-recorder-indicator__item--danger"
          :disabled="busy"
          @click="run('deleting', actions.stop)"
        >
          {{ text('confirmDelete') }}
        </button>
        <button
          type="button"
          class="debug-recorder-indicator__item"
          :disabled="busy"
          @click="confirming = false"
        >
          {{ text('cancel') }}
        </button>
      </div>
      <div
        v-if="status"
        class="debug-recorder-indicator__muted debug-recorder-indicator__status"
      >
        {{ status }}
      </div>
    </div>
    <button
      type="button"
      class="debug-recorder-indicator__chip"
      :title="text('chipTitle')"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      ● REC
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import {
	currentLocaleTag,
	type DebugRecorderText,
	translate as text,
} from '../i18n';
import type { RecorderStats } from '../types';

export interface IndicatorActions {
	download(): Promise<void>;
	stop(): Promise<void>;
	stats(): Promise<RecorderStats | null>;
}

const props = defineProps<{
	actions: IndicatorActions;
}>();

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const confirming = ref(false);
const busy = ref(false);
const status = ref('');
const info = ref('');

function summary(stats: RecorderStats | null): string {
	if (!stats) return text('recordingOn');
	const locale = currentLocaleTag();
	const since = stats.firstT
		? new Date(stats.firstT).toLocaleString(locale, {
				dateStyle: 'short',
				timeStyle: 'short',
			})
		: '—';
	return text('summary', {
		count: stats.records.toLocaleString(locale),
		since,
	});
}

function close() {
	open.value = false;
}

function toggle() {
	if (open.value) return close();
	open.value = true;
	confirming.value = false;
	status.value = '';
	info.value = text('recordingOn');
	props.actions
		.stats()
		.then((stats) => {
			info.value = summary(stats);
		})
		.catch(() => {});
}

async function run(label: DebugRecorderText, task: () => Promise<void>) {
	status.value = text(label);
	busy.value = true;
	try {
		await task();
		status.value = '';
	} catch {
		status.value = text('failed');
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
  left: 8px;
  bottom: 8px;
  z-index: 2147483647;
  font: 13px/1.4 system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.debug-recorder-indicator__chip {
  padding: 2px 8px;
  font: 600 11px/16px system-ui, sans-serif;
  color: #fff;
  background: #d32f2f;
  border: 0;
  border-radius: 10px;
  opacity: 0.85;
  cursor: pointer;
}

.debug-recorder-indicator__menu {
  position: absolute;
  left: 0;
  bottom: 26px;
  width: 260px;
  padding: 10px;
  color: #1d1d1f;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}

.debug-recorder-indicator__title {
  font-weight: 600;
}

.debug-recorder-indicator__muted {
  margin: 2px 0 6px;
  color: #6b6b70;
}

.debug-recorder-indicator__status {
  margin: 6px 0 0;
}

.debug-recorder-indicator__confirm {
  margin-top: 6px;
}

.debug-recorder-indicator__item {
  display: block;
  width: 100%;
  margin: 4px 0 0;
  padding: 6px 10px;
  font: inherit;
  text-align: left;
  color: #1d1d1f;
  background: #f3f3f5;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.debug-recorder-indicator__item--danger {
  color: #d32f2f;
}

.debug-recorder-indicator__item:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
