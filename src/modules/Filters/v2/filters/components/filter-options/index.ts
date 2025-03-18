import type { Component } from 'vue';

import ActualReactionTimeFilter from './actual-reaction-time/actual-reaction-time-filter-value-field.vue';
import ActualReactionTimeFilterPreview from './actual-reaction-time/actual-reaction-time-filter-value-preview.vue';
import ActualResolutionTimeFilter from './actual-resolution-time/actual-resolution-time-filter-value-field.vue';
import ActualResolutionTimeFilterPreview from './actual-resolution-time/actual-resolution-time-filter-value-preview.vue';
import AgentFilter from './agent/agent-filter-value-field.vue';
import AgentFilterPreview from './agent/agent-filter-value-preview.vue';
import AmdResultFilter from './amd-result/amd-result-filter-value-field.vue';
import AmdResultFilterPreview from './amd-result/amd-result-filter-value-preview.vue';
import AssigneeFilter from './assignee/assignee-filter-value-field.vue';
import AssigneeFilterPreview from './assignee/assignee-filter-value-preview.vue';
import AuthorFilter from './author/author-filter-value-field.vue';
import AuthorFilterPreview from './author/author-filter-value-preview.vue';
import CauseFilter from './cause/cause-filter-value-field.vue';
import CauseFilterPreview from './cause/cause-filter-value-preview.vue';
import CloseReasonGroupsCaseFilter from './close-reason-groups-case/close-reason-groups-case-filter-value-field.vue';
import CloseReasonGroupsCaseFilterPreview from './close-reason-groups-case/close-reason-groups-case-filter-value-preview.vue';
import ContactFilter from './contact/contact-filter-value-field.vue';
import ContactFilterPreview from './contact/contact-filter-value-preview.vue';
import ContactGroupFilter from './contact-group/contact-group-filter-value-field.vue';
import ContactGroupFilterPreview from './contact-group/contact-group-filter-value-preview.vue';
import CreatedAtFromFilter from './created-at-from/created-at-from-filter-value-field.vue';
import CreatedAtFromFilterPreview from './created-at-from/created-at-from-filter-value-preview.vue';
import CreatedAtToFilter from './created-at-to/created-at-to-filter-value-field.vue';
import CreatedAtToFilterPreview from './created-at-to/created-at-to-filter-value-preview.vue';
import DirectionFilter from './direction/direction-filter-value-field.vue';
import DirectionFilterPreview from './direction/direction-filter-value-preview.vue';
import { FilterOption } from '../../enums/FilterOption';
import GatewayFilter from './gateway/gateway-filter-value-field.vue';
import GatewayFilterPreview from './gateway/gateway-filter-value-preview.vue';
import GranteeFilter from './grantee/grantee-filter-value-field.vue';
import GranteeFilterPreview from './grantee/grantee-filter-value-preview.vue';
import HasAttachmentFilter from './has-attachment/has-attachment-filter-value-field.vue';
import HasAttachmentFilterPreview from './has-attachment/has-attachment-filter-value-preview.vue';
import HasFileFilter from './has-file/has-file-filter-value-field.vue';
import HasFileFilterPreview from './has-file/has-file-filter-value-preview.vue';
import HasRatingFilterValueField from './has-rating/has-rating-filter-value-field.vue';
import HasRatingFilterValuePreview from './has-rating/has-rating-filter-value-preview.vue';
import HasTranscriptionFilter from './has-transcription/has-transcription-filter-value-field.vue';
import HasTranscriptionFilterPreview from './has-transcription/has-transcription-filter-value-preview.vue';
import ImpactedFilter from './impacted/impacted-filter-value-field.vue';
import ImpactedFilterPreview from './impacted/impacted-filter-value-preview.vue';
import CasePriorityFilter from './priority-case/priority-case-filter-value-field.vue';
import CasePriorityFilterPreview from './priority-case/priority-case-filter-value-preview.vue';
import QueueFilter from './queue/queue-filter-value-field.vue';
import QueueFilterPreview from './queue/queue-filter-value-preview.vue';
import RatedByFilter from './rated-by/rated-by-filter-value-field.vue';
import RatedByFilterPreview from './rated-by/rated-by-filter-value-preview.vue';
import RatingFromToFilter from './rating/rating-from-to-filter-value-field.vue';
import RatingFromToFilterPreview from './rating/rating-from-to-filter-value-preview.vue';
import ReactionTimeFilter from './reaction-time/reaction-time-filter-value-field.vue';
import ReactionTimeFilterPreview from './reaction-time/reaction-time-filter-value-preview.vue';
import ReporterFilter from './reporter/reporter-filter-value-field.vue';
import ReporterFilterPreview from './reporter/reporter-filter-value-preview.vue';
import ResolutionTimeFilter from './resolution-time/resolution-time-filter-value-field.vue';
import ResolutionTimeFilterPreview from './resolution-time/resolution-time-filter-value-preview.vue';
import ScoreFilter from './score/score-from-to-filter-value-field.vue';
import ScoreFilterPreview from './score/score-from-to-filter-value-preview.vue';
import CaseServiceFilter from './service-case/service-case-filter-value-field.vue';
import CaseServiceFilterPreview from './service-case/service-case-filter-value-preview.vue';
import SlaFilter from './sla/sla-filter-value-field.vue';
import SlaFilterPreview from './sla/sla-filter-value-preview.vue';
import SlaConditionFilter from './sla-condition/sla-condition-filter-value-field.vue';
import SlaConditionFilterPreview from './sla-condition/sla-condition-filter-value-preview.vue';
import CaseSourceFilter from './source-case/source-case-filter-value-field.vue';
import CaseSourceFilterPreview from './source-case/source-case-filter-value-preview.vue';
import CaseStatusFilter from './status-case/status-case-filter-value-field.vue';
import CaseStatusFilterPreview from './status-case/status-case-filter-value-preview.vue';
import TagFilter from './tag/tag-filter-value-field.vue';
import TagFilterPreview from './tag/tag-filter-value-preview.vue';
import TalkDurationFilter from './talk-duration/talk-duration-filter-value-field.vue';
import TalkDurationFilterPreview from './talk-duration/talk-duration-filter-value-preview.vue';
import TeamFilter from './team/team-filter-value-field.vue';
import TeamFilterPreview from './team/team-filter-value-preview.vue';
import TotalDurationFilter from './total-duration/total-duration-filter-value-field.vue';
import TotalDurationFilterPreview from './total-duration/total-duration-filter-value-preview.vue';
import UserFilter from './user/user-filter-value-field.vue';
import UserFilterPreview from './user/user-filter-value-preview.vue';
import VariableFilter from './variable/variable-filter-value-field.vue';
import VariableFilterPreview from './variable/variable-filter-value-preview.vue';

export {
  ActualReactionTimeFilter,
  ActualReactionTimeFilterPreview,
  ActualResolutionTimeFilter,
  ActualResolutionTimeFilterPreview,
  AgentFilter,
  AgentFilterPreview,
  AmdResultFilter,
  AmdResultFilterPreview,
  AssigneeFilter,
  AssigneeFilterPreview,
  AuthorFilter,
  AuthorFilterPreview,
  CasePriorityFilter,
  CasePriorityFilterPreview,
  CaseServiceFilter,
  CaseServiceFilterPreview,
  CaseSourceFilter,
  CaseSourceFilterPreview,
  CaseStatusFilter,
  CaseStatusFilterPreview,
  CauseFilter,
  CauseFilterPreview,
  CloseReasonGroupsCaseFilter,
  CloseReasonGroupsCaseFilterPreview,
  ContactFilter,
  ContactFilterPreview,
  ContactGroupFilter,
  ContactGroupFilterPreview,
  CreatedAtFromFilter,
  CreatedAtFromFilterPreview,
  CreatedAtToFilter,
  CreatedAtToFilterPreview,
  DirectionFilter,
  DirectionFilterPreview,
  GatewayFilter,
  GatewayFilterPreview,
  GranteeFilter,
  GranteeFilterPreview,
  HasAttachmentFilter,
  HasAttachmentFilterPreview,
  HasFileFilter,
  HasFileFilterPreview,
  HasRatingFilterValueField,
  HasRatingFilterValuePreview,
  HasTranscriptionFilter,
  HasTranscriptionFilterPreview,
  ImpactedFilter,
  ImpactedFilterPreview,
  QueueFilter,
  QueueFilterPreview,
  RatedByFilter,
  RatedByFilterPreview,
  RatingFromToFilter,
  RatingFromToFilterPreview,
  ReactionTimeFilter,
  ReactionTimeFilterPreview,
  ReporterFilter,
  ReporterFilterPreview,
  ResolutionTimeFilter,
  ResolutionTimeFilterPreview,
  ScoreFilter,
  ScoreFilterPreview,
  SlaConditionFilter,
  SlaConditionFilterPreview,
  SlaFilter,
  SlaFilterPreview,
  TagFilter,
  TagFilterPreview,
  TalkDurationFilter,
  TalkDurationFilterPreview,
  TeamFilter,
  TeamFilterPreview,
  TotalDurationFilter,
  TotalDurationFilterPreview,
  UserFilter,
  UserFilterPreview,
  VariableFilter,
  VariableFilterPreview,
};

export const FilterOptionToValueComponentMap: Record<FilterOption, Component> =
  {
    [FilterOption.Agent]: AgentFilter,
    [FilterOption.AmdResult]: AmdResultFilter,
    [FilterOption.Contact]: ContactFilter,
    [FilterOption.Direction]: DirectionFilter,
    [FilterOption.Rated]: HasRatingFilterValueField,
    [FilterOption.Gateway]: GatewayFilter,
    [FilterOption.Grantee]: GranteeFilter,
    [FilterOption.Cause]: CauseFilter,
    [FilterOption.Queue]: QueueFilter,
    [FilterOption.RatedBy]: RatedByFilter,
    [FilterOption.HasFile]: HasFileFilter,
    [FilterOption.Score]: ScoreFilter,
    [FilterOption.Tag]: TagFilter,
    [FilterOption.TalkDuration]: TalkDurationFilter,
    [FilterOption.Team]: TeamFilter,
    [FilterOption.TotalDuration]: TotalDurationFilter,
    [FilterOption.HasTranscription]: HasTranscriptionFilter,
    [FilterOption.User]: UserFilter,
    [FilterOption.Variable]: VariableFilter,
    [FilterOption.CreatedAtFrom]: CreatedAtFromFilter,
    [FilterOption.CreatedAtTo]: CreatedAtToFilter,
    [FilterOption.Status]: CaseStatusFilter,
    [FilterOption.Source]: CaseSourceFilter,
    [FilterOption.Service]: CaseServiceFilter,
    [FilterOption.Author]: AuthorFilter,
    [FilterOption.Reporter]: ReporterFilter,
    [FilterOption.Impacted]: ImpactedFilter,
    [FilterOption.Assignee]: AssigneeFilter,
    [FilterOption.ContactGroup]: ContactGroupFilter,
    [FilterOption.Priority]: CasePriorityFilter,
    [FilterOption.CloseReasonGroups]: CloseReasonGroupsCaseFilter,
    [FilterOption.Rating]: RatingFromToFilter,
    [FilterOption.Sla]: SlaFilter,
    [FilterOption.SlaCondition]: SlaConditionFilter,
    [FilterOption.ReactionTime]: ReactionTimeFilter,
    [FilterOption.ResolutionTime]: ResolutionTimeFilter,
    [FilterOption.ActualReactionTime]: ActualReactionTimeFilter,
    [FilterOption.ActualResolutionTime]: ActualResolutionTimeFilter,
    [FilterOption.HasAttachment]: HasAttachmentFilter,
  };

export const FilterOptionToPreviewComponentMap: Record<
  FilterOption,
  Component
> = {
  [FilterOption.Agent]: AgentFilterPreview,
  [FilterOption.AmdResult]: AmdResultFilterPreview,
  [FilterOption.Contact]: ContactFilterPreview,
  [FilterOption.Direction]: DirectionFilterPreview,
  [FilterOption.Rated]: HasRatingFilterValuePreview,
  [FilterOption.Gateway]: GatewayFilterPreview,
  [FilterOption.Grantee]: GranteeFilterPreview,
  [FilterOption.Cause]: CauseFilterPreview,
  [FilterOption.Queue]: QueueFilterPreview,
  [FilterOption.RatedBy]: RatedByFilterPreview,
  [FilterOption.HasFile]: HasFileFilterPreview,
  [FilterOption.Score]: ScoreFilterPreview,
  [FilterOption.Tag]: TagFilterPreview,
  [FilterOption.TalkDuration]: TalkDurationFilterPreview,
  [FilterOption.Team]: TeamFilterPreview,
  [FilterOption.TotalDuration]: TotalDurationFilterPreview,
  [FilterOption.HasTranscription]: HasTranscriptionFilterPreview,
  [FilterOption.User]: UserFilterPreview,
  [FilterOption.Variable]: VariableFilterPreview,
  [FilterOption.CreatedAtFrom]: CreatedAtFromFilterPreview,
  [FilterOption.CreatedAtTo]: CreatedAtToFilterPreview,
  [FilterOption.Status]: CaseStatusFilterPreview,
  [FilterOption.Source]: CaseSourceFilterPreview,
  [FilterOption.Service]: CaseServiceFilterPreview,
  [FilterOption.Author]: AuthorFilterPreview,
  [FilterOption.Reporter]: ReporterFilterPreview,
  [FilterOption.Impacted]: ImpactedFilterPreview,
  [FilterOption.Assignee]: AssigneeFilterPreview,
  [FilterOption.ContactGroup]: ContactGroupFilterPreview,
  [FilterOption.Priority]: CasePriorityFilterPreview,
  [FilterOption.CloseReasonGroups]: CloseReasonGroupsCaseFilterPreview,
  [FilterOption.Rating]: RatingFromToFilterPreview,
  [FilterOption.Sla]: SlaFilterPreview,
  [FilterOption.SlaCondition]: SlaConditionFilterPreview,
  [FilterOption.ReactionTime]: ReactionTimeFilterPreview,
  [FilterOption.ResolutionTime]: ResolutionTimeFilterPreview,
  [FilterOption.ActualReactionTime]: ActualReactionTimeFilterPreview,
  [FilterOption.ActualResolutionTime]: ActualResolutionTimeFilterPreview,
  [FilterOption.HasAttachment]: HasAttachmentFilterPreview,
};
