import { mount, shallowMount } from '@vue/test-utils';
import { CallTranscriptAPI } from '@webitel/api-services/api';
import {
	EngineCallFileType,
	EngineHistoryFileJobHistoryFileJobState,
} from '@webitel/api-services/gen/models';
import { nextTick } from 'vue';

import CallNoTranscript from '../call-no-transcript.vue';

vi.mock('@webitel/api-services/api', () => ({
	CallTranscriptAPI: {
		create: vi.fn(),
	},
}));

let call;
let file;

const mountComponent = (mountFn = shallowMount) =>
	mountFn(CallNoTranscript, {
		props: {
			call,
			file,
		},
	});

describe('CallNoTranscript', () => {
	beforeEach(() => {
		vi.mocked(CallTranscriptAPI.create).mockReset();
		file = {
			id: 1,
		};
		call = {
			files: {
				[EngineCallFileType.FileTypeAudio]: [
					file,
				],
			},
		};
	});

	it('renders a component', () => {
		const wrapper = mountComponent();
		expect(wrapper.isVisible()).toBe(true);
	});

	it('falsy fileJob computed, if call has no filesJob', () => {
		const wrapper = mountComponent();
		expect(wrapper.vm.fileJob).toBeFalsy();
	});

	it('correctly computes fileJob from call.filesJob', () => {
		const fileJob = {
			fileId: 'jst',
		};
		call.filesJob = [
			fileJob,
		];
		file.id = 'jst';
		const wrapper = mountComponent();
		expect(wrapper.vm.fileJob).toStrictEqual(fileJob);
	});

	it('"transcribe" btn click calls "create" api method with file id and emits refresh', async () => {
		file.id = 'jest';
		const wrapper = mountComponent(mount);

		const btn = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(btn.text().includes('Transcribe')).toBe(true);

		btn.vm.$emit('click');
		await nextTick();
		expect(CallTranscriptAPI.create).toHaveBeenCalledWith({
			fileId: 'jest',
		});
		expect(wrapper.emitted('refresh')).toBeTruthy();
	});

	it('error state retry calls "create" api method', () => {
		file.id = 1;
		call.filesJob = [
			{
				fileId: 1,
				state: EngineHistoryFileJobHistoryFileJobState.Error,
			},
		];
		const wrapper = mountComponent(mount);

		const btn = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(btn.text().includes('Retry')).toBe(true);

		btn.vm.$emit('click');
		expect(CallTranscriptAPI.create).toHaveBeenCalledWith({
			fileId: 1,
		});
	});
});
