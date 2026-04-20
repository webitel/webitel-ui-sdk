<template>
  <form
    class="wt-inline-add-panel"
    :class="[`wt-inline-add-panel--${props.direction}`]"
    @submit.prevent="submit"
  >
    <slot />
    <div class="wt-inline-add-panel__actions">
      <wt-button
        :disabled="props.disabledAddAction"
        icon="tick"
        color="secondary"
        outlined
        @click="submit"
      />
      <wt-button
        icon="close"
        outlined
        color="secondary"
        @click="reset"
      />
    </div>

  </form>
</template>

<script lang="ts" setup>
interface WtInlineAddPanel {
	disabledAddAction?: boolean;
	direction?: 'row' | 'column';
}

const props = withDefaults(defineProps<WtInlineAddPanel>(), {
	direction: 'row',
	disabledAddAction: false,
});

const emit = defineEmits([
	'submit',
	'reset',
]);

function submit() {
	emit('submit');
}

function reset() {
	emit('reset');
}
</script>

<style scoped>
.wt-inline-add-panel {
  display: flex;
  width: 100%;
  gap: var(--spacing-xs);
}

.wt-inline-add-panel__actions {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--spacing-xs);
}

.wt-inline-add-panel--column {
  flex-direction: column;
}
</style>
