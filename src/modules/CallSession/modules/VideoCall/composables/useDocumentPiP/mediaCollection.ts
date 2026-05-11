import { walkElementTree } from './domTraversal';

export const safePlay = (el: HTMLMediaElement) => {
	void el.play().catch(() => {});
};

export const collectMedia = (root: Element): HTMLMediaElement[] => {
	const list: HTMLMediaElement[] = [];
	walkElementTree(root, (el) => {
		if (el instanceof HTMLMediaElement) list.push(el);
	});
	return list;
};
