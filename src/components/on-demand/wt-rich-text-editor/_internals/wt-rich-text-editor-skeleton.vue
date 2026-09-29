<template>
  <!-- shown while the editor chunk (TinyMCE) downloads -->
  <div
    aria-busy="true"
    class="wt-rich-text-editor-skeleton"
  >
    <div class="wt-rich-text-editor-skeleton__toolbar" />
    <div class="wt-rich-text-editor-skeleton__body">
      <div class="wt-rich-text-editor-skeleton__line" />
      <div class="wt-rich-text-editor-skeleton__line" />
      <div class="wt-rich-text-editor-skeleton__line wt-rich-text-editor-skeleton__line--short" />
    </div>
  </div>
</template>

<style scoped>
.wt-rich-text-editor-skeleton {
  display: flex;
  flex-direction: column;
  height: 200px;
  cursor: progress;
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-4);
}

.wt-rich-text-editor-skeleton__toolbar {
  height: 40px;
  box-shadow: var(--elevation-2);
}

.wt-rich-text-editor-skeleton__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
}

.wt-rich-text-editor-skeleton__line {
  height: 12px;
  border-radius: var(--border-radius);
  background: var(--skeleton-color, var(--dp-20-surface-color));
  animation: wt-rich-text-editor-skeleton-pulse 1.2s ease-in-out infinite;
}

.wt-rich-text-editor-skeleton__line--short {
  width: 60%;
}

@keyframes wt-rich-text-editor-skeleton-pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
