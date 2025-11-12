<template>
  <div class="example-container">
    <wt-message severity="info">
      This is an info message
    </wt-message>

    <wt-message severity="success">
      Operation completed successfully
    </wt-message>

    <wt-message severity="warn">
      Warning: Please review your input
    </wt-message>

    <wt-message severity="error">
      An error occurred while processing
    </wt-message>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
