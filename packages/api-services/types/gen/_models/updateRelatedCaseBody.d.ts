import type { CasesRelationType } from './casesRelationType';
import type { GeneralLookup } from './generalLookup';
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
import type { UpdateRelatedCaseBodyPrimaryCase } from './updateRelatedCaseBodyPrimaryCase';
export type UpdateRelatedCaseBody = {
    /** Primary case details. */
    primaryCase?: UpdateRelatedCaseBodyPrimaryCase;
    /** Related case details. */
    relatedCase?: GeneralLookup;
    /** Relation type. */
    relationType?: CasesRelationType;
};
