import defaultGateway from './defaultGateway.js';

const trunkingGateway = () => ({
  ...defaultGateway(),
  register: false,
  host: '',
  ipacl: [
    // {
    //   ip: '',
    //   proto: 'any',
    //   port: null,
    // },
  ],
});

export default trunkingGateway;
