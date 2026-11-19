import { mount } from '@vue/test-utils';
import { CallTranscriptAPI } from '@webitel/api-services/api';
import { defineComponent, h, nextTick, ref } from 'vue';

import { useCallTranscriptPhrases } from '../useCallTranscriptPhrases';

vi.mock('@webitel/api-services/api', () => ({
	CallTranscriptAPI: {
		get: vi.fn(),
	},
}));

const setupPhrases = ({ call = {}, transcript = null } = {}) => {
	const callRef = ref(call);
	const transcriptRef = ref(transcript);
	let phrases;
	mount(
		defineComponent({
			setup() {
				phrases = useCallTranscriptPhrases({
					call: callRef,
					transcript: transcriptRef,
				});
				return () => h('div');
			},
		}),
	);
	return {
		...phrases,
		transcriptRef,
	};
};

describe('useCallTranscriptPhrases', () => {
	beforeEach(() => {
		vi.mocked(CallTranscriptAPI.get).mockReset();
		vi.mocked(CallTranscriptAPI.get).mockResolvedValue([]);
	});

	it('calls getTranscript api if there is a transcript', async () => {
		setupPhrases({
			transcript: {
				id: 'jest',
			},
		});
		await nextTick();
		expect(CallTranscriptAPI.get).toHaveBeenCalledWith({
			id: 'jest',
		});
	});

	it('does not call getTranscript api if there is no transcript', async () => {
		setupPhrases();
		await nextTick();
		expect(CallTranscriptAPI.get).not.toHaveBeenCalled();
	});

	it('correctly computes rows from phrases', () => {
		const { phrases, rows } = setupPhrases({
			call: {
				from: {
					name: 'jest1',
				},
				to: {
					name: 'jest2',
				},
			},
		});
		phrases.value = [
			{
				startSec: 1,
				endSec: 2,
				phrase: 'lorem',
				channel: 0,
			},
			{
				startSec: 2,
				endSec: 3,
				phrase: 'ipsum',
				channel: 1,
			},
		];
		expect(rows.value).toEqual([
			{
				time: '1 - 2',
				startSec: 1,
				endSec: 2,
				phrase: 'lorem',
				channel: 'jest1',
			},
			{
				time: '2 - 3',
				startSec: 2,
				endSec: 3,
				phrase: 'ipsum',
				channel: 'jest2',
			},
		]);
	});

	it('reset phrases if call transcript is removed', async () => {
		const { phrases, transcriptRef } = setupPhrases({
			transcript: {
				id: 'jest',
			},
		});
		await nextTick();
		phrases.value = [
			1,
			2,
			3,
		];
		transcriptRef.value = null;
		await nextTick();
		expect(phrases.value).toEqual([]);
	});
});
