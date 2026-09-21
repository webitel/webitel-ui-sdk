<script setup>
import { ref } from 'vue';

const props = defineProps({
	header: {
		type: Object,
		required: true,
	},
	formView: {
		type: Boolean,
		default: false,
	},
	hide: {
		type: Function,
		default: null,
	},
	value: {
		type: String,
		default: '',
	},
});

const emit = defineEmits([
	'apply',
	'clear',
]);
const draft = ref(props.value);

const apply = () => {
	emit('apply', {
		name: props.header.value,
		value: draft.value,
	});
	props.hide?.();
};

const clear = () => {
	draft.value = '';
	emit('clear', {
		name: props.header.value,
	});
	props.hide?.();
};
</script>

<template>
  <!-- vp-raw: попап телепортується в body, і без нього VitePress скидає стилі кнопок -->
  <div
    v-if="!formView"
    class="example-column-filter-preview vp-raw"
  >
    <p class="typo-body-2-bold">{{ header.text }}</p>
    <p class="typo-body-2">{{ value }}</p>
  </div>

  <form
    v-else
    class="example-column-filter vp-raw"
    @submit.prevent="apply"
  >
    <wt-single-select
      v-if="header.options"
      v-model="draft"
      :options="header.options"
      :label="header.text"
      option-value="id"
    />
    <wt-input-text
      v-else
      v-model="draft"
      :label="header.text"
    />

    <footer class="example-column-filter__footer">
      <wt-button
        :disabled="!draft"
        wide
        @click="apply"
      >
        Apply
      </wt-button>
      <wt-button
        color="secondary"
        wide
        @click="clear"
      >
        Clear
      </wt-button>
    </footer>
  </form>
</template>

<style scoped lang="scss">
.example-column-filter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  width: 280px;
}

.example-column-filter__footer {
  display: flex;
  gap: var(--spacing-xs);
}

.example-column-filter-preview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3xs);
}
</style>
