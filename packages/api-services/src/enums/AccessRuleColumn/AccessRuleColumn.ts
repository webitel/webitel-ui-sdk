import { AccessRuleName } from '../AccessRuleName/AccessRuleName';

/** [Claude] which access rule each permissions table column edits */
export const AccessRuleColumn = {
	create: AccessRuleName.X,
	read: AccessRuleName.R,
	edit: AccessRuleName.W,
	delete: AccessRuleName.D,
} as const;

export type AccessRuleColumn = keyof typeof AccessRuleColumn;
