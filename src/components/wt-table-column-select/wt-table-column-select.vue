<template>
  <div class="wt-table-column-select">
    <wt-icon-btn
      v-tooltip="$t('webitelUI.tableColumnSelect.title')"
      icon="column-select"
      @click="openPopup"
    />

    <wt-popup
      :shown="isColumnSelectPopup"
      class="wt-table-column-select__popup"
      @close="close"
    >
      <template #title>
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template #main>
				<wt-input-text
					v-if="enableSearch"
					class="wt-table-column-select__popup-search"
					v-model:model-value="search"
				>
					<template #prefix>
						<wt-icon
							icon="search"
						/>
					</template>
					<template #suffix>
						<wt-icon-btn
							v-if="search"
							icon="close--filled"
							@click="search = ''"
						/>
					</template>
				</wt-input-text>
        <div
					class="wt-table-column-select__popup-list-wrap"
					:class="{
						'wt-table-column-select__popup-list-wrap__height-fixed': enableSearch,
						'wt-table-column-select__popup-list-wrap--empty': !changeableDraft.length,
					}"
				>
          <ul
						v-if="changeableDraft.length"
            :class="{
              'wt-table-column-select__popup-list--md':
                changeableDraft.length > 10 && changeableDraft.length <= 20,
              'wt-table-column-select__popup-list--lg':
                changeableDraft.length > 20,
            }"
            class="wt-table-column-select__popup-list"
          >
            <li
              v-for="column of changeableDraft"
              :key="column.value"
              class="wt-table-column-select__popup-item"
            >
              <wt-checkbox
                :label="shownColLabel(column)"
                :selected="column.show"
                @update:selected="column.show = $event"
              />
            </li>
          </ul>
					<wt-empty
						v-else
						:image="darkMode ? EmptyImageDark : EmptyImageLight"
						:text="$t('webitelUI.empty.text.filters')"
						size="sm"
					/>
        </div>
      </template>
      <template #actions>
        <wt-button
					:disabled="!hasShownColumns"
					@click="setShownColumns"
				>
          {{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup lang="ts">
import deepCopy from 'deep-copy';
import { computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import EmptyImageDark from './_internals/assets/empty-dark.svg';
import EmptyImageLight from './_internals/assets/empty-light.svg';

interface Header {
	value: string;
	show: boolean;
	text?: string;
	locale?: string | string[];
}

const props = withDefaults(
	defineProps<{
		headers: Header[];
		staticHeaders?: string[];
		enableSearch?: boolean;
	}>(),
	{
		staticHeaders: () => [],
		enableSearch: false,
	},
);

const emit = defineEmits<{
	change: [
		headers: Header[],
	];
}>();

const { t } = useI18n();

const darkMode = inject('darkMode');

const draft = ref<Header[]>([]);
const search = ref('');
const isColumnSelectPopup = ref(false);

function shownColLabel({ text, locale }: Header): string | undefined {
	if (!text && locale)
		return typeof locale === 'string'
			? t(locale)
			: (t as (key: string, ...args: unknown[]) => string)(
					String(locale[0]),
					...locale.slice(1),
				);
	return text;
}

const changeableDraft = computed(() =>
	draft.value
		.filter(
			(header) =>
				!props.staticHeaders.includes(header.value) &&
				shownColLabel(header)
					?.toLowerCase()
					.includes(search.value?.toLowerCase()),
		)
		.sort(
			(a, b) => shownColLabel(a)?.localeCompare(shownColLabel(b) ?? '') ?? 0,
		),
);

const hasShownColumns = computed(() =>
	draft.value.some((header) => header.show),
);

function fillHeadersDraft() {
	draft.value = deepCopy(props.headers);
}

function openPopup() {
	isColumnSelectPopup.value = true;
}

function close() {
	isColumnSelectPopup.value = false;
	search.value = '';
}

function setShownColumns() {
	emit('change', draft.value);
	close();
}

watch(isColumnSelectPopup, () => {
	fillHeadersDraft();
});
</script>

<style scoped>
.wt-table-column-select {
  line-height: 0; /* prevent 24x28 icon height :/ */
}

.wt-table-column-select__popup-search {
	margin-bottom: var(--spacing-xs);
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--wt-popup-background-color);
}

.wt-table-column-select__popup-list-wrap {
  max-height: 400px;
}

.wt-table-column-select__popup-list-wrap__height-fixed {
	height: 400px;
}

.wt-table-column-select__popup-list-wrap--empty {
	display: flex;
	align-items: center;
	justify-content: center;
}

.wt-table-column-select__popup-list-wrap--empty :deep(.wt-empty) {
	width: 100%;
	min-width: 0;
	max-width: 100%;
	margin: 0;
}

.wt-table-column-select__popup-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(500px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
  max-height: 400px;
  overflow-x: hidden;
}

/* for 10-30 items */
.wt-table-column-select__popup-list--md {
  display: block;
  column-count: 2;
  width: calc(800px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
}

/* for 30+ items */
.wt-table-column-select__popup-list--lg {
  display: block;
  column-count: 3;
  width: calc(800px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
  max-height: none;
  overflow-y: auto;
}

.wt-table-column-select__popup-item {
  text-align: start;
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}
</style>
