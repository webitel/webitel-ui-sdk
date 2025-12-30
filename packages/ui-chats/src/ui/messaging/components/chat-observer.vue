<template>
  <div class="chat-observer">
    <wt-intersection-observer
      :can-load-more="props.next"
      :loading="props.isLoading"
      @next="emit(ChatAction.LoadNextMessages)"
    />
  </div>
</template>

<script setup lang="ts">
import { ChatAction } from "../../chat-footer/modules/user-input/enums/ChatAction.enum";
</script>
