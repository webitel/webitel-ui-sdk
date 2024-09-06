<template>
  <article class="provider-info">
    <wt-icon :icon="iconType[props.provider]" />
    <p> {{ $t(`objects.messengers.${props.provider}`) }} </p>
  </article>
</template>

<script setup>

import ChatGatewayProvider from '../../../src/enums/ChatGatewayProvider/ChatGatewayProvider.enum.js';

const props = defineProps({
  provider: {
    type: String,
    default: '',
  },
});

const iconType = {
  [ChatGatewayProvider.TELEGRAM_BOT]: 'telegram-bot',
  [ChatGatewayProvider.TELEGRAM_APP]: 'messenger-telegram',
  [ChatGatewayProvider.MESSENGER]: 'meta',
  [ChatGatewayProvider.VIBER]: 'messenger-viber',
  [ChatGatewayProvider.WEBCHAT]: 'messenger-web-chat',
  [ChatGatewayProvider.INFOBIP]: 'messenger-infobip',
  [ChatGatewayProvider.CUSTOM]: 'custom-chat-gateway',
};

</script>

<style lang="scss" scoped>

.provider-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
