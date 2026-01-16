<template>
  <div class="example-container">
    <div>
      <h4>Small</h4>
      <wt-message severity="info" :size="ComponentSize.SM">
        Small size message
      </wt-message>
    </div>

    <div>
      <h4>Default (medium)</h4>
      <wt-message severity="success">
        Default size message
      </wt-message>
    </div>

    <div>
      <h4>Large</h4>
      <wt-message severity="warn" :size="ComponentSize.LG">
        Large size message
      </wt-message>
    </div>
  </div>
</template>

<script setup>
import { ComponentSize } from '../../../../../../../src/enums';
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-container > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h4 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--wt-text-secondary);
}
</style>
