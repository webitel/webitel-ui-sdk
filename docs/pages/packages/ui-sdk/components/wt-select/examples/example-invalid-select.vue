<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

import { frameworkOptions as options } from './_internals/select-example-options.js';

const value = ref(options[0]);
const empty = ref('');

const v$ = useVuelidate(
	computed(() => ({
		value: {
			required: () => false,
		},
	})),
	{
		value,
	},
);

v$.value.$touch();
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    :v="v$"
    @input="value = $event"
  />
  <wt-select
    :value="empty"
    :options="options"
    label="Select"
    track-by="name"
    :v="v$"
  />
</template>

<style scoped lang="scss"></style>
