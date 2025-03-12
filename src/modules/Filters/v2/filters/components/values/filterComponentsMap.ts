import {
  AgentFilter,
  AgentFilterPreview,
  AmdResultFilter,
  AmdResultFilterPreview,
  ContactFilter,
  ContactFilterPreview,
  CreatedAtFromFilter,
  CreatedAtFromFilterPreview,
  CreatedAtToFilter,
  CreatedAtToFilterPreview,
  DirectionFilter,
  DirectionFilterPreview,
  HasRatingFilterValueField,
  HasRatingFilterValuePreview,
  GatewayFilter,
  GatewayFilterPreview,
  GranteeFilter,
  GranteeFilterPreview,
  CauseFilter,
  CauseFilterPreview,
  QueueFilter,
  QueueFilterPreview,
  RatedByFilter,
  RatedByFilterPreview,
  HasFileFilter,
  HasFileFilterPreview,
  ScoreFilter,
  ScoreFilterPreview,
  TagFilter,
  TagFilterPreview,
  TalkDurationFilter,
  TalkDurationFilterPreview,
  TeamFilter,
  TeamFilterPreview,
  TotalDurationFilter,
  TotalDurationFilterPreview,
  HasTranscriptionFilter,
  HasTranscriptionFilterPreview,
  UserFilter,
  UserFilterPreview,
  VariableFilter,
  VariableFilterPreview,
} from './index';
import {Component} from "vue";
import type {FilterName} from "../../../index";


interface FilterOptionsComponentsConfig {
  [key: string]: {
    valueField: Component
    previewField: Component
  }
}
const filterOptionsComponentsConfig: FilterOptionsComponentsConfig = {
  agent: {
    valueField: AgentFilter,
    previewField: AgentFilterPreview,
  },
  amdResult: {
    valueField: AmdResultFilter,
    previewField: AmdResultFilterPreview,
  },
  contact: {
    valueField: ContactFilter,
    previewField: ContactFilterPreview,
  },
  createdAtFrom: {
    valueField: CreatedAtFromFilter,
    previewField: CreatedAtFromFilterPreview,
  },
  createdAtTo: {
    valueField: CreatedAtToFilter,
    previewField: CreatedAtToFilterPreview,
  },
  direction: {
    valueField: DirectionFilter,
    previewField: DirectionFilterPreview,
  },
  rated: {
    valueField: HasRatingFilterValueField,
    previewField: HasRatingFilterValuePreview,
  },
  gateway: {
    valueField: GatewayFilter,
    previewField: GatewayFilterPreview,
  },
  grantee: {
    valueField: GranteeFilter,
    previewField: GranteeFilterPreview,
  },
  cause: {
    valueField: CauseFilter,
    previewField: CauseFilterPreview,
  },
  queue: {
    valueField: QueueFilter,
    previewField: QueueFilterPreview,
  },
  ratedBy: {
    valueField: RatedByFilter,
    previewField: RatedByFilterPreview,
  },
  hasFile: {
    valueField: HasFileFilter,
    previewField: HasFileFilterPreview,
  },
  score: {
    valueField: ScoreFilter,
    previewField: ScoreFilterPreview,
  },
  tag: {
    valueField: TagFilter,
    previewField: TagFilterPreview,
  },
  talkDuration: {
    valueField: TalkDurationFilter,
    previewField: TalkDurationFilterPreview,
  },
  team: {
    valueField: TeamFilter,
    previewField: TeamFilterPreview,
  },
  totalDuration: {
    valueField: TotalDurationFilter,
    previewField: TotalDurationFilterPreview,
  },
  hasTranscription: {
    valueField: HasTranscriptionFilter,
    previewField: HasTranscriptionFilterPreview,
  },
  user: {
    valueField: UserFilter,
    previewField: UserFilterPreview,
  },
  variable: {
    valueField: VariableFilter,
    previewField: VariableFilterPreview,
  },
}

export const getFilterFieldComponent = (filterName: FilterName, filterField: 'valueField' | 'previewField') => {
  const filter = filterOptionsComponentsConfig[filterName];
  return !filter ? '' : filter[filterField] || '';
};

export default filterOptionsComponentsConfig;
