import type { WtTableHeader } from '../../../components/wt-table/types/WtTable';

export const headers: WtTableHeader[] = [
	{
		value: 'screenRecordings',
		show: true,
		locale: [
			'objects.screenRecordings',
			2,
		],
		sort: null,
		field: 'screen_recordings',
	},
	{
		value: 'name',
		show: true,
		locale: 'reusable.name',
		sort: null,
		field: 'name',
	},
	{
		value: 'dateTime',
		show: true,
		locale: 'reusable.dateTime',
		sort: null,
		field: 'date_time',
	},
	{
		value: 'recordingDuration',
		show: true,
		locale: 'vocabulary.duration',
		sort: null,
		field: 'recording_duration',
	},
];
