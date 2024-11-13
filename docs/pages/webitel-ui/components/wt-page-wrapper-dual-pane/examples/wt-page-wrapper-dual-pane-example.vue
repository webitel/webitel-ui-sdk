<template>
  <wt-page-wrapper-dual-pane
    @update:size="size"
    :actions-panel="false"
    class="opened-case opened-card"
  >
    <template #header>
      <wt-page-header
        hide-primary
      >
        <template #actions>
          <wt-button
            color="secondary"
          >
            {{ 'Save' }}
          </wt-button>
        </template>
      </wt-page-header>
    </template>
    <template #side>
    </template>
    <template #main>
    </template>
  </wt-page-wrapper-dual-pane>
</template>

<script setup>
import { ref } from 'vue';

const size = ref('md');

</script>
