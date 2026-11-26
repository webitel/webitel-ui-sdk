import { shallowMount } from '@vue/test-utils';
import { CallTranscriptAPI } from '@webitel/api-services/api';

import CallTranscript from '../call-transcript.vue';

vi.mock('@webitel/api-services/api', () => ({
	CallTranscriptAPI: {
		get: vi.fn(),
		delete: vi.fn(),
	},
}));

let call;
let file;

describe('CallTranscript', () => {
	beforeEach(() => {
		vi.mocked(CallTranscriptAPI.get).mockResolvedValue([]);
		file = {
			id: 1,
		};
		call = {
			files: [
				file,
			],
		};
	});

	it('renders a component', () => {
		const wrapper = shallowMount(CallTranscript, {
			props: {
				call,
				file,
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('deleteTranscript calls delete api and emits deleted transcript', async () => {
		file = {
			id: 'jest',
		};
		call.transcripts = [
			file,
		];
		const wrapper = shallowMount(CallTranscript, {
			props: {
				call,
				file,
			},
		});
		await wrapper.vm.handleDeleteTranscript();
		expect(CallTranscriptAPI.delete).toHaveBeenCalledWith({
			fileId: 'jest',
		});
		expect(wrapper.emitted('deleted')).toEqual([
			[
				file,
			],
		]);
	});
});
