import defaultGateway from './defaultGateway.js';

const registerGateway = () => ({
  ...defaultGateway(),
  register: true,
  account: '',
  username: '',
  expires: 600,
  password: '',
});

export default registerGateway;
