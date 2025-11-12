<template>
  <div class="example-container">
    <wt-message
      v-if="showInfo"
      severity="info"
      closable
      @close="showInfo = false"
    >
      This message can be closed
    </wt-message>

    <wt-message
      v-if="showSuccess"
      severity="success"
      closable
      @close="showSuccess = false"
    >
      Success! You can dismiss this message
    </wt-message>

    <wt-button
      v-if="!showInfo || !showSuccess"
      @click="resetMessages"
    >
      Reset Messages
    </wt-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showInfo = ref(true);
const showSuccess = ref(true);

const resetMessages = () => {
  showInfo.value = true;
  showSuccess.value = true;
};
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
