import type { CasesCreateCaseRelatedCaseInput } from './casesCreateCaseRelatedCaseInput';
import type { CasesInputCaseLink } from './casesInputCaseLink';
import type { CasesInputCreateCaseCustom } from './casesInputCreateCaseCustom';
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { GeneralLookup } from './generalLookup';
/**
 * Input structure for creating a new case.
 */
export interface CasesInputCreateCase {
    /** Optional assignee ID. */
    assignee?: GeneralLookup;
    /** Optional close information. */
    closeReason?: GeneralLookup;
    /** Optional close reason. */
    closeReasonGroup?: GeneralLookup;
    /** Optional close information. */
    closeResult?: string;
    /** Optional contact information. */
    contactInfo?: string;
    /** Custom data extension fields .. */
    custom?: CasesInputCreateCaseCustom;
    /** Optional description of the case. */
    description?: string;
    /** Optional group ID. */
    group?: GeneralLookup;
    /** Required impacted user ID (default: reporter). */
    impacted?: GeneralLookup;
    /** List of links attached to the case. */
    links?: CasesInputCaseLink[];
    /** Optional priority level. */
    priority?: GeneralLookup;
    /** API-only rating information. */
    rating?: string;
    /** API-only rating information. */
    ratingComment?: string;
    /** List of related cases. */
    related?: CasesCreateCaseRelatedCaseInput[];
    /** Required reporter ID (if empty, anonymous contact). */
    reporter?: GeneralLookup;
    /** Service ID (affects many other readonly fields). */
    service?: GeneralLookup;
    /** Source of the case. */
    source?: GeneralLookup;
    /** Initial case status (default from lookup or UI). */
    status?: GeneralLookup;
    statusCondition?: GeneralLookup;
    /** Required subject of the case. */
    subject?: string;
    /** Optional creator / updater ID. Use this to explicitly set the case creator / updater instead of deriving it from the auth token. */
    userId?: GeneralLookup;
}
