export const WfmSections = {
  MySchedules: 'mySchedules',
  Agents: 'agents',
  Schedules: 'schedules',
} as const;

export type WfmSections = (typeof WfmSections)[keyof typeof WfmSections];
