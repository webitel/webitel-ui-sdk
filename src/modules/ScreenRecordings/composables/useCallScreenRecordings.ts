import { FileServicesAPI } from '@webitel/api-services/api';
import type { StorageFile } from '@webitel/api-services/gen/models';
import {
	SearchScreenRecordingsByCallChannel,
	SearchScreenRecordingsByCallType,
} from '@webitel/api-services/gen/models';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

interface UseCallScreenRecordingsOptions {
	callId: Readonly<Ref<string>>;
}

export function useCallScreenRecordings({
	callId,
}: UseCallScreenRecordingsOptions) {
	const dataList = ref<StorageFile[]>([]);
	const isLoading = ref(false);

	const selected = ref<StorageFile[]>([]);

	const loadDataList = async () => {
		if (!callId.value) {
			dataList.value = [];
			return;
		}

		isLoading.value = true;

		try {
			const { items } = await FileServicesAPI.getScreenRecordingsByCall({
				callId: callId.value,
				type: SearchScreenRecordingsByCallType.Screensharing,
				channel: SearchScreenRecordingsByCallChannel.Screenrecording,
				size: 100,
				fields: [
					'name',
					'uploaded_at',
					'properties',
				],
			});

			dataList.value = items;
			selected.value = items.filter((item: StorageFile) =>
				selected.value.some(({ id }) => id === item.id),
			);
		} catch {
			dataList.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	const deleteRecordings = async (items: StorageFile[]) => {
		const deleteIds = items.reduce<string[]>((ids, { id }) => {
			if (id) ids.push(id);
			return ids;
		}, []);

		try {
			await FileServicesAPI.delete(deleteIds);
		} finally {
			await loadDataList();
		}
	};

	watch(callId, loadDataList, {
		immediate: true,
	});

	return {
		dataList,
		isLoading,
		selected,
		loadDataList,
		deleteRecordings,
	};
}
