import { config } from '@vue/test-utils';

import WebitelUi from '../../src/install.ts';
import i18n from '../../src/locale/i18n.js';
import axiosMock from '../../src/tests/mocks/axiosMock';

config.global.plugins = [
	[
		WebitelUi,
		{},
	],
	i18n,
];

vi.doMock('axios', axiosMock());

// Mock @morev/vue-transitions to avoid runtime render issues in tests
vi.mock('@morev/vue-transitions', () => {
	// Provide simple functional components that render their default slot
	const SimpleTransition = {
		name: 'SimpleTransition',
		props: [
			'offset',
			'name',
			'mode',
		],
		setup(_, { slots }) {
			return () => (slots.default ? slots.default() : null);
		},
	};

	return {
		TransitionSlide: SimpleTransition,
		TransitionCSSMotion: SimpleTransition,
	};
});
