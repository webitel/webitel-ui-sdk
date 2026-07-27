/**
 * Payload stored in `EnginePresetQuery.preset`, which the generated SDK types
 * only as `object`.
 */
export interface PresetSnapshot {
	/** serialized `FiltersManager`, see `IFiltersManager.toString()` */
	'filtersManager.toString'?: string;
	namespace?: string;
}
