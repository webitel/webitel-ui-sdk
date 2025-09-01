<script setup>
import { ref } from 'vue';

const loading = ref(false);

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 0);
};
</script>

<template>
  <div class="flex gap-2">
    <wt-button
      :loading="loading"
      icon="call"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="secondary"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="success"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="warn"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="error"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="info"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="job"
      icon-active
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="transfer"
      icon-active
      @click="load"
    >
    </wt-button>
  </div>
</template>

<style lang="scss" scoped></style>
