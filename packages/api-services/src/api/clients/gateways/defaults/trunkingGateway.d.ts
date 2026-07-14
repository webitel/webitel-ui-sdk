declare const trunkingGateway: () => {
	register: boolean;
	host: string;
	ipacl: any[];
	name: string;
	usage: string;
	proxy: string;
	schema: {};
	enable: boolean;
};
export default trunkingGateway;
