import { AbstractUserStatus, AgentStatus, UserPresenceStatus } from '../enums';

export const parseUserPresence = (
	status?: string | null,
): Record<UserPresenceStatus, boolean> => ({
	[UserPresenceStatus.Dnd]: status?.includes('dnd') ?? false,
	[UserPresenceStatus.Busy]: status?.includes('dlg') ?? false,
	[UserPresenceStatus.Sip]: status?.includes('sip') ?? false,
	[UserPresenceStatus.Web]: status?.includes('web') ?? false,
});

// user can have several statuses at once, so the shown one is picked by priority, see WTEL-3798
export const getUserStatusByPriority = ({
	presence,
	agentStatus,
}: {
	presence?: {
		status?: string | null;
	} | null;
	agentStatus?: string | null;
}) => {
	const status = parseUserPresence(presence?.status);

	if (status[UserPresenceStatus.Dnd]) return AbstractUserStatus.DND;
	if (status[UserPresenceStatus.Busy]) return AbstractUserStatus.BUSY;

	if (!agentStatus)
		return status[UserPresenceStatus.Sip] || status[UserPresenceStatus.Web]
			? AbstractUserStatus.ACTIVE
			: AbstractUserStatus.OFFLINE;

	if (agentStatus === AgentStatus.ONLINE) return AbstractUserStatus.ONLINE;
	if (
		agentStatus === AgentStatus.PAUSE ||
		agentStatus === AgentStatus.BREAK_OUT
	)
		return AbstractUserStatus.PAUSE;

	return AbstractUserStatus.OFFLINE;
};
