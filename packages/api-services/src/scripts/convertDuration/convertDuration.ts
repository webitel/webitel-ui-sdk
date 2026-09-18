/*
 * @author @Lera
 * fixme: change on library
 *  https://webitel.atlassian.net/browse/WTEL-7842?focusedCommentId=702198
 * */

export interface ConvertDurationOptions {
	/**
	 * Keep the hours segment when the duration is under an hour.
	 *
	 * `true` (the default) preserves the long-standing `HH:MM:SS` output, which
	 * live timers rely on to stay a fixed width as they tick past an hour.
	 * `false` yields `MM:SS` below an hour and `HH:MM:SS` above it — for compact
	 * places where a leading `00:` is noise.
	 */
	alwaysShowHours?: boolean;
}

const pad = (value: number) => `${value}`.padStart(2, '0');

const convertDuration = (
	duration: number,
	{ alwaysShowHours = true }: ConvertDurationOptions = {},
) => {
	if (!duration) return alwaysShowHours ? '00:00:00' : '00:00';

	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = Math.floor((duration % 3600) % 60);

	const time = `${pad(minutes)}:${pad(seconds)}`;

	return alwaysShowHours || hours > 0 ? `${pad(hours)}:${time}` : time;
};

export default convertDuration;
