<template>
  <div class="example-container">
    <wt-message
      severity="info"
      closable
    >
      <template #icon>
        <wt-icon icon="rounded-info" />
      </template>
      This is an info message with a custom icon
    </wt-message>

    <wt-message
      severity="success"
      closable
    >
      <template #icon>
        <wt-icon icon="done--filled" />
      </template>
      Operation completed successfully
    </wt-message>

    <wt-message
      severity="error"
      closable
    >
      <template #icon>
        <wt-icon icon="error" />
      </template>
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
