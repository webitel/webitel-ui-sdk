/**
 * @author @PalonnyiOleksandr
 *
 * [WETL-9414](https://webitel.atlassian.net/browse/WETL-9414)
 *
 * Snapshot utilities for media elements inside Document PiP window.
 * `snapshotMedia` captures current muted state and srcObject of all media
 * elements, then forces mute to prevent autoplay policy violations.
 * `restoreMedia` reverts muted state and re-attaches lost streams.
 * `restoreStreams` re-attaches srcObject without touching muted state,
 * used during playback retry polling.
 */
import type { MediaSnapshot } from '../../types/types';

import { collectMedia } from './mediaCollection';

export const snapshotMedia = (root: Element, snapshot: MediaSnapshot[]) => {
	const items = collectMedia(root).map((el) => ({
		el,
		muted: el.muted,
		srcObject: el.srcObject instanceof MediaStream ? el.srcObject : null,
	}));
	snapshot.splice(0, snapshot.length, ...items);
	for (const { el } of snapshot) {
		el.muted = true;
		el.setAttribute('muted', '');
		el.defaultMuted = true;
	}
};

export const restoreMedia = (snapshot: MediaSnapshot[]) => {
	for (const { el, muted, srcObject } of snapshot) {
		el.muted = muted;
		if (!el.srcObject && srcObject) el.srcObject = srcObject;
	}
	snapshot.splice(0);
};

export const restoreStreams = (snapshot: MediaSnapshot[]) => {
	for (const { el, srcObject } of snapshot) {
		if (!el.srcObject && srcObject) el.srcObject = srcObject;
	}
};
