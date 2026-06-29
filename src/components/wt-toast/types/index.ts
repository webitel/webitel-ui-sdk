import { MessageColor } from '../../../enums';

export const TypeToSeverityMap = {
	success: MessageColor.SUCCESS,
	info: MessageColor.INFO,
	error: MessageColor.ERROR,
	warning: MessageColor.WARN,
} as const;

export type TypeToSeverityMap =
	(typeof TypeToSeverityMap)[keyof typeof TypeToSeverityMap];
