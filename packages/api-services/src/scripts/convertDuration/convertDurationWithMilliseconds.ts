import convertDuration from './convertDuration';

/**
 * [Claude] A duration given in milliseconds, as `HH:MM:SS.mmm`. A missing or
 * invalid one (e.g. a run that has not stopped yet) shows as zero.
 */
const convertDurationWithMilliseconds = (duration?: number) => {
	const milliseconds = Number.isFinite(duration)
		? Math.max(0, Math.floor(duration as number))
		: 0;

	const time = convertDuration(Math.floor(milliseconds / 1000));
	const rest = `${milliseconds % 1000}`.padStart(3, '0');

	return `${time}.${rest}`;
};

export default convertDurationWithMilliseconds;
