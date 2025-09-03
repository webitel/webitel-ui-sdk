<script setup>
const user = {
  name: 'My name',
  preferredUsername: 'My username',
};

const buildInfo = {
  release: '21.02',
  build: 'AWS-12',
};
</script>

<template>
  <wt-app-header>
    <template #end>
      <wt-header-actions
        :user="user"
        :build-info="buildInfo"
      />
    </template>
  </wt-app-header>
</template>

<style scoped lang="scss"></style>
