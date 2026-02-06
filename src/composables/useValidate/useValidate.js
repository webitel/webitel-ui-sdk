///import { useVuelidate } from '@vuelidate/core';

export const useValidate = async (schema, data) => {
	const { useVuelidate } = await import('@vuelidate/core');
	const v$ = useVuelidate(schema, data, {
		$autoDirty: true,
	});

	return {
		v$,
		invalid: v$.value?.$invalid,
	};
};
