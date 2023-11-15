<template>
  <wt-popup
    class="wt-cc-pause-cause-popup"
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ $t('webitelUI.agentStatusSelect.pauseCausePopup.title') }}
    </template>
    <template #main>
      <form @submit.prevent="setPause">
        <ul>
          <li
            v-for="(option) of pauseCause"
            :key="option.id"
            class="wt-cc-pause-cause-popup-option"
          >
            <wt-radio
              class="wt-cc-pause-cause-popup-option__radio"
              :selected="selected.id"
              :value="option.id"
              :label="option.name"
              @input="select(option)"
            />
            <div class="wt-cc-pause-cause-popup-option__limits-wrapper">
              <span
                :class="{
                  'wt-cc-pause-cause-popup-option__duration--overflow': option.isOverflow,
                }"
              >
                {{ option.duration }}
              </span>
              /
              <span>{{ option.limit }}</span>
            </div>
          </li>
        </ul>
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="!selected"
        @click="setPause"
      >
        {{ $t('reusable.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { computed, ref, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRepresentableAgentPauseCause } from '../../../../composables/useRepresentableAgentPauseCause/useRepresentableAgentPauseCause';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change', 'close']);

const options = toRef(props, 'options');

const selected = ref('');

const { t } = useI18n();

const { representablePauseCause } = useRepresentableAgentPauseCause(options);

const pauseCause = computed(() => representablePauseCause.value.map((cause) => ({
  ...cause,
  duration: cause.isOverflow
    ? `-${cause.durationMin - cause.limitMin} ${t('webitelUI.agentStatusSelect.pauseCausePopup.min')}`
    : `${cause.durationMin} ${t('webitelUI.agentStatusSelect.pauseCausePopup.min')}`,
  limit: cause.limitMin
    ? `${cause.limitMin} ${t('webitelUI.agentStatusSelect.pauseCausePopup.min')}`
    : t('webitelUI.agentStatusSelect.pauseCausePopup.unlimited'),
})));

function select(option) {
  selected.value = option;
}

function close() {
  emit('close');
}

function setPause() {
  emit('change', selected.value.name);
  close();
}
</script>

<style lang="scss" scoped>
.wt-cc-pause-cause-popup-option {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
}

.wt-cc-pause-cause-popup-option__limits-wrapper {
  & > span {
    @extend %typo-caption;
    padding: 6px 10px;
  }

  .wt-cc-pause-cause-popup-option__duration--overflow {
    color: var(--false-color);
  }
}
</style>
