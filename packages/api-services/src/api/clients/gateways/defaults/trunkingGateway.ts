import defaultGateway from './defaultGateway';

export interface GatewayIpAcl {
	ip: string;
	proto: string;
	port: number | null;
}

const trunkingGateway = () => ({
	...defaultGateway(),
	register: false,
	host: '',
	ipacl: [] as GatewayIpAcl[],
});

export default trunkingGateway;
