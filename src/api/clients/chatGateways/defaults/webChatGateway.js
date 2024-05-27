import ChatGatewayProvider
  from '../../../../enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import defaultChatGateway from '../defaults/defaultChatGateway';
import WebchatAlternativeChannel from '../enums/WebchatAlternativeChannel.enum';

const webChatGateway = (_btnCodeDirty = false) => ({
  ...defaultChatGateway(),
  provider: ChatGatewayProvider.WEBCHAT,
  metadata: {
    // start: these fields related to chat functionality but should be in metadata for backend
    allowOrigin: [],
    readTimeout: '30',
    writeTimeout: '1',
    handshakeTimeout: '10',
    mediaMaxSize: `${10 * 1024 * 1024}`, // 10mb
    // end

    _btnCodeDirty, // inner flag, if true, btn "copy code" is highlighted
    view: {
      borderRadiusStyle: '',
      lang: 'en',
      btnOpacity: '',
      logoUrl: '',
      accentColor: '',
      position: '',
    },
    captcha: {
      enabled: false,
      sitekey: '',
      secret: '',
      threshold: 0.5,
      showFlag: false,
    },
    chat: {
      enabled: true,
      timeoutIsActive: false,
      openTimeout: '',
      url: '',
    },
    appointment: {
      enabled: false,
      url: '',
      queue: {},
      communicationType: {},
      duration: '30m',
      days: 3,
      availableAgents: 1,
      successTitle: '',
      successSubtitle: '',
      showDefaultHeading: true,
      showEmailField: false,
      showMessageField: false,
    },
    call: {
      enabled: false,
      url: '',
      flow: {},
      id: '',
    },
    alternativeChannels: Object
    .values(WebchatAlternativeChannel)
    .reduce((channels, channel) => (
      {
        ...channels,
        [channel]: {
          url: '',
          enabled: false,
        },
      }
    ), {}),
  },
});

export default webChatGateway;
