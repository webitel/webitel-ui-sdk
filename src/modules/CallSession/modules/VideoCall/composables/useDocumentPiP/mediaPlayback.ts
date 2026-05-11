import { MediaRemoteControl } from 'vidstack';

import type { MediaSnapshot } from '../../types/types';

import { collectMedia, safePlay } from './mediaCollection';
import { walkElementTree } from './domTraversal';
import { restoreStreams } from './mediaSnapshot';

export const requestVidstackPlayback = (root: Element) => {
	walkElementTree(root, (el) => {
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
