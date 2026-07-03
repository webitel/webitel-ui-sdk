import { nextTick, type WritableComputedRef, watch } from 'vue';

/**
 * @author @HlukhovYe
 *
 * https://webitel.atlassian.net/browse/WTEL-9880
 *
 * When the datepicker is not clearable, restores the last valid value on blur
 * if the user left the field empty or typed an invalid date.
 *
 * Since the parent model never becomes null (null writes are blocked in the
 * modelValue setter), PrimeVue's watcher won't re-fire on restore. Instead we
 * call PrimeVue's internal updateModel() directly so it resyncs rawValue and
 * redraws the input.
 */
export function useRestoreOnBlur(
	modelValue: WritableComputedRef<Date | null>,
	getDatepicker: () => {
		rawValue: Date | null;
		updateModel: (v: Date) => void;
	} | null,
	isClearable: () => boolean,
) {
	let lastValid: Date | null = null;

	function watchModelValue() {
		watch(
			modelValue,
			(value) => {
				if (value !== null) lastValid = value;
			},
			{
				immediate: true,
			},
		);
	}

	function onBlur() {
		if (isClearable()) return;
		const datePickerEl = getDatepicker();
		if (!datePickerEl) return;
		if (datePickerEl.rawValue === null && lastValid !== null) {
			nextTick(() => {
				datePickerEl.updateModel(new Date(lastValid.getTime()));
			});
		}
	}

	return {
		onBlur,
		watchModelValue,
	};
}
