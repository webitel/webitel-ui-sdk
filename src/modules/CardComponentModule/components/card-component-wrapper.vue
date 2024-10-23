<template>
  <wt-page-wrapper
    :actions-panel="!!currentTab.filters"
  >
    <template #header>
      <slot name="header">
        <wt-page-header
          :hide-primary="!hasSaveActionAccess"
          :primary-action="save"
          :primary-disabled="disabledSave"
          :primary-text="saveText"
          :secondary-action="close"
        >
          <wt-headline-nav :path="cardPath" />
        </wt-page-header>
      </slot>

    </template>

    <template #actions-panel>
      <slot name="actions-panel">
        <component
          :is="currentTab.filters"
          :namespace="namespace"
        />
      </slot>
    </template>

    <template #main>
      <slot name="main">
        <form
          class="main-container"
          @submit.prevent="save"
        >
          <wt-tabs
            :current="currentTab"
            :tabs="tabs"
            @change="changeTab"
          />
          <router-view v-slot="{ Component }">
            <component
              :is="Component"
              :access="{ read: true, edit: !disableUserInput, delete: !disableUserInput, add: !disableUserInput }"
              :namespace="cardNamespace"
              :v="v$"
            />
          </router-view>
          <input
            hidden
            type="submit"
          > <!--  submit form on Enter  -->
        </form>
      </slot>
    </template>
  </wt-page-wrapper>
</template>


<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCardStore } from '../../../store/new/index.js';
import { useAccessControl } from '../../../composables/useAccessControl/useAccessControl.js';
import { useCardComponent } from '../composables/useCardComponent.js';
import { useCardTabs } from '../composables/useCardTabs.js';
import { useClose } from '../../../composables/useClose/useClose.js';
import { useValidate } from '../../../composables/useValidate/useValidate.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
  path: {
    type: Array,
    required: true,
  },
  validateSchema: {
    type: Object,
    default: {},
  },
  routeName: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
const route = useRoute();

const {
  namespace: cardNamespace,
  itemInstance,
  ...restStore
} = useCardStore(props.namespace);

const { v$, invalid } = useValidate(props.validateSchema, itemInstance);
const { isNew, pathName, disabledSave, saveText, save, initialize } = useCardComponent({...restStore, itemInstance, invalid});
const { hasSaveActionAccess, disableUserInput } = useAccessControl();
const { currentTab, changeTab } = useCardTabs(props.tabs);
const { close } = useClose(props.routeName);

const cardPath = computed(() => {
  return [...props.path, {
    name: isNew.value ? t('objects.new') : pathName.value,
    route: {
      name: currentTab.value.pathName,
      query: route.query,
    },
  }];
});

initialize();
</script>

<style lang="scss" scoped>
</style>
