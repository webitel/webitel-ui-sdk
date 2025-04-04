import type { FilterName } from '../types/Filter';

export const FilterOption = {
  Agent: 'agent',
  AmdResult: 'amdResult',
  Contact: 'contact',
  Direction: 'direction',
  Rated: 'rated',
  Gateway: 'gateway',
  Grantee: 'grantee',
  Cause: 'cause',
  Queue: 'queue',
  RatedBy: 'ratedBy',
  HasFile: 'hasFile',
  Score: 'score',
  Tag: 'tag',
  TalkDuration: 'talkDuration',
  Team: 'team',
  TotalDuration: 'totalDuration',
  HasTranscription: 'hasTranscription',
  User: 'user',
  Variable: 'variable',
  CreatedAt: 'createdAt',
  CreatedAtFrom: 'createdAtFrom',
  CreatedAtTo: 'createdAtTo',
  Status: 'status',
  Source: 'source',
  Service: 'service',
  Author: 'author',
  Reporter: 'reporter',
  Impacted: 'impacted',
  Assignee: 'assignee',
  ContactGroup: 'contactGroup',
  Priority: 'priority',
  CloseReasonGroups: 'closeReasonGroups',
  Rating: 'rating',
  Sla: 'sla',
  SlaCondition: 'slaCondition',
  ReactionTime: 'reactionTime',
  ResolutionTime: 'resolutionTime',
  ActualReactionTime: 'actualReactionTime',
  ActualResolutionTime: 'actualResolutionTime',
  HasAttachment: 'hasAttachment',
} as FilterName;

type SimpleFilterOption = (typeof FilterOption)[keyof typeof FilterOption];

type ExtendedFilterOption = {
  name: FilterOption;
  notDeletable?: boolean;
};

export type FilterOption = SimpleFilterOption | ExtendedFilterOption;
