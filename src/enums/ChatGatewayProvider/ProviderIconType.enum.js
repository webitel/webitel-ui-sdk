import ChatGatewayProvider from './ChatGatewayProvider.enum.js';

const ProviderIconType = Object.freeze({
  [ChatGatewayProvider.TELEGRAM_BOT]: 'telegram-bot',
  [ChatGatewayProvider.TELEGRAM_APP]: 'messenger-telegram',
  [ChatGatewayProvider.MESSENGER]: 'meta',
  [ChatGatewayProvider.VIBER]: 'messenger-viber',
  [ChatGatewayProvider.WEBCHAT]: 'messenger-web-chat',
  [ChatGatewayProvider.INFOBIP]: 'messenger-infobip',
  [ChatGatewayProvider.CUSTOM]: 'custom-chat-gateway',
});

export default ProviderIconType;
