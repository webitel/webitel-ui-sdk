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
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="secondary"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="success"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="warn"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="error"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="info"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="job"
      @click="load"
    >
    </wt-button>
    <wt-button
      :loading="loading"
      icon="call"
      color="transfer"
      @click="load"
    >
    </wt-button>
  </div>
</template>

<style lang="scss" scoped></style>
