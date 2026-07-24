import type { SuperCompatibleRegleFieldStatus } from '@regle/core';

/**
 * Regle field status accepted by UI inputs.
 *
 * Alias of Regle's SuperCompatibleRegleFieldStatus so both useRegle
 * (RegleFieldStatus) and @regle/schemas (RegleSchemaFieldStatus, which omits
 * `$pending`) are assignable. Prefer this over RegleFieldStatus for props.
 */
export type WtRegleFieldValidation = SuperCompatibleRegleFieldStatus;
