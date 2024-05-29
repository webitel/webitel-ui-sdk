import AgentStatus from '../../../enums/AgentStatus/AgentStatus.enum.js';

export default [
  {
    locale: 'webitelUI.statusSelect.online',
    color: 'success',
    value: AgentStatus.ONLINE,
  },
  {
    locale: 'webitelUI.statusSelect.pause',
    color: 'primary',
    value: AgentStatus.PAUSE,
  },
  {
    locale: 'webitelUI.statusSelect.offline',
    color: 'disabled',
    value: AgentStatus.OFFLINE,
  },
  {
    locale: 'webitelUI.statusSelect.breakOut',
    color: 'break-out',
    value: AgentStatus.BREAK_OUT,
  },
];
