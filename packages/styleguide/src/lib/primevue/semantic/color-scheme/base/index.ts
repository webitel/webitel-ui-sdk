import shadow from './shadow';
import typography from './typography';

const colorScheme = {
	light: {
		...typography.light,
		...shadow.light,
	},
	dark: {
		...typography.dark,
		...shadow.dark,
	},
};

export default colorScheme;
