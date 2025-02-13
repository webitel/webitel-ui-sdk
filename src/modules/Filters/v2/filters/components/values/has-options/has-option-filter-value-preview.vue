<template>
  <div>{{ bool ? t('vocabulary.yes') : t('vocabulary.no') }}</div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();
const bool= ref(JSON.parse(props.value));
</script>

<style lang="scss" scoped></style>
