const valuePrefix = 'rdt'; /* stands for relative datetime */

export const RelativeDatetimeValue = {
  Today: `${valuePrefix}_today`,
  ThisWeek: `${valuePrefix}_this_week`,
  ThisMonth: `${valuePrefix}_this_month`,
  Custom: `${valuePrefix}_custom`,
} as const;

export type RelativeDatetimeValue =
  (typeof RelativeDatetimeValue)[keyof typeof RelativeDatetimeValue];
