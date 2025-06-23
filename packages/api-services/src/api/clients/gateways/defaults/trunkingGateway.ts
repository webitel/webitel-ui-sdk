import defaultGateway from './defaultGateway.ts';

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
