import { readFileSync } from 'node:fs';
import { config } from '@vue/test-utils';

import i18n from '../../src/locale/i18n.js';
import axiosMock from '../../src/tests/mocks/axiosMock';

config.global.plugins = [
	i18n,
];

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

// The install plugin pulls every component into this spec's module graph, which
// costs seconds per file. Only specs that mount something need it, and every one
// of those imports @vue/test-utils — so the rest skip it.
const testPath = expect.getState().testPath ?? '';

if (testPath && readFileSync(testPath, 'utf8').includes('@vue/test-utils')) {
	const { default: WebitelUi } = await import('../../src/install.ts');

	config.global.plugins.unshift([
		WebitelUi,
		{},
	]);

	vi.doMock('axios', axiosMock());
}
