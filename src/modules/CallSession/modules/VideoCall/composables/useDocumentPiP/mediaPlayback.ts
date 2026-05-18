import { MediaRemoteControl } from 'vidstack';

import type { MediaSnapshot } from '../../types/types';
import { domTraversal } from './domTraversal';
import { collectMedia, safePlay } from './mediaCollection';
import { restoreStreams } from './mediaSnapshot';

export const requestVidstackPlayback = (root: Element) => {
	domTraversal(root, (el) => {
		if (el.tagName.toLowerCase() !== 'media-player') return;
		const remote = new MediaRemoteControl();
		remote.setTarget(el);
		remote.mute();
		remote.play();
	});
};

export const resumePlayback = (root: Element, snapshot: MediaSnapshot[]) => {
	restoreStreams(snapshot);
	collectMedia(root).forEach(safePlay);
	requestVidstackPlayback(root);
};
