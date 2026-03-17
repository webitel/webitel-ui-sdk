<script setup>
import { ref } from 'vue';

import wtSelectV2 from '../../../../../../../src/components/wt-select/wt-select-v2.vue';

const options = [
	{
		name: 'Vue.js1',
		language: 'JavaScript',
	},
	{
		name: 'Adonis2',
		language: 'JavaScript',
	},
	{
		name: 'Rails3',
		language: 'Ruby',
	},
	{
		name: 'Sinatra4',
		language: 'Ruby',
	},
	{
		name: 'Laravel5',
		language: 'PHP',
	},
	{
		name: 'Phoenix6',
		language: 'Elixir',
	},
	{
		name: 'Vue.js7',
		language: 'JavaScript',
	},
	{
		name: 'Adonis8',
		language: 'JavaScript',
	},
	{
		name: 'Rails9',
		language: 'Ruby',
	},
	{
		name: 'Sinatra10',
		language: 'Ruby',
	},
	{
		name: 'Laravel11',
		language: 'PHP',
	},
	{
		name: 'Phoenix12',
		language: 'Elixir',
	},
];

const allApiOptions = [
	{
		name: 'Angular',
		language: 'TypeScript',
	},
	{
		name: 'React',
		language: 'JavaScript',
	},
	{
		name: 'Svelte',
		language: 'JavaScript',
	},
	{
		name: 'Ember',
		language: 'JavaScript',
	},
	{
		name: 'Backbone',
		language: 'JavaScript',
	},
	{
		name: 'Meteor',
		language: 'JavaScript',
	},
	{
		name: 'Next.js',
		language: 'JavaScript',
	},
	{
		name: 'Nuxt.js',
		language: 'JavaScript',
	},
	{
		name: 'Django',
		language: 'Python',
	},
	{
		name: 'Flask',
		language: 'Python',
	},
	{
		name: 'FastAPI',
		language: 'Python',
	},
	{
		name: 'Spring',
		language: 'Java',
	},
	{
		name: 'Quarkus',
		language: 'Java',
	},
	{
		name: 'Micronaut',
		language: 'Java',
	},
	{
		name: 'Express',
		language: 'JavaScript',
	},
	{
		name: 'Koa',
		language: 'JavaScript',
	},
	{
		name: 'Hapi',
		language: 'JavaScript',
	},
	{
		name: 'Gin',
		language: 'Go',
	},
	{
		name: 'Echo',
		language: 'Go',
	},
	{
		name: 'Fiber',
		language: 'Go',
	},
	{
		name: 'Buffalo',
		language: 'Go',
	},
	{
		name: 'Revel',
		language: 'Go',
	},
	{
		name: 'Actix',
		language: 'Rust',
	},
	{
		name: 'Axum',
		language: 'Rust',
	},
	{
		name: 'Rocket',
		language: 'Rust',
	},
	{
		name: 'Warp',
		language: 'Rust',
	},
	{
		name: 'Tide',
		language: 'Rust',
	},
	{
		name: 'Ktor',
		language: 'Kotlin',
	},
	{
		name: 'Javalin',
		language: 'Kotlin',
	},
	{
		name: 'Yii',
		language: 'PHP',
	},
	{
		name: 'Symfony',
		language: 'PHP',
	},
	{
		name: 'CodeIgniter',
		language: 'PHP',
	},
	{
		name: 'Slim',
		language: 'PHP',
	},
	{
		name: 'Grape',
		language: 'Ruby',
	},
	{
		name: 'Hanami',
		language: 'Ruby',
	},
	{
		name: 'Falcon',
		language: 'Python',
	},
	{
		name: 'Tornado',
		language: 'Python',
	},
	{
		name: 'Sanic',
		language: 'Python',
	},
	{
		name: 'Loco',
		language: 'Rust',
	},
	{
		name: 'Hono',
		language: 'JavaScript',
	},
	{
		name: 'Elysia',
		language: 'JavaScript',
	},
	{
		name: 'Fastify',
		language: 'JavaScript',
	},
	{
		name: 'Nitro',
		language: 'JavaScript',
	},
	{
		name: 'Nest.js',
		language: 'TypeScript',
	},
	{
		name: 'Adonis.js',
		language: 'TypeScript',
	},
	{
		name: 'Feathers',
		language: 'JavaScript',
	},
	{
		name: 'Moleculer',
		language: 'JavaScript',
	},
];

const PAGE_SIZE = 10;

const searchMethod = async ({ search, page }) => {
	// simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const filtered = allApiOptions.filter(({ name }) =>
		name.toLowerCase().includes(search.toLowerCase()),
	);

	const offset = (page - 1) * PAGE_SIZE;
	const items = filtered.slice(offset, offset + PAGE_SIZE);
	const next = offset + PAGE_SIZE < filtered.length;

	return {
		items,
		next,
	};
};

const value = ref(options[0]);
const empty = ref('');
const apiValue = ref(allApiOptions[11]);
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    @input="value = $event"
  />
  <wt-select-v2
    v-model="value"
    :options="options"
    label="Select"
    optionLabel="name"
  />
  <wt-select
    :value="empty"
    :options="options"
    label="Select"
    track-by="name"
  />
  <wt-select-v2
    v-model="empty"
    :options="options"
    label="Select"
    optionLabel="name"
  />
  <wt-select-v2
    v-model="apiValue"
    :search-method="searchMethod"
    label="Select (API)"
    optionLabel="name"
  />
</template>

<style scoped lang="scss"></style>
