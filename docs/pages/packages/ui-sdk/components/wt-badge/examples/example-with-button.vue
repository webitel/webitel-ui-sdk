<script setup></script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <div>
      <p class="typo-body-2" style="margin-bottom: 8px">Outside (overlay on the button's corner)</p>
      <wt-badge value="3">
        <wt-button
          icon="chat"
          color="secondary"
          variant="outlined"
          rounded
        />
      </wt-badge>
    </div>

    <div>
      <p class="typo-body-2" style="margin-bottom: 8px">Inside (rendered alongside the button's content)</p>
      <wt-button color="secondary" variant="outlined">
        <span style="display: inline-flex; align-items: center; gap: 6px">
          Messages
          <wt-badge value="3" />
        </span>
      </wt-button>
    </div>
  </div>
</template>

<style scoped></style>
