import { WtApplication } from './WtApplication';
/**
 * @augments WtApplication
 * represents ui sections in Supervisor WtApplication
 * without (!) any relation to WtObjects
 *
 * `WtApplication` prefix is duplicated intentionally
 * for IDE hint previews
 */
export const SupervisorSections = {
    Queues: `${WtApplication.Supervisor}/queues`,
    Agents: `${WtApplication.Supervisor}/agents`,
    ActiveCalls: `${WtApplication.Supervisor}/activeCalls`,
};
