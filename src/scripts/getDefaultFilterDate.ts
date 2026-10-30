/**
 * [Claude] start of the day of `date` (today by default), epoch ms
 */
export const getStartOfDay = (date: Date | number = new Date()): number =>
	new Date(date).setHours(0, 0, 0, 0);

/**
 * [Claude] end of the day of `date` (today by default), epoch ms
 */
export const getEndOfDay = (date: Date | number = new Date()): number =>
	new Date(date).setHours(23, 59, 59, 999);
