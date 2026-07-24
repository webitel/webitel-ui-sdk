import type { SuperCompatibleRegleFieldStatus } from '@regle/core';

/**
 * Regle field surface consumed by UI inputs (`$error` / `$errors` only).
 *
 * Derived from Regle's SuperCompatibleRegleFieldStatus so both useRegle
 * (RegleFieldStatus) and @regle/schemas (RegleSchemaFieldStatus, which omits
 * `$pending`) are assignable. Picking keeps the prop from requiring members
 * that vary across Regle packages/versions.
 */
export type WtRegleFieldValidation = Pick<
	SuperCompatibleRegleFieldStatus,
	'$error' | '$errors'
>;
