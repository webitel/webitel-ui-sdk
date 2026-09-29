<template>
  <wt-rich-text-editor
    v-model="value"
    :plugins="['link', 'lists']"
    label="Email body"
    placeholder="Write a reply…"
    toolbar="undo redo | bold italic underline | numlist bullist | link"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
