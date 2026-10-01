import type { ChatDocument, ChatImage, MessageModel } from '../types';

export interface ChatFileCard {
	key: string;
	name: string;
	size?: string;
	mime?: string;
	url?: string;
}

export interface ClassifiedAttachments {
	images: Array<{
		key: string;
		image: ChatImage;
	}>;
	media: Array<{
		key: string;
		document: ChatDocument;
		kind: 'audio' | 'video';
	}>;
	files: ChatFileCard[];
}

export interface GalleryImage {
	key: string;
	src: string;
}

export const imageKey = (
	message: MessageModel,
	image: ChatImage,
	index: number,
): string => image.id ?? `${message.id}-image-${index}`;

const documentKey = (
	message: MessageModel,
	document: ChatDocument,
	index: number,
): string => document.id ?? `${message.id}-document-${index}`;

/** Most browsers cannot draw HEIC / HEIF; those go out as file cards. */
const UNDRAWABLE_IMAGE_MIME = /hei[cf]/i;

export const isRenderableImage = (image: ChatImage): boolean =>
	!!image.url && !UNDRAWABLE_IMAGE_MIME.test(image.mime ?? '');

const mediaKind = (mime: string | undefined): 'audio' | 'video' | null => {
	const value = mime?.toLowerCase() ?? '';
	if (value.startsWith('audio/')) return 'audio';
	if (value.startsWith('video/')) return 'video';
	return null;
};

export const hasAttachments = (message: MessageModel): boolean =>
	!!(message.images?.length || message.documents?.length);

export const classifyAttachments = (
	message: MessageModel,
): ClassifiedAttachments => {
	const result: ClassifiedAttachments = {
		images: [],
		media: [],
		files: [],
	};

	(message.images ?? []).forEach((image, index) => {
		const key = imageKey(message, image, index);
		if (isRenderableImage(image)) {
			result.images.push({
				key,
				image,
			});
		} else {
			result.files.push({
				key,
				name: image.mime ?? '',
				mime: image.mime,
				url: image.url,
			});
		}
	});

	(message.documents ?? []).forEach((document, index) => {
		const key = documentKey(message, document, index);
		const kind = document.url ? mediaKind(document.mime) : null;
		if (kind) {
			result.media.push({
				key,
				document,
				kind,
			});
		} else {
			result.files.push({
				key,
				name: document.name ?? '',
				size: document.size,
				mime: document.mime,
				url: document.url,
			});
		}
	});

	return result;
};

/** Every drawable image across the history, in history order. */
export const collectGalleryImages = (
	messages: readonly MessageModel[],
): GalleryImage[] =>
	messages.flatMap((message) =>
		message.deleted
			? []
			: (message.images ?? []).flatMap((image, index) =>
					isRenderableImage(image)
						? [
								{
									key: imageKey(message, image, index),
									src: image.url as string,
								},
							]
						: [],
				),
	);
