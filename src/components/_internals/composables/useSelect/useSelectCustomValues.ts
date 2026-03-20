export const useSelectCustomValues = ({
	selected,
	options,
	filterText,
	filterOptions,
	selectRef,
	allowCustomValues,
	isSingle,
}) => {
	const makeCustomValue = (text: string) => {
		const sample = options.value[0];
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
		if (!allowCustomValues.value) return;
		if (isSingle) {
			const customValue = makeCustomValue(filterText.value);
			selectRef.value?.hide();
			options.value.unshift(customValue);
			selected.value = customValue;
			filterText.value = '';
			filterOptions('');
		} else {
			// TODO: logic for multiselect
		}
	};

	const clearValue = (e) => {
		e.stopPropagation();
		selected.value = null;
	};

	return {
		onInputKeydown,
		clearValue,
	};
};
