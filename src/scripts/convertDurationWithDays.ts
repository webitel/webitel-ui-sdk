const convertDurationWithDays = (
	duration: number,
	timerFormatting = false,
): string => {
	if (!duration && !timerFormatting) return '00:00:00';

	// Convert milliseconds to seconds because if timerFormatting is true, duration is in milliseconds
	const totalSeconds = timerFormatting
		? Math.abs(Number(duration)) / 1000
		: Math.abs(Number(duration));

	const isNegative = duration < 0;

	const days = Math.floor(totalSeconds / (24 * 60 * 60));
	const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
	const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

	if (timerFormatting) {
		// Format: "Xd Xh Xm"
		const formatted = `${days}d ${hours}h ${minutes}m`;
		return isNegative ? `- ${formatted}` : formatted;
	} else {
		// Format: "DD:HH:MM" with manual zero-padding
		const paddedDays = days < 10 ? `0${days}` : `${days}`;
		const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
		const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		return `${paddedDays}:${paddedHours}:${paddedMinutes}`;
	}
};

export default convertDurationWithDays;
