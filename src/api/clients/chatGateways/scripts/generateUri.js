export default () => {
	const length = 31;
	const charset = 'abcdefghijklmnopqrstuvwxyz';
	let value = '/';
	for (let i = 0; i < length; i += 1) {
		value += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return value;
};
