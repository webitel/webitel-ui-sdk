import { shallowMount } from '@vue/test-utils';

import WtPlayer from '../wt-player.vue';

describe('WtPlayer', () => {
	it.skip('renders a component', () => {
		const wrapper = shallowMount(WtPlayer);
		expect(wrapper.classes('wt-player')).toBe(true);
	});

	describe('download button', () => {
		let clicks;

		const mountPlayer = (src) =>
			shallowMount(WtPlayer, {
				props: {
					src: {
						src,
						type: 'audio/mpeg',
					},
					fileName: 'record',
					autoplay: false,
				},
			});

		beforeEach(() => {
			clicks = [];
			vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
				function () {
					clicks.push({
						href: this.getAttribute('href'),
						download: this.download,
					});
				},
			);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('downloads from a safe source', async () => {
			const wrapper = mountPlayer('/api/storage/file/1/stream');

			await wrapper.find('.download-button').trigger('click');

			expect(clicks).toEqual([
				{
					href: '/api/storage/file/1/download',
					download: 'record.mpeg',
				},
			]);
		});

		it.each([
			'javascript:alert(1)',
			'data:text/html,<script>alert(1)</script>',
		])('does not click anything for %s', async (src) => {
			const wrapper = mountPlayer(src);

			await wrapper.find('.download-button').trigger('click');

			expect(clicks).toEqual([]);
		});
	});
});
