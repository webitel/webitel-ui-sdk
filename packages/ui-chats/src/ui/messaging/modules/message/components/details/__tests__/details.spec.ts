import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ChatMessageDocument from '../chat-message-document.vue';
import ChatMessageImage from '../chat-message-image.vue';
import ChatMessagePlayer from '../chat-message-player.vue';

vi.mock('@webitel/ui-sdk/components', async (importOriginal) => ({
	...(await importOriginal<typeof import('@webitel/ui-sdk/components')>()),
	WtPlayer: {
		name: 'WtPlayer',
		props: [
			'src',
		],
		template: '<div class="player-stub" />',
	},
	WtVidstackPlayer: {
		name: 'WtVidstackPlayer',
		props: [
			'src',
		],
		template: '<div class="player-stub" />',
	},
}));

const SAFE_URL = 'https://example.test/storage/file/1/download';
const UNSAFE_URL = 'javascript:alert(1)';

describe('ChatMessageDocument', () => {
	const clicked: HTMLAnchorElement[] = [];

	afterEach(() => {
		clicked.length = 0;
		vi.restoreAllMocks();
	});

	const clickDocument = async (url: string) => {
		vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
			this: HTMLAnchorElement,
		) {
			clicked.push(this);
		});
		const wrapper = mount(ChatMessageDocument, {
			props: {
				file: {
					id: 'd1',
					name: 'report.pdf',
					url,
				},
			},
			global: {
				stubs: {
					WtIcon: true,
				},
			},
		});
		await wrapper.trigger('click');
	};

	it('downloads a safe url', async () => {
		await clickDocument(SAFE_URL);

		expect(clicked).toHaveLength(1);
		expect(clicked[0].href).toBe(SAFE_URL);
		expect(clicked[0].rel).toBe('noopener noreferrer');
		expect(clicked[0].download).toBe('report.pdf');
	});

	it('does nothing for an unsafe url', async () => {
		await clickDocument(UNSAFE_URL);

		expect(clicked).toEqual([]);
	});
});

describe('ChatMessageImage', () => {
	const imgSrc = (url: string) =>
		mount(ChatMessageImage, {
			props: {
				file: {
					id: 'i1',
					url,
				},
			},
		})
			.find('img')
			.attributes('src');

	it('shows a safe url', () => {
		expect(imgSrc(SAFE_URL)).toBe(SAFE_URL);
	});

	it('leaves the image without a src for an unsafe url', () => {
		expect(imgSrc(UNSAFE_URL)).toBeUndefined();
	});
});

describe('ChatMessagePlayer', () => {
	const playerSrc = (url: string) =>
		mount(ChatMessagePlayer, {
			props: {
				file: {
					id: 'a1',
					url,
				},
				type: 'audio/mpeg',
			},
		})
			.findComponent({
				name: 'WtPlayer',
			})
			.props('src');

	it('plays a safe url with its type', () => {
		expect(playerSrc(SAFE_URL)).toEqual({
			src: SAFE_URL,
			type: 'audio/mpeg',
		});
	});

	it.each([
		UNSAFE_URL,
		'https://example.test/live.m3u8',
	])('gives the player an empty source for %s', (url) => {
		expect(playerSrc(url)).toEqual({
			src: '',
			type: 'audio/mpeg',
		});
	});
});
