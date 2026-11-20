import { mount } from '@vue/test-utils';
import { computed, defineComponent, h, ref } from 'vue';

import { useCallWaveComments } from '../useCallWaveComments';

const regionsMock = ({ draftRange = null } = {}) => ({
	rangeEditComment: ref(null),
	getDraftRange: () => draftRange,
	getRangeEditValue: () => null,
	clearDraftSelectionRegions: vi.fn(),
	stopRangeEdit: vi.fn(),
});

const setupComments = (regions) => {
	let comments;
	mount(
		defineComponent({
			setup() {
				comments = useCallWaveComments({
					callId: 'call-id',
					currentFileId: computed(() => 'file-id'),
					annotations: ref([]),
					updateAnnotations: vi.fn(),
					getPlayer: () => ({
						getCurrentTime: () => 12.4,
						getDuration: () => 99.6,
					}),
					regions,
				});
				return () => h('div');
			},
		}),
	);
	return comments;
};

describe('useCallWaveComments', () => {
	it('opens "Add note" at the playback cursor when nothing is selected', () => {
		const comments = setupComments(regionsMock());
		comments.openAddNote();
		expect(comments.newComment.value).toEqual({
			fileId: 'file-id',
			startSec: '12',
			endSec: '12',
			note: '',
		});
	});

	it('opens "Add note" with the range selected on the waveform', () => {
		const comments = setupComments(
			regionsMock({
				draftRange: {
					startSec: 25,
					endSec: 39,
				},
			}),
		);
		comments.openAddNote();
		expect(comments.newComment.value).toMatchObject({
			startSec: '25',
			endSec: '39',
		});
	});

	it('clears the selection when "Add note" is closed', () => {
		const regions = regionsMock();
		const comments = setupComments(regions);
		comments.openAddNote();
		comments.closeAddNote();
		expect(comments.newComment.value).toBe(null);
		expect(regions.clearDraftSelectionRegions).toHaveBeenCalled();
	});

	it('rounds the call duration for the form limits', () => {
		const comments = setupComments(regionsMock());
		expect(comments.getCallDurationSec()).toBe(100);
	});
});
