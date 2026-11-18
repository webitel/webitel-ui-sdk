import { describe, expect, it, vi } from 'vitest';

import { message } from '../../../../scripts/__tests__/fixtures';
import type { ChatDocument } from '../../../../types';
import { mountWithChats } from '../../../__tests__/mountWithChats';
import MessageAttachments from '../message-attachments.vue';

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

const setup = (document: ChatDocument) =>
	mountWithChats(MessageAttachments, {
		props: {
			message: message({
				documents: [
					document,
				],
			}),
		},
	});

describe('MessageAttachments', () => {
	it('gives the audio player a safe url with its type', () => {
		const url = 'https://example.test/a.mp3';
		const wrapper = setup({
			id: 'd1',
			url,
			mime: 'audio/mpeg',
			name: 'a.mp3',
		});

		expect(
			wrapper
				.findComponent({
					name: 'WtPlayer',
				})
				.props('src'),
		).toEqual({
			src: url,
			type: 'audio/mpeg',
		});
	});

	it('shows a stream manifest as a download link, not a player', () => {
		const url = 'https://example.test/live.m3u8';
		const wrapper = setup({
			id: 'd1',
			url,
			mime: 'audio/mpeg',
			name: 'live.m3u8',
		});

		expect(wrapper.find('.player-stub').exists()).toBe(false);
		expect(wrapper.find('.message-attachments__file').attributes('href')).toBe(
			url,
		);
	});
});
