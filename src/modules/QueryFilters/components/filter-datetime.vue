<template>
  <wt-datepicker
    :label="label"
    :model-value="filterSchema.value"
    show-time
    @update:model-value="handleChange"
  />
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin.js';

export default {
	name: 'FilterFrom',
	mixins: [
		baseFilterMixin,
	],
	props: {
		filterQuery: {
			type: String,
			required: true,
		},
		label: {
			type: String,
		},
	},

	methods: {
		handleChange(value) {
			this.setValue({
				filter: this.filterQuery,
				value,
			});
			this.setValueToQuery({
				filterQuery: this.filterQuery,
				value,
			});
		},
		restoreValue(value) {
			this.setValue({
				filter: this.filterQuery,
				value: +value,
			});
		},
	},
};
</script>

<style scoped></style>
