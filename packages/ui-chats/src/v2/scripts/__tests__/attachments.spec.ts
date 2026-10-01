import { describe, expect, it } from 'vitest';

import { classifyAttachments, collectGalleryImages } from '../attachments';
import { message } from './fixtures';

describe('classifyAttachments', () => {
	it('splits images, audio/video and other files', () => {
		const result = classifyAttachments(
			message({
				images: [
					{
						id: 'i1',
						url: 'https://x/1.png',
						mime: 'image/png',
					},
				],
				documents: [
					{
						id: 'd1',
						url: 'https://x/a.mp3',
						mime: 'audio/mpeg',
						name: 'a.mp3',
					},
					{
						id: 'd2',
						url: 'https://x/v.mp4',
						mime: 'video/mp4',
						name: 'v.mp4',
					},
					{
						id: 'd3',
						url: 'https://x/r.pdf',
						mime: 'application/pdf',
						name: 'r.pdf',
						size: '2048',
					},
				],
			}),
		);
		expect(result.images.map((i) => i.key)).toEqual([
			'i1',
		]);
		expect(result.media.map((m) => m.kind)).toEqual([
			'audio',
			'video',
		]);
		expect(result.files).toEqual([
			{
				key: 'd3',
				name: 'r.pdf',
				size: '2048',
				mime: 'application/pdf',
				url: 'https://x/r.pdf',
			},
		]);
	});

	it('sends HEIC images to file cards', () => {
		const result = classifyAttachments(
			message({
				images: [
					{
						id: 'i1',
						url: 'https://x/1.heic',
						mime: 'image/heic',
					},
				],
			}),
		);
		expect(result.images).toEqual([]);
		expect(result.files.map((f) => f.key)).toEqual([
			'i1',
		]);
	});
});

describe('classifyAttachments — HEIF', () => {
	it('sends HEIF images to file cards too', () => {
		const result = classifyAttachments(
			message({
				images: [
					{
						id: 'i1',
						url: 'https://x/1.heif',
						mime: 'image/heif',
					},
				],
			}),
		);
		expect(result.images).toEqual([]);
		expect(result.files.map((f) => f.key)).toEqual([
			'i1',
		]);
	});
});

describe('classifyAttachments — file card names for undrawable images', () => {
	const name = (url: string | undefined, mime = 'image/heic') =>
		classifyAttachments(
			message({
				images: [
					{
						id: 'i1',
						url,
						mime,
					},
				],
			}),
		).files[0]?.name;

	it('takes the file name from the URL when it has one', () => {
		expect(name('https://x/storage/IMG_0042.HEIC?sig=abc')).toBe(
			'IMG_0042.HEIC',
		);
		expect(name('https://x/files/my%20photo.heif', 'image/heif')).toBe(
			'my photo.heif',
		);
	});

	// signed storage links often end in an id or an action, not a name
	it('falls back to image.<subtype> when the URL has no file name', () => {
		expect(name('https://x/api/storage/file/123/download?sig=abc')).toBe(
			'image.heic',
		);
		expect(name(undefined, 'image/heif')).toBe('image.heif');
	});
});

describe('collectGalleryImages', () => {
	it('collects drawable images across messages in order, skipping deleted ones', () => {
		const images = collectGalleryImages([
			message({
				images: [
					{
						id: 'a',
						url: 'https://x/a.png',
					},
					{
						id: 'b',
						url: 'https://x/b.heic',
						mime: 'image/heic',
					},
				],
			}),
			message({
				deleted: true,
				images: [
					{
						id: 'c',
						url: 'https://x/c.png',
					},
				],
			}),
			message({
				images: [
					{
						id: 'd',
						url: 'https://x/d.png',
					},
				],
			}),
		]);
		expect(images.map((i) => i.key)).toEqual([
			'a',
			'd',
		]);
	});
});
