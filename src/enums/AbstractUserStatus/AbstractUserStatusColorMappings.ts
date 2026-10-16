import AbstractUserStatus from './AbstractUserStatus.enum.js';

export const AbstractUserStatusColorMappings = {
	[AbstractUserStatus.ACTIVE]: 'success',
	[AbstractUserStatus.ONLINE]: 'success',
	[AbstractUserStatus.DND]: 'break-out',
	[AbstractUserStatus.BUSY]: 'error',
	[AbstractUserStatus.PAUSE]: 'break-out',
	[AbstractUserStatus.OFFLINE]: 'disabled',
};
