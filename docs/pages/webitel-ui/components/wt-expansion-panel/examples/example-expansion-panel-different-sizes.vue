<script setup></script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <!--   default size -->
    <wt-expansion-panel size="md">
      <template #title> Md Title </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </wt-expansion-panel>

    <wt-expansion-panel size="sm">
      <template #title> Sm Title </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </wt-expansion-panel>
  </div>
</template>

<style scoped lang="scss"></style>
