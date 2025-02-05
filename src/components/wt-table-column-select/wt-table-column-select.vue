<template>
  <div class="wt-table-column-select">
    <wt-popup
      class="wt-table-column-select__popup"
      v-bind="attrs"
      @close="close"
    >
      <template #title>
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template #main>
        <div class="wt-table-column-select__popup-list-wrap">
          <ul
            :class="{
              'wt-table-column-select__popup-list--md':
                changeableDraft.length > 10 && changeableDraft.length <= 20,
              'wt-table-column-select__popup-list--lg':
                changeableDraft.length > 20,
            }"
            class="wt-table-column-select__popup-list"
          >
            <li
              v-for="(column, key) of changeableDraft"
              :key="key"
              class="wt-table-column-select__popup-item"
              @click.capture.prevent="column.show = !column.show"
            >
              <wt-checkbox
                :label="shownColLabel(column)"
                :selected="column.show"
                @change="column.show = $event"
              />
            </li>
          </ul>
        </div>
      </template>
      <template #actions>
        <wt-button @click="setShownColumns">
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

<script setup>
import deepCopy from 'deep-copy';
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  staticHeaders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change']);

const draft = ref([]);
const isColumnSelectPopup = ref(false);

const { t } = useI18n();
const attrs = useAttrs();

const changeableDraft = computed(() => {
  return draft.value
  .filter(header => !props.staticHeaders.includes(props.headers))
  .sort((a, b) => shownColLabel(a).localeCompare(shownColLabel(b)));
});

const shownColLabel = ({ text, locale }) => {
  if (!text && locale) {
    return typeof locale === 'string' ? t(locale) : t(...locale);
  }
  return text;
};

const openPopup = () => {
  isColumnSelectPopup.value = true;
};

const close = () => {
  isColumnSelectPopup.value = false;
};

const fillHeadersDraft = () => {
  draft.value = deepCopy(props.headers);
};

const setShownColumns = () => {
  emit('change', draft.value);
  close();
};

watch(() => isColumnSelectPopup.value, fillHeadersDraft);

onMounted(()=> fillHeadersDraft()
);
</script>

<style lang="scss" scoped>
@use '../../css/main.scss';

$list-height: 400px;
$list-width-sm: calc(
  500px - var(--spacing-xl)
); // all popup width - (paddings + overflow-padding)
$list-width-md: calc(
  800px - var(--spacing-xl)
); // all popup width - (paddings + overflow-padding)

.wt-table-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}

.wt-table-column-select {
  &__heading {
    text-align: center;
  }

  &__popup-list-wrap {
    max-height: $list-height;
  }

  &__popup-list {
    @extend %wt-scrollbar;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    flex-wrap: wrap;
    width: $list-width-sm;
    max-height: $list-height;

    // for 10-30 items
    &--md {
      display: block;
      width: $list-width-md;
      column-count: 2;
    }

    // for 30+ items
    &--lg {
      display: block;
      overflow-y: auto;
      width: $list-width-md;
      max-height: none;
      column-count: 3;
    }
  }

  &__popup-item {
    display: flex;
    align-items: center;
    margin-right: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }
}
</style>
