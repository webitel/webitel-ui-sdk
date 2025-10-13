export const getStartOfDay = () => new Date().setHours(0, 0, 0, 0);
export const getEndOfDay = () => new Date().setHours(23, 59, 59, 999);