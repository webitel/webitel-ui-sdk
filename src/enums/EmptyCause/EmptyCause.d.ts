export declare const EmptyCause: Readonly<{
	ERROR: 'error';
	FILTERS: 'filters';
	EMPTY: 'empty';
}>;
export type EmptyCause = (typeof EmptyCause)[keyof typeof EmptyCause];
