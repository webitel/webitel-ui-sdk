<template>
  <article class="preset-preview">
    <wt-expansion-panel
      :collapsed="collapsed"
      @closed="clearEdit"
    >
      <template #title>
        <header class="preset-preview-title-wrapper">
          <!--
                    this <div> is used only for @click.stop to be set, so that expansion panel toggle won't trigger.
                    it would be great to use @click.stop to wt-ratio,
                    but with @vue/compat build and direct input it won't be working like that :(
        -->
          <div @click.stop>
            <wt-radio
              :selected="isSelected"
              :value="true"
              @input="emit('preset:select', preset)"
            />
          </div>
          <p
            :title="preset.name"
            class="preset-preview-name"
          >
            {{ preset.name }}
          </p>
        </header>
      </template>
      <template #actions="{ open }">
        <wt-icon-action
          v-if="!editMode"
          action="edit"
          @click.stop="startEdit({ open })"
        />

        <wt-icon-action
          v-if="editMode"
          action="delete"
          @click.stop="emit('preset:delete', preset)"
        />

        <wt-icon-action
          v-if="editMode"
          :disabled="v$.$invalid || !editing"
          action="save"
          @click.stop="submitEdit"
        />

        <wt-icon-action
          v-if="editMode"
          action="cancel"
          @click.stop="clearEdit"
        />
      </template>
      <template #default>
        <div class="preset-preview-content">
          <preset-name-field
            v-if="editMode"
            v-model:model-value="editDraft.name"
            :v="v$.name"
            @update:model-value="updatePresetName"
          />

          <preset-filters-preview
            :filter-configs="props.filterConfigs"
            :filters-manager="filtersManager"
          />

          <preset-description-field
            v-model:model-value="editDraft.description"
            :preview-mode="!editMode"
            @update:model-value="editing = true"
          />
        </div>
      </template>
    </wt-expansion-panel>
  </article>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import {
  WtExpansionPanel,
  WtIconAction,
  WtRadio,
} from '@webitel/ui-sdk/components';
import { AxiosError } from 'axios';
import { computed, ref } from 'vue';
import { EnginePresetQuery } from 'webitel-sdk';

import { AnyFilterConfig, createFiltersManager } from '../../../filters';
import PresetDescriptionField from '../_shared/input-fields/preset-description-field.vue';
import PresetNameField from '../_shared/input-fields/preset-name-field.vue';
import PresetFiltersPreview from '../_shared/preset-filters-preview.vue';

type Props = {
  preset: EnginePresetQuery;
  isSelected: boolean;
  collapsed: boolean;
  filterConfigs: AnyFilterConfig[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  'preset:select': [EnginePresetQuery];
  'preset:update': [
    {
      preset: EnginePresetQuery;
      onSuccess: () => void;
      onFailure: (err: AxiosError) => void;
    },
  ];
  'preset:delete': [EnginePresetQuery];
}>();

const filtersManager = computed(() => {
  const filtersManager = createFiltersManager();

  const snapshot = props.preset?.preset?.['filtersManager.toString'];
  if (snapshot) {
    filtersManager.fromString(snapshot);
  }

  return filtersManager;
});

const editMode = ref(false);

/**
 *  analogue _durty param in itemInstance
 *  */
const editing = ref(false);

const nameAlreadyExistsError = ref(false);

const editDraft = ref({
  name: '',
  description: '',
});

const fillDraft = () => {
  editDraft.value = {
    name: props.preset.name,
    description: props.preset.description,
  };
};

fillDraft();

const v$ = useVuelidate(
  computed(() => {
    return {
      name: {
        required,
        nameAlreadyInUse: () => !nameAlreadyExistsError.value,
      },
    };
  }),
  editDraft,
  { $autoDirty: true },
);
v$.value.$touch();

const startEdit = ({ open: openExpansion }) => {
  openExpansion();
  editMode.value = true;
};

const clearEdit = () => {
  editMode.value = false;
};

const submitEdit = () => {
  const preset: EnginePresetQuery = {
    ...props.preset,
    ...editDraft.value,
  };
  const onFailure = (err: AxiosError) => {
    if (err.status === 409) {
      nameAlreadyExistsError.value = true;
    }
    editing.value = false;
  };

  emit('preset:update', {
    preset,
    onSuccess: clearEdit,
    onFailure,
  });
};

const updatePresetName = () => {
  nameAlreadyExistsError.value = false;
  editing.value = true;
};
</script>

<style lang="scss" scoped>
.preset-preview-title-wrapper {
  display: flex;
  gap: var(--spacing-xs);
  min-width: 0;
}

.preset-preview-name {
  flex: 1 1 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preset-preview-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
}
</style>
