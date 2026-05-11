/**
 * @author @PalonnyiOleksandr
 *
 * [WETL-9414](https://webitel.atlassian.net/browse/WETL-9414)
 *
 * Polling retry mechanism for media playback inside Document PiP window.
 * Restores streams from snapshot, mutes and plays all media elements until
 * all are ready or the timeout expires. Triggers vidstack playback after an
 * initial delay and re-kicks it periodically when any element stays stalled,
 * throttled to once per 1500 ms to avoid redundant calls.
 */
import type { MediaSnapshot } from '../../types/types';

import { collectMedia, safePlay } from './mediaCollection';
import { requestVidstackPlayback } from './mediaPlayback';
import { restoreStreams } from './mediaSnapshot';

export const createPlaybackRetry = (snapshot: MediaSnapshot[]) => {
	let retryTimer: number | null = null;
	let vidstackDelayTimer: number | null = null;

	const stopPlaybackRetry = () => {
		if (retryTimer !== null) {
			clearInterval(retryTimer);
			retryTimer = null;
		}
		if (vidstackDelayTimer !== null) {
			clearTimeout(vidstackDelayTimer);
			vidstackDelayTimer = null;
		}
	};

	const retryPlayback = (root: Element, durationMs = 10000) => {
		stopPlaybackRetry();
		const started = performance.now();
		let lastVidstackKick = 0;

		vidstackDelayTimer = window.setTimeout(() => {
			vidstackDelayTimer = null;
			requestVidstackPlayback(root);
			lastVidstackKick = performance.now();
		}, 800);

		retryTimer = window.setInterval(() => {
			restoreStreams(snapshot);

			const media = collectMedia(root);
			if (!media.length) return;

			for (const el of media) {
				el.muted = true;
				if (el.paused || el.readyState === 0) safePlay(el);
			}

			const hasStalled = media.some((el) => el.paused || el.readyState === 0);
			const now = performance.now();
			if (hasStalled && now - lastVidstackKick > 1500) {
				requestVidstackPlayback(root);
				lastVidstackKick = now;
			}

			const allReady = media.every((el) => !el.paused && el.readyState > 0);
			if (allReady || now - started > durationMs) {
				stopPlaybackRetry();
			}
		}, 200);
	};

	return {
		retryPlayback,
		stopPlaybackRetry,
	};
};
