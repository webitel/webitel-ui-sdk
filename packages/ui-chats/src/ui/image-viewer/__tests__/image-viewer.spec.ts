import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ImageViewer from '../image-viewer.vue';

const imgSrc = (url: string) =>
	mount(ImageViewer, {
		props: {
			media: {
				id: 'i1',
				url,
			},
		},
	})
		.find('img')
		.attributes('src');

describe('ImageViewer', () => {
	it('shows a safe url', () => {
		expect(imgSrc('https://example.test/1.png')).toBe(
			'https://example.test/1.png',
		);
	});

	it('leaves the image without a src for an unsafe url', () => {
		expect(imgSrc('javascript:alert(1)')).toBeUndefined();
	});
});
