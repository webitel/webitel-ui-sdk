declare const registerGateway: () => {
    register: boolean;
    account: string;
    username: string;
    expires: number;
    password: string;
    name: string;
    usage: string;
    proxy: string;
    schema: {};
    enable: boolean;
};
export default registerGateway;
