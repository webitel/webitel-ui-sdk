<script setup>
import { ButtonVariant, IconColor } from '../../../../../../../src/enums';

const iconColors = [
	IconColor.DEFAULT,
	IconColor.ACTIVE,
	IconColor.PRIMARY,
	IconColor.ERROR,
	IconColor.SUCCESS,
	IconColor.WARNING,
];
</script>

<template>
  <div class="flex gap-2">
    <wt-button
      v-for="iconColor in iconColors"
      :key="iconColor"
      :icon-color="iconColor"
      :variant="ButtonVariant.TEXT"
      color="secondary"
      icon="call"
    />
  </div>
</template>
