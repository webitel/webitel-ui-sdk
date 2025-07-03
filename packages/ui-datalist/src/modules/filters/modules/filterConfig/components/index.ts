import type { Component } from 'vue';

import {
  CustomFilterOption,
  FilterOption,
  FilterOptionName,
} from '../enums/FilterOption';
import AgentFilter from './agent/agent-filter-value-field.vue';
import AgentFilterPreview from './agent/agent-filter-value-preview.vue';
import { searchMethod as agentSearchMethod } from './agent/config';
import AmdResultFilter from './amd-result/amd-result-filter-value-field.vue';
import AmdResultFilterPreview from './amd-result/amd-result-filter-value-preview.vue';
import CallDirectionFilterValueField from './call-direction/call-direction-filter-value-field.vue';
import CallDirectionFilterValuePreview from './call-direction/call-direction-filter-value-preview.vue';
import CaseActualReactionTimeFilterValueField from './case-actual-reaction-time/case-actual-reaction-time-filter-value-field.vue';
import CaseActualReactionTimeFilterValuePreview from './case-actual-reaction-time/case-actual-reaction-time-filter-value-preview.vue';
import CaseActualResolutionTimeFilterValueField from './case-actual-resolution-time/case-actual-resolution-time-filter-value-field.vue';
import CaseActualResolutionTimeFilterValuePreview from './case-actual-resolution-time/case-actual-resolution-time-filter-value-preview.vue';
import { createCaseAssigneeFilterConfig } from './case-assignee';
import CaseAuthorFilterValueField from './case-author/case-author-filter-value-field.vue';
import CaseAuthorFilterValuePreview from './case-author/case-author-filter-value-preview.vue';
import { searchMethod as caseAuthorSearchMethod } from './case-author/config';
import CaseCloseReasonGroupsFilterValueField from './case-close-reason-groups/case-close-reason-groups-filter-value-field.vue';
import CaseCloseReasonGroupsFilterValuePreview from './case-close-reason-groups/case-close-reason-groups-filter-value-preview.vue';
import { caseCloseReasonsSearchMethod } from './case-close-reason-groups/config';
import CaseImpactedFilterValueField from './case-impacted/case-impacted-filter-value-field.vue';
import CaseImpactedFilterValuePreview from './case-impacted/case-impacted-filter-value-preview.vue';
import { searchMethod as caseImpactedSearchMethod } from './case-impacted/config';
import CasePriorityFilterValueField from './case-priority/case-priority-filter-value-field.vue';
import CasePriorityFilterValuePreview from './case-priority/case-priority-filter-value-preview.vue';
import { searchMethod as casePrioritySearchMethod } from './case-priority/config';
import CaseReactionTimeFilterValueField from './case-reaction-time/case-reaction-time-filter-value-field.vue';
import CaseReactionTimeFilterValuePreview from './case-reaction-time/case-reaction-time-filter-value-preview.vue';
import CaseReporterFilterValueField from './case-reporter/case-reporter-filter-value-field.vue';
import CaseReporterFilterValuePreview from './case-reporter/case-reporter-filter-value-preview.vue';
import { searchMethod as caseReporterSearchMethod } from './case-reporter/config';
import CaseResolutionTimeFilterValueField from './case-resolution-time/case-resolution-time-filter-value-field.vue';
import CaseResolutionTimeFilterValuePreview from './case-resolution-time/case-resolution-time-filter-value-preview.vue';
import CaseServiceFilterValueField from './case-service/case-service-filter-value-field.vue';
import CaseServiceFilterValuePreview from './case-service/case-service-filter-value-preview.vue';
import { servicesSearchMethod } from './case-service/config';
import CaseSlaFilterValueField from './case-sla/case-sla-filter-value-field.vue';
import CaseSlaFilterValuePreview from './case-sla/case-sla-filter-value-preview.vue';
import { searchMethod as caseSlaSearchMethod } from './case-sla/config';
import CaseSlaConditionFilterValueField from './case-sla-condition/case-sla-condition-filter-value-field.vue';
import CaseSlaConditionFilterValuePreview from './case-sla-condition/case-sla-condition-filter-value-preview.vue';
import { slasConditionsSearchMethod } from './case-sla-condition/config';
import CaseSourceFilterValueField from './case-source/case-source-filter-value-field.vue';
import CaseSourceFilterValuePreview from './case-source/case-source-filter-value-preview.vue';
import { searchMethod as caseSourceSearchMethod } from './case-source/config';
import CaseStatusFilterValueField from './case-status/case-status-filter-value-field.vue';
import CaseStatusFilterValuePreview from './case-status/case-status-filter-value-preview.vue';
import { caseStatusConditionsSearchMethod } from './case-status/config';
import { searchMethod as contactSearchMethod } from './contact/config';
import ContactFilter from './contact/contact-filter-value-field.vue';
import ContactFilterPreview from './contact/contact-filter-value-preview.vue';
import { createContactGroupFilterConfig } from './contact-group';
import ContactGroupFilter from './contact-group/contact-group-filter-value-field.vue';
import ContactGroupFilterPreview from './contact-group/contact-group-filter-value-preview.vue';
import { createContactLabelFilterConfig } from './contact-label';
import ContactLabelFilter from './contact-label/contact-label-filter-value-field.vue';
import ContactLabelFilterPreview from './contact-label/contact-label-filter-value-preview.vue';
import { createContactOwnerFilterConfig } from './contact-owner'
import ContactOwnerFilter from "./contact-owner/contact-owner-filter-value-field.vue";
import ContactOwnerFilterPreview from "./contact-owner/contact-owner-filter-value-preview.vue";
import CreatedAtFilterValueField from './created-at/created-at-filter-value-field.vue';
import CreatedAtFilterPreview from './created-at/created-at-filter-value-preview.vue';
import { searchMethod as gatewaySearchMethod } from './gateway/config';
import GatewayFilter from './gateway/gateway-filter-value-field.vue';
import GatewayFilterPreview from './gateway/gateway-filter-value-preview.vue';
import { searchMethod as granteeSearchMethod } from './grantee/config';
import GranteeFilter from './grantee/grantee-filter-value-field.vue';
import GranteeFilterPreview from './grantee/grantee-filter-value-preview.vue';
import HangupCauseFilterValueField from './hangup-cause/hangup-cause-filter-value-field.vue';
import HangupCauseFilterValuePreview from './hangup-cause/hangup-cause-filter-value-preview.vue';
import HasAttachmentFilter from './has-attachment/has-attachment-filter-value-field.vue';
import HasAttachmentFilterPreview from './has-attachment/has-attachment-filter-value-preview.vue';
import HasFileFilter from './has-file/has-file-filter-value-field.vue';
import HasFileFilterPreview from './has-file/has-file-filter-value-preview.vue';
import HasRatingFilterValueField from './has-rating/has-rating-filter-value-field.vue';
import HasRatingFilterValuePreview from './has-rating/has-rating-filter-value-preview.vue';
import HasTranscriptionFilter from './has-transcription/has-transcription-filter-value-field.vue';
import HasTranscriptionFilterPreview from './has-transcription/has-transcription-filter-value-preview.vue';
import HasUserFilter from './has-user/has-user-filter-value-field.vue';
import HasUserFilterPreview from './has-user/has-user-filter-value-preview.vue';
import { searchMethod as queueSearchMethod } from './queue/config';
import QueueFilter from './queue/queue-filter-value-field.vue';
import QueueFilterPreview from './queue/queue-filter-value-preview.vue';
import { searchMethod as ratedBySearchMethod } from './rated-by/config';
import RatedByFilter from './rated-by/rated-by-filter-value-field.vue';
import RatedByFilterPreview from './rated-by/rated-by-filter-value-preview.vue';
import RatingFromToFilter from './rating/rating-from-to-filter-value-field.vue';
import RatingFromToFilterPreview from './rating/rating-from-to-filter-value-preview.vue';
import ScoreFilter from './score/score-from-to-filter-value-field.vue';
import ScoreFilterPreview from './score/score-from-to-filter-value-preview.vue';
import TagFilter from './tag/tag-filter-value-field.vue';
import TagFilterPreview from './tag/tag-filter-value-preview.vue';
import TalkDurationFilter from './talk-duration/talk-duration-filter-value-field.vue';
import TalkDurationFilterPreview from './talk-duration/talk-duration-filter-value-preview.vue';
import { searchMethod as teamSearchMethod } from './team/config';
import TeamFilter from './team/team-filter-value-field.vue';
import TeamFilterPreview from './team/team-filter-value-preview.vue';
import TotalDurationFilter from './total-duration/total-duration-filter-value-field.vue';
import TotalDurationFilterPreview from './total-duration/total-duration-filter-value-preview.vue';
import { searchMethod as userSearchMethod } from './user/config';
import UserFilter from './user/user-filter-value-field.vue';
import UserFilterPreview from './user/user-filter-value-preview.vue';
import VariableFilter from './variable/variable-filter-value-field.vue';
import VariableFilterPreview from './variable/variable-filter-value-preview.vue';

export {
  AgentFilter,
  AgentFilterPreview,
  AmdResultFilter,
  AmdResultFilterPreview,
  CallDirectionFilterValueField,
  CallDirectionFilterValuePreview,
  CaseActualReactionTimeFilterValueField,
  CaseActualReactionTimeFilterValuePreview,
  CaseActualResolutionTimeFilterValueField,
  CaseActualResolutionTimeFilterValuePreview,
  CaseAuthorFilterValueField,
  CaseAuthorFilterValuePreview,
  CaseCloseReasonGroupsFilterValueField,
  CaseCloseReasonGroupsFilterValuePreview,
  CaseImpactedFilterValueField,
  CaseImpactedFilterValuePreview,
  CasePriorityFilterValueField,
  CasePriorityFilterValuePreview,
  CaseReactionTimeFilterValueField,
  CaseReactionTimeFilterValuePreview,
  CaseReporterFilterValueField,
  CaseReporterFilterValuePreview,
  CaseResolutionTimeFilterValueField,
  CaseResolutionTimeFilterValuePreview,
  CaseServiceFilterValueField,
  CaseServiceFilterValuePreview,
  CaseSlaConditionFilterValueField,
  CaseSlaConditionFilterValuePreview,
  CaseSlaFilterValueField,
  CaseSlaFilterValuePreview,
  CaseSourceFilterValueField,
  CaseSourceFilterValuePreview,
  CaseStatusFilterValueField,
  CaseStatusFilterValuePreview,
  ContactFilter,
  ContactFilterPreview,
  ContactGroupFilter,
  ContactGroupFilterPreview,
  ContactLabelFilter,
  ContactLabelFilterPreview,
  ContactOwnerFilter,
  ContactOwnerFilterPreview,
  CreatedAtFilterValueField,
  GatewayFilter,
  GatewayFilterPreview,
  GranteeFilter,
  GranteeFilterPreview,
  HangupCauseFilterValueField,
  HangupCauseFilterValuePreview,
  HasAttachmentFilter,
  HasAttachmentFilterPreview,
  HasFileFilter,
  HasFileFilterPreview,
  HasRatingFilterValueField,
  HasRatingFilterValuePreview,
  HasTranscriptionFilter,
  HasTranscriptionFilterPreview,
  HasUserFilter,
  HasUserFilterPreview,
  QueueFilter,
  QueueFilterPreview,
  RatedByFilter,
  RatedByFilterPreview,
  RatingFromToFilter,
  RatingFromToFilterPreview,
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
  UserFilter,
  UserFilterPreview,
  VariableFilter,
  VariableFilterPreview,
};

export const FilterOptionToValueComponentMap: Record<
  FilterOptionName,
  Component
> = {
  [FilterOption.Agent]: AgentFilter,
  [FilterOption.AmdResult]: AmdResultFilter,
  [FilterOption.Contact]: ContactFilter,
  [FilterOption.CallDirection]: CallDirectionFilterValueField,
  [FilterOption.Rated]: HasRatingFilterValueField,
  [FilterOption.Gateway]: GatewayFilter,
  [FilterOption.Grantee]: GranteeFilter,
  [FilterOption.HangupCause]: HangupCauseFilterValueField,
  [FilterOption.Queue]: QueueFilter,
  [FilterOption.RatedBy]: RatedByFilter,
  [FilterOption.HasFile]: HasFileFilter,
  [FilterOption.Score]: ScoreFilter,
  [FilterOption.Tag]: TagFilter,
  [FilterOption.TalkDuration]: TalkDurationFilter,
  [FilterOption.Team]: TeamFilter,
  [FilterOption.TotalDuration]: TotalDurationFilter,
  [FilterOption.HasTranscription]: HasTranscriptionFilter,
  [FilterOption.HasUser]: HasUserFilter,
  [FilterOption.User]: UserFilter,
  [FilterOption.Variable]: VariableFilter,
  [FilterOption.CreatedAt]: CreatedAtFilterValueField,
  [FilterOption.CaseStatus]: CaseStatusFilterValueField,
  [FilterOption.CaseSource]: CaseSourceFilterValueField,
  [FilterOption.CaseService]: CaseServiceFilterValueField,
  [FilterOption.CaseAuthor]: CaseAuthorFilterValueField,
  [FilterOption.CaseReporter]: CaseReporterFilterValueField,
  [FilterOption.CaseImpacted]: CaseImpactedFilterValueField,
  [FilterOption.CasePriority]: CasePriorityFilterValueField,
  [FilterOption.CaseCloseReasonGroups]: CaseCloseReasonGroupsFilterValueField,
  [FilterOption.Rating]: RatingFromToFilter,
  [FilterOption.CaseSla]: CaseSlaFilterValueField,
  [FilterOption.CaseSlaCondition]: CaseSlaConditionFilterValueField,
  [FilterOption.CaseReactionTime]: CaseReactionTimeFilterValueField,
  [FilterOption.CaseResolutionTime]: CaseResolutionTimeFilterValueField,
  [FilterOption.CaseActualReactionTime]: CaseActualReactionTimeFilterValueField,
  [FilterOption.CaseActualResolutionTime]:
    CaseActualResolutionTimeFilterValueField,
  [FilterOption.HasAttachment]: HasAttachmentFilter,
};

export const FilterOptionToPreviewComponentMap: Record<
  FilterOptionName,
  Component
> = {
  [FilterOption.CreatedAt]: CreatedAtFilterPreview,
  [FilterOption.Agent]: AgentFilterPreview,
  [FilterOption.AmdResult]: AmdResultFilterPreview,
  [FilterOption.Contact]: ContactFilterPreview,
  [FilterOption.CallDirection]: CallDirectionFilterValuePreview,
  [FilterOption.Rated]: HasRatingFilterValuePreview,
  [FilterOption.Gateway]: GatewayFilterPreview,
  [FilterOption.Grantee]: GranteeFilterPreview,
  [FilterOption.HangupCause]: HangupCauseFilterValuePreview,
  [FilterOption.Queue]: QueueFilterPreview,
  [FilterOption.RatedBy]: RatedByFilterPreview,
  [FilterOption.HasFile]: HasFileFilterPreview,
  [FilterOption.Score]: ScoreFilterPreview,
  [FilterOption.Tag]: TagFilterPreview,
  [FilterOption.TalkDuration]: TalkDurationFilterPreview,
  [FilterOption.Team]: TeamFilterPreview,
  [FilterOption.TotalDuration]: TotalDurationFilterPreview,
  [FilterOption.HasTranscription]: HasTranscriptionFilterPreview,
  [FilterOption.HasUser]: HasUserFilterPreview,
  [FilterOption.User]: UserFilterPreview,
  [FilterOption.Variable]: VariableFilterPreview,
  [FilterOption.CaseStatus]: CaseStatusFilterValuePreview,
  [FilterOption.CaseSource]: CaseSourceFilterValuePreview,
  [FilterOption.CaseService]: CaseServiceFilterValuePreview,
  [FilterOption.CaseAuthor]: CaseAuthorFilterValuePreview,
  [FilterOption.CaseReporter]: CaseReporterFilterValuePreview,
  [FilterOption.CaseImpacted]: CaseImpactedFilterValuePreview,
  [FilterOption.CasePriority]: CasePriorityFilterValuePreview,
  [FilterOption.CaseCloseReasonGroups]: CaseCloseReasonGroupsFilterValuePreview,
  [FilterOption.Rating]: RatingFromToFilterPreview,
  [FilterOption.CaseSla]: CaseSlaFilterValuePreview,
  [FilterOption.CaseSlaCondition]: CaseSlaConditionFilterValuePreview,
  [FilterOption.CaseReactionTime]: CaseReactionTimeFilterValuePreview,
  [FilterOption.CaseResolutionTime]: CaseResolutionTimeFilterValuePreview,
  [FilterOption.CaseActualReactionTime]:
    CaseActualReactionTimeFilterValuePreview,
  [FilterOption.CaseActualResolutionTime]:
    CaseActualResolutionTimeFilterValuePreview,
  [FilterOption.HasAttachment]: HasAttachmentFilterPreview,
};

export const FilterOptionToPreviewApiSearchMethodMap: Record<
  FilterOptionName,
  (unknown) => { items }
> = {
  [FilterOption.Agent]: agentSearchMethod,
  [FilterOption.Gateway]: gatewaySearchMethod,
  [FilterOption.Grantee]: granteeSearchMethod,
  [FilterOption.Queue]: queueSearchMethod,
  [FilterOption.RatedBy]: ratedBySearchMethod,
  [FilterOption.CaseReporter]: caseReporterSearchMethod,
  [FilterOption.CaseSla]: caseSlaSearchMethod,
  [FilterOption.CaseService]: servicesSearchMethod,
  [FilterOption.CaseSource]: caseSourceSearchMethod,
  [FilterOption.CaseStatus]: ({ id: value }) =>
    caseStatusConditionsSearchMethod({
      parentId: value?.selection,
      id: value?.conditions,
    }),
  [FilterOption.User]: userSearchMethod,
  [FilterOption.CaseAuthor]: caseAuthorSearchMethod,
  [FilterOption.CasePriority]: casePrioritySearchMethod,
  [FilterOption.CaseImpacted]: caseImpactedSearchMethod,
  [FilterOption.Contact]: contactSearchMethod,
  [FilterOption.Team]: teamSearchMethod,
  [FilterOption.CaseCloseReasonGroups]: ({ id: value, ...rest }) => {
    return caseCloseReasonsSearchMethod({
      parentId: value?.selection,
      id: value?.conditions,
      ...rest,
    });
  },
  [FilterOption.CaseSlaCondition]: ({ id: value, ...rest }) => {
    return slasConditionsSearchMethod({
      parentId: value?.selection,
      id: value?.conditions,
      ...rest,
    });
  },
};

export const FilterOptionToFilterConfigCreatorMap = {
  [FilterOption.CaseAssignee]: createCaseAssigneeFilterConfig,
  [FilterOption.ContactLabel]: createContactLabelFilterConfig,
  [FilterOption.ContactOwner]: createContactOwnerFilterConfig,
  [FilterOption.ContactGroup]: createContactGroupFilterConfig,
};
