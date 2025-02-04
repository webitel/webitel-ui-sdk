import { WtApplication } from './WtApplication';
/**
 * @augments WtApplication
 * represents ui sections in Audit WtApplication
 * without (!) any relation to WtObjects
 *
 * `WtApplication` prefix is duplicated intentionally
 * for IDE hint previews
 */
export const AuditorSections = {
    Scorecards: `${WtApplication.Audit}/scorecards`,
};
