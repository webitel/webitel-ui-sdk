import { type Ref, ref, watch } from 'vue';

/**
 * Dirty flag for a local draft `ref`.
 *
 * Replacing `value` with a new object resets dirty. Mutating fields
 * in place sets `isAnyFieldEdited` to `true`.
 *
 * Used by `useCardComponent`. Also usable on nested popups that keep
 * a local draft instead of a card store.
 *
 * @example
 * ```ts
 * const draft = ref({ name: '' });
 * const { isAnyFieldEdited } = useCardAnyFieldEditedWatcher({ value: draft });
 *
 * draft.value = { name: 'Holiday' }; // reset
 * draft.value.name = 'NY';           // dirty
 * ```
 */
export const useCardAnyFieldEditedWatcher = ({
	value,
}: {
	value: Ref<object>;
}) => {
	const isAnyFieldEdited = ref(false);

	let prevValue: object = value.value;

	watch(
		value,
		() => {
			isAnyFieldEdited.value = prevValue === value.value; // if object value ref changes, object was overwritten completely
			prevValue = value.value;
		},
		{
			deep: true,
		},
	);

	return {
		isAnyFieldEdited,
	};
};
