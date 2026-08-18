import { computed, type MaybeRef, unref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { WtTableHeader } from '../../../wt-table/types/WtTable';

export const useWtTable = ({
	headers,
}: {
	headers: MaybeRef<WtTableHeader[] | undefined>;
}) => {
	const { t } = useI18n();

	const tableHeaders = computed<WtTableHeader[]>(() => {
		return (unref(headers) ?? [])
			.filter(
				(header: WtTableHeader) => header.show === undefined || header.show,
			)
			.map((header: WtTableHeader) => {
				if (!header.text && header.locale) {
					const translate = t as (key: string, ...args: unknown[]) => string;
					return {
						...header,
						text:
							typeof header.locale === 'string'
								? translate(header.locale)
								: translate(
										String(header.locale[0]),
										...header.locale.slice(1),
									),
					};
				}
				return header;
			});
	});

	return {
		tableHeaders,
	};
};
