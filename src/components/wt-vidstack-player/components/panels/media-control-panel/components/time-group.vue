<template>
  <div class="time-group">
    <media-time type="current" />
    <div>/</div>
    <media-time type="duration" />
  </div>
</template>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.time-group {
  @extend %typo-body-2;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--wt-player-video-control-bar-color);
}
</style>
