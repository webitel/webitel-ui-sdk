import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

import { useScrollToBottomBtn } from '../useScrollToBottomBtn';

const scroller = ({
	scrollTop,
	scrollHeight = 3000,
	clientHeight = 500,
}: {
	scrollTop: number;
	scrollHeight?: number;
	clientHeight?: number;
}) =>
	({
		scrollTop,
		scrollHeight,
		clientHeight,
	}) as HTMLElement;

describe('useScrollToBottomBtn', () => {
	it('shows once the reader is further from the bottom than the threshold', () => {
		const { showScrollToBottomBtn, updateScrollToBottomBtnVisibility } =
			useScrollToBottomBtn(ref(null), {
				bottom: false,
			} as never);

		updateScrollToBottomBtnVisibility(
			scroller({
				scrollTop: 0,
			}),
		);
		expect(showScrollToBottomBtn.value).toBe(true);

		updateScrollToBottomBtnVisibility(
			scroller({
				scrollTop: 2500,
			}),
		);
		expect(showScrollToBottomBtn.value).toBe(false);
	});
});
