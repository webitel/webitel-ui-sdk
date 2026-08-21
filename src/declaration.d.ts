declare module '*.scss' {
	const classes: Record<string, string>;
	export default classes;
}

declare module '*.css' {
	const classes: Record<string, string>;
	export default classes;
}

// added declare for @webitel/styleguide/fonts, because of ts error in install.ts file
declare module '@webitel/styleguide/fonts' {
	const content: string;
	export default content;
}
declare module '*.svg?raw' {
	const content: string;
	export default content;
}

// jszip-utils ships no types and has no @types package
declare module 'jszip-utils' {
	const jszipUtils: {
		getBinaryContent(
			path: string,
			callback: (err: Error | null, data: ArrayBuffer) => void,
		): void;
		getBinaryContent(path: string): Promise<ArrayBuffer>;
	};
	export default jszipUtils;
}

interface Window {
	/** webitel-sdk websocket client instance, exposed globally at runtime. */
	cli?: import('webitel-sdk').Client | null;
}
