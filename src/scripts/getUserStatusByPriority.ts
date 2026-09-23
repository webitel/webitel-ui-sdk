import { AbstractUserStatus, AgentStatus } from '../enums';

export const parseUserPresence = (status?: string | null) => ({
	dnd: status?.includes('dnd') ?? false,
	busy: status?.includes('dlg') ?? false,
	sip: status?.includes('sip') ?? false,
	web: status?.includes('web') ?? false,
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

	if (status.dnd) return AbstractUserStatus.DND;
	if (status.busy) return AbstractUserStatus.BUSY;

	if (!agentStatus)
		return status.sip || status.web
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
