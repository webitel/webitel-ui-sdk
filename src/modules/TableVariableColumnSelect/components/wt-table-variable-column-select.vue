<template>
  <div class="wt-table-variable-column-select">
    <wt-badge
      v-tooltip="title"
      :hidden="!draft.length"
    >
      <wt-icon-btn
        icon="variable-select"
        @click="open"
      />
    </wt-badge>

    <wt-popup
      :shown="shownPopup"
      :size="size"
      class="wt-table-variable-column-select__popup"
      @close="close"
    >
      <template #title>
        {{ title }}
      </template>
      <template #main>
        <div class="wt-table-variable-column-select__form">
          <wt-input-text
            v-model:model-value="newVariableKey"
            :label="t('vocabulary.keys', 1)"
            class="wt-table-variable-column-select__input"
          />
          <wt-button
            :disabled="r$.$error"
            @click="addVariableHeader(newVariableKey)"
          >
            {{ t('reusable.add') }}
          </wt-button>
        </div>

        <ul class="wt-table-variable-column-select__list">
          <li
            v-for="key in draft"
            :key="key.field"
            class="wt-table-variable-column-select__item"
          >
            <span class="wt-table-variable-column-select__label">{{ key.text }}</span>
            <wt-icon-btn
              icon="bucket"
              @click="deleteKey(key)"
            />
          </li>
        </ul>
      </template>
      <template #actions>
        <wt-button
          :disabled="!hasChanges"
          :loading="isLoading"
          @click="save"
        >
          {{ t('reusable.save') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script lang="ts" setup>
import type { Maybe } from '@regle/core';
import { createRule, useRegle } from '@regle/core';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentSize } from '../../../enums/ComponentSize/ComponentSize';
import isEmpty from '../../../scripts/isEmpty';
import {
	type TableVariableHeader,
	VARIABLE_FIELD_PREFIX,
} from '../composable/useTableVariableHeaders';

const props = withDefaults(
	defineProps<{
		storageKey: string;
		title: string;
		fieldPrefix?: string;
		size?: ComponentSize;
	}>(),
	{
		fieldPrefix: VARIABLE_FIELD_PREFIX,
		size: ComponentSize.MD,
	},
);

const emit = defineEmits<{
	'update:variable-headers': [
		value: TableVariableHeader[],
	];
}>();

const { t } = useI18n();

const shownPopup = ref(false);

const newVariableKey = ref('');

const draft = reactive<TableVariableHeader[]>([]);

let savedHeaders: TableVariableHeader[] = [];

const isLoading = ref(false);

const hasChanges = ref(false);

const variablesFromDraft = computed(() => {
	return draft.map(({ value }) => value.replace(props.fieldPrefix, ''));
});

const requiredRule = createRule({
	validator: (value: Maybe<string>) => Boolean(value),
	message: 'required',
});

const alreadyExistsRule = createRule({
	validator: (value: Maybe<string>) =>
		!value || !variablesFromDraft.value.includes(value),
	message: 'alreadyExists',
});

const { r$ } = useRegle(
	{
		newVariableKey,
	},
	() => ({
		newVariableKey: {
			required: requiredRule,
			alreadyExists: alreadyExistsRule,
		},
	}),
	{
		autoDirty: true,
	},
);
r$.$touch();

const cloneHeaders = (headers: TableVariableHeader[]) =>
	headers.map((header) => ({
		...header,
	}));

const replaceDraft = (headers: TableVariableHeader[]) => {
	draft.splice(0, draft.length, ...cloneHeaders(headers));
};

const open = () => {
	replaceDraft(savedHeaders);
	newVariableKey.value = '';
	hasChanges.value = false;
	shownPopup.value = true;
};

const close = () => {
	replaceDraft(savedHeaders);
	newVariableKey.value = '';
	hasChanges.value = false;
	shownPopup.value = false;
};

const deleteKey = (keyToDelete: TableVariableHeader) => {
	draft.splice(draft.indexOf(keyToDelete), 1);
	hasChanges.value = true;
};

const localStorageSeparator = ';';

const setToLocalStorage = (variableHeaders: string[]) => {
	const storedValue = variableHeaders.join(localStorageSeparator);
	if (storedValue) {
		localStorage.setItem(props.storageKey, storedValue);
	} else {
		localStorage.removeItem(props.storageKey);
	}
};

const getFromLocalStorage = () => {
	return localStorage.getItem(props.storageKey)?.split(localStorageSeparator);
};

const addVariableHeader = (
	variableKey: string,
	{
		trackChanges = true,
	}: {
		trackChanges?: boolean;
	} = {},
) => {
	const variableHeader: TableVariableHeader = {
		value: `${props.fieldPrefix}${variableKey}`,
		show: true,
		field: `${props.fieldPrefix}${variableKey}`,
		text: variableKey,
	};

	draft.unshift(variableHeader);
	if (trackChanges) {
		hasChanges.value = true;
	}

	if (newVariableKey.value) {
		newVariableKey.value = '';
	}
};

const save = () => {
	isLoading.value = true;
	try {
		setToLocalStorage(variablesFromDraft.value);
		savedHeaders = cloneHeaders(draft);
		emit('update:variable-headers', draft);
	} finally {
		isLoading.value = false;
	}
	close();
};

const restore = () => {
	const storedValue = getFromLocalStorage();
	if (!isEmpty(storedValue)) {
		storedValue.forEach((variableKey) => {
			addVariableHeader(variableKey, {
				trackChanges: false,
			});
		});
		draft.forEach((variable) => {
			variable.show = false;
		});
		savedHeaders = cloneHeaders(draft);
		emit('update:variable-headers', draft);
	}
};

restore();
</script>

<style lang="scss" scoped>
.wt-table-variable-column-select {
  line-height: 0;
}

.wt-table-variable-column-select__form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  gap: var(--spacing-xs);
}

.wt-table-variable-column-select__input {
  flex: 1;
}

.wt-table-variable-column-select__list {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-sm);
  gap: var(--spacing-sm);
}

.wt-table-variable-column-select__item {
  display: flex;
  justify-content: space-between;
}

.wt-table-variable-column-select__label {
  display: flex;
  align-items: center;
}
</style>
