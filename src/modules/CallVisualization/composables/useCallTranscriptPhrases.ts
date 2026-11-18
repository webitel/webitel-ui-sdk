import { CallTranscriptAPI } from '@webitel/api-services/api';
import type { MaybeRefOrGetter } from 'vue';
import { computed, ref, toValue, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type {
	CallTranscriptCall,
	CallTranscriptItem,
	CallTranscriptPhrase,
	CallTranscriptRow,
} from '../types/callTranscript';

interface UseCallTranscriptPhrasesOptions {
	call: MaybeRefOrGetter<CallTranscriptCall>;
	transcript: MaybeRefOrGetter<CallTranscriptItem | undefined | null>;
}

export function useCallTranscriptPhrases({
	call,
	transcript,
}: UseCallTranscriptPhrasesOptions) {
	const { t } = useI18n();

	const phrases = ref<CallTranscriptPhrase[]>([]);
	const isLoading = ref(false);

	const headers = computed(() => [
		{
			value: 'time',
			text: t('vocabulary.time'),
			width: '120px',
		},
		{
			value: 'channel',
			text: t('vocabulary.channel'),
			width: '140px',
		},
		{
			value: 'phrase',
			text: t('vocabulary.text'),
		},
	]);

	const rows = computed<CallTranscriptRow[]>(() => {
		const { from, to } = toValue(call);
		return phrases.value.map(({ startSec, endSec, phrase, channel }) => ({
			time: `${startSec} - ${endSec}`,
			channel: channel
				? to?.name || to?.number || to?.destination || 1
				: from?.name || from?.number || from?.destination || 0,
			phrase,
		}));
	});

	async function loadCallTranscript() {
		try {
			isLoading.value = true;
			const transcriptId = toValue(transcript)?.id;
			if (transcriptId) {
				phrases.value = await CallTranscriptAPI.get({
					id: transcriptId,
				});
			}
		} finally {
			isLoading.value = false;
		}
	}

	function resetCallTranscript() {
		phrases.value = [];
	}

	watch(
		() => toValue(transcript),
		(value) => {
			if (value) return loadCallTranscript();
			return resetCallTranscript();
		},
		{
			immediate: true,
		},
	);

	return {
		phrases,
		isLoading,
		headers,
		rows,
	};
}
