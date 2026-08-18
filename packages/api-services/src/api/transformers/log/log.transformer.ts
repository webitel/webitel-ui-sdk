const logTransformer = <T>(arg: T): T => {
	console.log(arg);
	return arg;
};

export default logTransformer;
