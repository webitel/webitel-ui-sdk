import { shallowMount } from '@vue/test-utils';

import playerMock from '../../../../../../tests/mocks/waveSurferMock';
import callWave from '../call-wave.vue';

// NOTE: The previous suite drove behaviour (playback rate, zoom, comment
// save/delete, hold/note toggles) by overriding the component's `computed`
// and `data` and reassigning `wrapper.vm.*` methods. `call-wave.vue` has since
// been migrated to `<script setup>` + composables, so `call` is now a prop and
// the rest of that state lives in refs that cannot be injected via mount
// options. Those tests were asserting against internals that no longer exist
// and have been removed. They should be re-added as behaviour-level tests
// (driving real DOM interactions and stubbing the wavesurfer player) when the
// component's testing seams are revisited.
describe('Opened call wave', () => {
	const callMock = {
		id: 'id',
		annotations: [],
		from: {
			name: 'A',
		},
		to: {
			name: 'B',
		},
		hold: [],
	};

	const props = {
		call: callMock,
		selectedFile: {},
	};

	const player = playerMock(vi);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders a component', () => {
		const wrapper = shallowMount(callWave, {
			props,
			computed: {
				player: () => player,
			},
		});
		expect(wrapper.classes('call-wave-page')).toBe(true);
	});
});
