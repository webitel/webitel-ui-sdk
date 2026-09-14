import { z } from 'zod';

/**
 * @description
 * An optional number the user is allowed to clear.
 *
 * `wt-input-number` wraps PrimeVue's `InputNumber`, which emits `null` — not
 * `undefined` — when its input is emptied. A plain `z.number().optional()`
 * rejects that with "expected number, received null", which the form shows as
 * a red field with a helper text indistinguishable from a required error, and
 * which blocks saving. Worse, the failure is on the base object, so a
 * `superRefine` carrying the real per-type rules never runs.
 *
 * Accepting `null` keeps an emptied optional field valid; whether the field may
 * be empty at all stays with the required rules that run in `superRefine`.
 *
 * https://webitel.atlassian.net/browse/WTEL-10326
 */
export const clearableNumberSchema = z.number().nullable().optional();
