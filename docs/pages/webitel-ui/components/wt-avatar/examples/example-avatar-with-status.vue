<script setup>
import AbstractUserStatus from '../../../../../../src/enums/AbstractUserStatus/AbstractUserStatus.enum';
import pic from './pic.jpg';
</script>

<template>
  <div style="display: flex; gap: 10px">
    <wt-avatar
      v-for="status in Object.values(AbstractUserStatus)"
      :key="status"
      :status="status"
      :src="pic"
      size="lg"
      badge
    />
  </div>
</template>

<style scoped lang="scss"></style>
