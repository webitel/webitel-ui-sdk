export const HandlingCSVMode = {
	UPLOAD: 'upload',
	PROCESS: 'process',
} as const;

export type HandlingCSVMode =
	(typeof HandlingCSVMode)[keyof typeof HandlingCSVMode];

export default HandlingCSVMode;
