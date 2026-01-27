<template>
    <div style="display: flex; gap: var(--spacing-xs);">
        <wt-icon
            v-for="size in sizes"
            :key="size"
            :size="size"
            icon="edit"
        />
    </div>
</template>

<script setup>
import { ComponentSize } from '../../../../../../../src/enums';

const sizes = Object.values(ComponentSize).reverse();
</script>
