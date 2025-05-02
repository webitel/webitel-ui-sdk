import { FilterInitParams } from '../../../../types/Filters.types';

/**
 * AMD Result to filter
 * @enum
 * @readonly
 */

export const AmdResultOptions: Array<FilterInitParams> = [
  {
    name: 'NOTSURE',
    value: 'NOTSURE',
  },
  {
    name: 'HUMAN',
    value: 'HUMAN',
  },
  {
    name: 'MACHINE',
    value: 'MACHINE',
  },
  {
    name: 'CANCEL',
    value: 'CANCEL',
  },
  {
    name: 'SILENCE',
    value: 'SILENCE',
  },
  {
    name: 'VOICEMAIL',
    value: 'VOICEMAIL',
  },
  {
    name: 'RINGING',
    value: 'RINGING',
  },
] as const;
