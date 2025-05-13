import { CallDirection } from 'webitel-sdk';

export type CallDirectionType =
  (typeof CallDirection)[keyof typeof CallDirection];

export type DirectionOption = {
  locale: [string, number];
  value: CallDirectionType;
};

export const CallDirectionFilterOptions: readonly DirectionOption[] = [
  {
    locale: [`calls.direction.${CallDirection.Inbound}`, 2],
    value: CallDirection.Inbound,
  },
  {
    locale: [`calls.direction.${CallDirection.Outbound}`, 2],
    value: CallDirection.Outbound,
  },
] as const;
