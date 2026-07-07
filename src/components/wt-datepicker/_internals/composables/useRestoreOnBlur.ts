import { nextTick, type WritableComputedRef, watch } from 'vue';

/**
 * @author @HlukhovYe
 *
 * https://webitel.atlassian.net/browse/WTEL-9880
 *
 * When the datepicker is not clearable, set current date value on blur
 * if the user left the field empty or typed an invalid date.
 *
 * Since the parent model never becomes null (null writes are blocked in the
 * modelValue setter), PrimeVue's watcher won't re-fire on restore. Instead we
 * call PrimeVue's internal updateModel() directly so it resyncs rawValue and
 * redraws the input.
 */
export function useRestoreOnBlur(
	getDatepicker: () => {
		rawValue: Date | null;
		updateModel: (v: Date) => void;
	} | null,
	isClearable: () => boolean,
) {
	function onBlur() {
		if (isClearable()) return;
		const datePickerEl = getDatepicker();
		if (!datePickerEl) return;
		if (datePickerEl.rawValue === null) {
			nextTick(() => {
				datePickerEl.updateModel(new Date());
			});
		}
	}

	return {
		onBlur,
	};
}
