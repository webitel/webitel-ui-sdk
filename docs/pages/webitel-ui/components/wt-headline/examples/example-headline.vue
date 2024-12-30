<script setup></script>

<template>
  <wt-headline>
    <template #title> Headline </template>
    <template #search>
      <wt-search-bar />
    </template>
    <template #actions>
      <wt-button style="margin-left: 20px"> Hello </wt-button>
      <wt-button
        style="margin-left: 20px"
        color="secondary"
      >
        there!
      </wt-button>
    </template>
  </wt-headline>
</template>

<style scoped lang="scss"></style>
