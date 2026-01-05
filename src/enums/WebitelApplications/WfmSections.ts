export const WfmSections = {
  MySchedules: 'my-schedules',
  Agents: 'agents',
  Schedules: 'schedules',
} as const;

export type WfmSections = (typeof WfmSections)[keyof typeof WfmSections];
