import { nextTick } from 'vue';
import { toArray, isOptionSelected } from './useSelectUtils';

export const useSelectCustomValues = ({
	selected,
	filteredOptions,
	options,
	dataKey,
	filterText,
	filterOptions,
	updateSelectedOptionsCache,
	selectRef,
	allowCustomValues,
	manualCustomValues,
	isSingle,
	emit,
}) => {
	const makeCustomOption = (text: string) => {
		const sample = options.value.length
			? options.value[0]
			: filteredOptions.value[0];
		if (sample && typeof sample === 'object') {
			return Object.fromEntries(
				Object.keys(sample).map((key) => [
					key,
					text,
				]),
			);
		}
		return text;
	};

	const onInputKeydown = () => {
		if (!allowCustomValues.value || !filterText.value) return;

		// check if custom option is already selected
		const selectedAsArray = toArray(selected.value);
		const isAlreadySelected = selectedAsArray.some(
			(s) => (dataKey.value ? s[dataKey.value] : s) === filterText.value,
		);

		if (isAlreadySelected) return;

		// TODO: remove this functionality if there is no select that does manually handling
		// if (manualCustomValues.value) {
		// 	emit('add:custom-value', filterText.value);
		// 	return;
		// }

		const customOption = makeCustomOption(filterText.value);

		const isOptionAlreadyInList = filteredOptions.value.some((option) =>
			isOptionSelected(
				option,
				[
					customOption,
				],
				dataKey.value,
			),
		);

		if (!isOptionAlreadyInList) {
			filteredOptions.value.unshift(customOption);
		}

		if (isSingle) {
			selectRef.value?.hide();
			selected.value = customOption;
		} else {
			// redefine selected value instead of pushing element is for max-selected-labels prop correct work
			selected.value = [
				...selected.value,
				customOption,
			];
		}

		// Sync cache immediately so the custom value survives the upcoming API refetch
		updateSelectedOptionsCache();

		nextTick(() => {
			filterText.value = '';
			filterOptions('');
		});
	};

	return {
		onInputKeydown,
	};
};
