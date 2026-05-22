import { type ComputedRef, ref, watch } from 'vue';

/**
 * Tracks whether the receiver's stream has a live video track.
 * Reacts to track additions, unmute, and ended events on the stream.
 * Returns null when stream is absent, video is disabled, or call is on hold.
 */
export function useReceiverLiveStream(
	receiverStream: ComputedRef<MediaStream | null | undefined>,
	videoEnabled: ComputedRef<boolean | undefined>,
	isOnHold: ComputedRef<boolean>,
) {
	const liveStream = ref<MediaStream | null>(null);

	watch(
		[
			receiverStream,
			videoEnabled,
			isOnHold,
		],
		([stream, videoOn, onHold], _, onCleanup) => {
			liveStream.value = null;

			if (!stream || !videoOn || onHold) return;

			const refresh = () => {
				const hasLiveVideo = stream
					.getVideoTracks()
					.some((t) => t.readyState === 'live');
				liveStream.value = hasLiveVideo ? stream : null;
			};

			const onAddTrack = ({ track }: MediaStreamTrackEvent) => {
				if (track.kind === 'video') {
					track.addEventListener('unmute', refresh);
					track.addEventListener('ended', refresh);
				}
				refresh();
			};

			stream.getVideoTracks().forEach((t) => {
				t.addEventListener('unmute', refresh);
				t.addEventListener('ended', refresh);
			});

			stream.addEventListener('addtrack', onAddTrack);

			refresh();

			onCleanup(() => {
				stream.removeEventListener('addtrack', onAddTrack);
				stream.getVideoTracks().forEach((t) => {
					t.removeEventListener('unmute', refresh);
					t.removeEventListener('ended', refresh);
				});
			});
		},
		{
			immediate: true,
		},
	);

	return liveStream;
}
