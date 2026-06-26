import type { RegleSchema } from '@regle/schemas';
import { computed, type Ref, watch, watchEffect } from 'vue';

export const useCardValidation = <TState, TSchema>({
	validationSchema,
}: {
	validationSchema: Ref<RegleSchema<TState, TSchema>>;
}) => {
	const modelValue = computed(() => {
		return validationSchema.value.r$.$value;
	});

	const validationFields = computed(() => {
		return validationSchema.value.r$.$fields;
	});

	// r$.$invalid (not $error) so cross-field superRefine errors surface
	// regardless of $dirty state — Regle resets $dirty on every post-flush
	// field-status recreation.
	const hasValidationErrors = computed(() => {
		return validationSchema.value.r$.$invalid;
	});

	// Regle's rootSchemaErrors watcher (flush:'post') recreates all field
	// statuses on every schema update, resetting $dirty=false. We track
	// which fields the user has touched and re-$touch() them after each
	// recreation so field-level $error (used for datepicker red border) stays
	// correct.
	const _touchedFields = new Set<string>();

	watchEffect(() => {
		const fields = validationSchema.value?.r$?.$fields;
		if (!fields) return;
		for (const [key, field] of Object.entries(fields)) {
			if ((field as any)?.$dirty) _touchedFields.add(key);
		}
	});

	watch(
		() => validationSchema.value?.r$?.$fields,
		(fields) => {
			if (!fields) return;
			for (const key of _touchedFields) {
				(fields[key] as any)?.$touch?.();
			}
		},
		{
			flush: 'post',
		},
	);

	const validate = () => {
		return validationSchema.value.r$.$validate();
	};

	return {
		modelValue,
		validationFields,
		hasValidationErrors,

		validate,
	};
};
