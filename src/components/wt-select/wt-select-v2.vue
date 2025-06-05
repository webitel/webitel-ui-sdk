<template>
  <p-auto-complete
    class="w-full"
    :model-value="selectValue"
    :suggestions="suggestions"
    dropdown
    :multiple="multiple"
    option-label="name"
    complete-on-focus
    v-bind="$attrs"
    v-on="listeners"
    @complete="search"
  />
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

import isEmpty from '../../scripts/isEmpty.js';

const props = defineProps({
  value: {
    // default: (props) => {
    //   return props.modelValue;
    // },
  },

  multiple: {
    type: Boolean,
    default: false,
  },

  options: {
    type: Array,
    default: () => [],
  },

  clearable: {
    type: Boolean,
    default: true,
  },
  searchMethod: {
    type: Function,
  },
  /*
   for taggableMixin functionality
   for more info, see WTEL-3181
   */
  allowCustomValues: {
    type: Boolean,
    default: false,
    description: 'See wt-tags-input "taggable" prop.',
  },
  // for taggableMixin functionality
  handleCustomValuesAdditionManually: {
    type: Boolean,
    default: false,
    description: 'See wt-tags-input "manualTagging" prop.',
  },
});

const emits = defineEmits([
  'reset',
  'search-change',
  'input', // vue 2
  'update:modelValue', // vue 3
  'closed',
  'custom-value', // fires when allowCustomValues and new customValue is added
]);

const isOpened = ref(false);
const isLoading = ref(false);
const searchHasNext = ref(true);
const suggestions = ref([]);
const searchParams = reactive({
  search: '',
  page: 1,
});

const taggable = computed(() => {
  return props.allowCustomValues;
});

const manualTagging = computed(() => {
  return props.handleCustomValuesAdditionManually;
});

const isApiMode = computed(() => {
  return !!props.searchMethod;
});

const optionsWithCustomValues = computed(() => {
  // https://webitel.atlassian.net/browse/WTEL-3181
  console.log('props.allowCustomValues', props.allowCustomValues);

  if (!props.allowCustomValues) return selectOptions.value;

  /**
   custom values could be restored after refresh, so that they could be not included in options prop,
   so that we should add them to options manually (but filter duplicates, which are already in options)

   i assume it's bad decision and it's better to include custom values to options prop,
   but current filters logic restores value at filter component, but options value are pre-defined at store state
   */

  const customValuesToOptions = Array.isArray(props.value)
    ? props.value
    : isEmpty(props.value)
      ? []
      : [props.value]; //do not add empty values
  const optionsWithoutValues = selectOptions.value.filter((opt) => {
    const optKey = props.trackBy ? opt[props.trackBy] : opt;
    return !customValuesToOptions.some((customValue) => {
      const customValueKey = props.trackBy
        ? customValue[props.trackBy]
        : customValue;
      return customValueKey === optKey;
    });
  });
  return [...customValuesToOptions, ...optionsWithoutValues];
});

const fetchOptions = async ({ search, page }) => {
  if (!isApiMode.value) return [];
  const { items, next } = await this.searchMethod({ search, page });
  searchHasNext.value = next;
  return items;
};

const search = async (event) => {
  console.log('event.query', event.query);
  console.log('event.query', event);

  if (!isApiMode.value) {
    return suggestions.value = [...props.options];
  }

  const fetchedOptions = await fetchOptions({
    search: event.query,
    page: 1,
  });

  suggestions.value = [...suggestions.value, ...fetchedOptions];
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use './multiselect.scss' as *;

.wt-select {
  width: 100%;
  min-width: 0;
}

/*
 * @author: Oleksandr Palonnyi
 *
 * [WTEL-6814](https://webitel.atlassian.net/browse/WTEL-6814)
 *
 * added pointer-events: auto; to have access to multiselect__limit when select is disabled.
*/
.multiselect__limit {
  pointer-events: auto;
}

:deep(.multiselect) {
  .multiselect__custom-tag,
  .multiselect__single-label {
    // text overflow 3 dots
    @extend %typo-body-1;
    display: block;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

:deep(.multiselect--active) {
  .multiselect__tags-wrap,
  .multiselect__strong {
    display: none;
  }
}

// right padding setup

// default case
.wt-select {
  // all is fine
  :deep(.multiselect) {
    .multiselect__tags {
      padding: var(--input-padding) calc(
        var(--input-padding) + var(--icon-md-size) +
        var(--select-caret-right-pos)
      ) var(--input-padding) var(--input-padding);
    }
  }
}

// only chip
.wt-select.wt-select--multiple:not(.wt-select--clearable) {
  :deep(.multiselect) {
    $multiselect-limit-right-pos: calc(
      var(--select-caret-right-pos)// caret offet from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos + 50px// chip
        + var(--input-padding) // chip-to-content offset
      );
    }

    .multiselect__limit {
      right: $multiselect-limit-right-pos;
    }
  }
}

// only clearable
.wt-select.wt-select--clearable:not(.wt-select--multiple) {
  :deep(.multiselect) {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos)// caret offset from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-clear-right-pos + var(--icon-md-size)// clear
        + var(--input-padding) // clear-to-content offset
      );
    }

    .multiselect__clear {
      right: $multiselect-clear-right-pos;
    }
  }
}

// clearable and chip
.wt-select.wt-select--multiple.wt-select--clearable {
  :deep(.multiselect) {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos)// caret offet from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    $multiselect-limit-right-pos: calc(
      $multiselect-clear-right-pos + /* clear offet from border */var(--icon-md-size)/* clear size */ + var(--input-padding) /* cleat-to-chip offset */
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos + 50px// chip
        + var(--input-padding) // chip-to-content offset
      );
    }

    .multiselect__clear {
      right: $multiselect-clear-right-pos;
    }

    .multiselect__limit {
      right: $multiselect-limit-right-pos;
    }
  }
}
</style>
