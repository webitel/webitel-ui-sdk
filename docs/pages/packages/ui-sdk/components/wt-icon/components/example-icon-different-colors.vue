<template>
    <div style="display: flex; gap: var(--spacing-xs);">
        <wt-icon
            v-for="color in colors"
            :style="color === IconColor.ON_DARK ? 'background-color: var(--grey-darken-1);' : ''"
            :key="color"
            :color="color"
            icon="edit"
        />
    </div>
</template>

<script setup>
import { IconColor } from '../../../../../../../src/enums';

const colors = Object.values(IconColor);
</script>
