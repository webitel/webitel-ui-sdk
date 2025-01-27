export const AuditorSections = {
  Scorecards: 'scorecards',
} as const;

export type AuditorSections =
  (typeof AuditorSections)[keyof typeof AuditorSections];
