import { getCallMediaUrl } from '@webitel/api-services/api';
import type { EngineCallFile } from '@webitel/api-services/gen/models';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import type { AudioSrc, VideoSrc } from 'vidstack';
import { ref } from 'vue';
import { getMediaUrlAuth } from '../../scripts/file/storageFile/getMediaUrlAuth';

export const usePlayMedia = () => {
	const audioData = ref<
		EngineCallFile & {
			src: AudioSrc;
		}
	>();
	const videoData = ref<
		EngineCallFile & {
			src: VideoSrc;
			text?: string;
		}
	>();

	const currentlyMediaPlaying = ref('0');
	const isMediaPlayingNow = ref(false);

	const play = (
		mediaFile: EngineCallFile & {
			text?: string;
		},
	) => {
		if (mediaFile.id) {
			currentlyMediaPlaying.value = mediaFile.id;
			if (mediaFile.type === EngineCallFileType.FileTypeAudio) {
				resetVideo();
				playAudio(mediaFile);
			} else {
				resetAudio();
				playVideo(mediaFile);
			}
		} else {
			closePlayer();
		}
	};

	const buildMediaSrc = (mediaFile: EngineCallFile) => ({
		src: getCallMediaUrl(mediaFile.id as string, {
			auth: getMediaUrlAuth(),
		}),
		type: mediaFile.mimeType,
	});

	function playAudio(mediaFile: EngineCallFile) {
		audioData.value = {
			...mediaFile,
			src: buildMediaSrc(mediaFile) as AudioSrc,
		};
	}

	function playVideo(
		mediaFile: EngineCallFile & {
			text?: string;
		},
	) {
		videoData.value = {
			...mediaFile,
			src: buildMediaSrc(mediaFile) as VideoSrc,
		};
	}

	function closePlayer() {
		resetAudio();
		resetVideo();
		isMediaPlayingNow.value = false;
		currentlyMediaPlaying.value = '0';
	}

	function resetAudio() {
		audioData.value = undefined;
	}

	function resetVideo() {
		videoData.value = undefined;
	}

	return {
		audioData,
		videoData,
		currentlyMediaPlaying,
		isMediaPlayingNow,

		play,
		closePlayer,
	};
};
