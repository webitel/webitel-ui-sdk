/**
 * @author @PalonnyiOleksandr
 *
 * [WETL-9414](https://webitel.atlassian.net/browse/WETL-9414)
 *
 * Polling retry mechanism for media playback inside Document PiP window.
 * Restores streams from snapshot, mutes and plays all media elements until
 * all are ready or the timeout expires. Also triggers vidstack playback
 * after a short delay to handle internal player initialization.
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

		vidstackDelayTimer = window.setTimeout(() => {
			vidstackDelayTimer = null;
			requestVidstackPlayback(root);
		}, 800);

		retryTimer = window.setInterval(() => {
			restoreStreams(snapshot);

			const media = collectMedia(root);
			if (!media.length) return;

			for (const el of media) {
				el.muted = true;
				if (el.paused || el.readyState === 0) safePlay(el);
			}

			const allReady = media.every((el) => !el.paused && el.readyState > 0);
			if (allReady || performance.now() - started > durationMs) {
				stopPlaybackRetry();
			}
		}, 200);
	};

	return {
		retryPlayback,
		stopPlaybackRetry,
	};
};
