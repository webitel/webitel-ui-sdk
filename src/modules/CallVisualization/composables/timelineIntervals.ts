import type TimelinePlugin from 'wavesurfer.js/plugins/timeline';
import type { TimelinePluginOptions } from 'wavesurfer.js/plugins/timeline';

// Min horizontal space (px) between HH:MM:SS labels on the waveform timeline.
const MIN_LABEL_SPACING_PX = 96;

type TimelineIntervalOptions = Pick<
	TimelinePluginOptions,
	'timeInterval' | 'primaryLabelInterval' | 'secondaryLabelInterval'
>;

// TimelinePlugin.options is protected but read on each redraw.
function getMutableTimelineOptions(
	plugin: TimelinePlugin,
): TimelineIntervalOptions {
	return (
		plugin as unknown as {
			options: TimelineIntervalOptions;
		}
	).options;
}

// Seconds between timeline labels for a given zoom level (px/s).
export function getTimelineLabelIntervalSec(pxPerSec: number): number {
	if (pxPerSec <= 0) {
		return 1;
	}

	const minSeconds = Math.ceil(MIN_LABEL_SPACING_PX / pxPerSec);
	return minSeconds <= 60 ? minSeconds : Math.ceil(minSeconds / 60) * 60;
}

export function applyTimelineIntervals(
	timelinePlugin: TimelinePlugin,
	pxPerSec: number,
) {
	const intervalSec = getTimelineLabelIntervalSec(pxPerSec);
	const options = getMutableTimelineOptions(timelinePlugin);

	options.timeInterval = intervalSec;
	options.primaryLabelInterval = intervalSec;
	options.secondaryLabelInterval = intervalSec;
}
