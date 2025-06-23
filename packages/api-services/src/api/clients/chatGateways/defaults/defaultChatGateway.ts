import generateUri from '../scripts/generateUri';

const defaultChatGateway = () => ({
  name: '',
  uri: generateUri(),
  flow: {},
  enabled: false,
  provider: '',
  metadata: {},
  updates: {
    title: '',
    close: '',
    join: '',
    left: '',
  },
});

export default defaultChatGateway;
