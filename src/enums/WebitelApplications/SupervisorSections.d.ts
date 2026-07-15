export declare const SupervisorSections: {
    readonly Queues: "queues";
    readonly Agents: "agents";
    readonly ActiveCalls: "active-calls";
};
export type SupervisorSections = (typeof SupervisorSections)[keyof typeof SupervisorSections];
