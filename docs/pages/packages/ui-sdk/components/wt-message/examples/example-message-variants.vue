<template>
  <div class="example-container">
    <div>
      <h4>Filled (default)</h4>
      <wt-message severity="info" variant="filled">
        Filled variant message
      </wt-message>
    </div>

    <div>
      <h4>Outlined</h4>
      <wt-message severity="success" variant="outlined">
        Outlined variant message
      </wt-message>
    </div>

    <div>
      <h4>Simple</h4>
      <wt-message severity="warn" variant="simple">
        Simple variant message
      </wt-message>
    </div>
  </div>
</template>

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
