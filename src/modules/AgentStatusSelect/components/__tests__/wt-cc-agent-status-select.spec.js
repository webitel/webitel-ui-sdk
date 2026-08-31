import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import AgentStatus from '../../../../enums/AgentStatus/AgentStatus.enum.js';
import AgentStatusAPI from '../../api/agent-status.js';
import PauseCauseAPI from '../../api/pause-cause.js';
import WtCcAgentStatusSelect from '../wt-cc-agent-status-select.vue';

const pauseCauses = [
	{
		name: 'jest1',
	},
	{
		name: 'jest2',
	},
];
const getAgentPauseCausesMock = vi.fn(() => ({
	items: pauseCauses,
}));
PauseCauseAPI.getList = getAgentPauseCausesMock;

const agentStatusMock = vi.fn(() => {});
AgentStatusAPI.patch = agentStatusMock;

const onlineSkillsGetListMock = vi.fn(() => ({
	items: [
		{
			id: 'default',
		},
	],
}));
vi.mock('@webitel/api-services/api', () => ({
	OnlineSkillsAPI: {
		getList: (...args) => onlineSkillsGetListMock(...args),
	},
}));

const agent = {
	status: '',
	agentId: 1,
};

const mountOptions = {
	props: {
		agentId: agent.agentId,
		status: agent.status,
	},
	global: {
		plugins: [
			createStore({}),
		],
	},
	shallow: true,
};

function emitStatusChange(wrapper, value) {
	wrapper
		.findComponent('.wt-cc-agent-status-select__status-select')
		.vm.$emit('change', value);
}

describe('Wt Cc Agent Status Select', () => {
	beforeEach(() => {
		getAgentPauseCausesMock.mockClear();
		agentStatusMock.mockClear();
		onlineSkillsGetListMock.mockClear();
	});
	it('renders a component', () => {
		const wrapper = shallowMount(WtCcAgentStatusSelect, mountOptions);
		expect(wrapper.exists()).toBe(true);
	});
	it(`at pause-cause-popup "change" event, triggers patch agent status
   with "pause" status and passed pauseCause`, async () => {
		const wrapper = mount(WtCcAgentStatusSelect, mountOptions);
		wrapper.vm.openPauseCausePopup();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		wrapper
			.findComponent({
				name: 'pause-cause-popup',
			})
			.vm.$emit('change', {
				pauseCause: 'coffee',
				statusComment: 'brb',
			});
		const reqPayload = {
			status: AgentStatus.PAUSE,
			agentId: agent.agentId,
			pauseCause: 'coffee',
			statusComment: 'brb',
		};
		expect(agentStatusMock).toHaveBeenCalledWith(reqPayload);
	});

	it(`at repeated "online" selection (already active status), if online skills
   exist, opens the activity-type popup instead of updating status`, async () => {
		onlineSkillsGetListMock.mockReturnValueOnce({
			items: [
				{
					id: 'default',
				},
				{
					id: 'skill1',
					name: 'Skill 1',
				},
			],
		});
		const wrapper = mount(WtCcAgentStatusSelect, {
			...mountOptions,
			props: {
				...mountOptions.props,
				status: AgentStatus.ONLINE,
			},
		});
		emitStatusChange(wrapper, AgentStatus.ONLINE);
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'activity-type-popup',
				})
				.exists(),
		).toBe(true);
		expect(agentStatusMock).not.toHaveBeenCalled();
	});

	it(`at repeated "online" selection (already active status), if no online
   skills exist, does not open a popup and does not update status`, async () => {
		const wrapper = mount(WtCcAgentStatusSelect, {
			...mountOptions,
			props: {
				...mountOptions.props,
				status: AgentStatus.ONLINE,
			},
		});
		emitStatusChange(wrapper, AgentStatus.ONLINE);
		await flushPromises();
		expect(onlineSkillsGetListMock).toHaveBeenCalled();
		expect(
			wrapper
				.findComponent({
					name: 'activity-type-popup',
				})
				.exists(),
		).toBe(false);
		expect(agentStatusMock).not.toHaveBeenCalled();
	});

	it(`at repeated "pause" selection (already active status), if pause causes
   exist, opens the pause-cause popup instead of updating status`, async () => {
		const wrapper = mount(WtCcAgentStatusSelect, {
			...mountOptions,
			props: {
				...mountOptions.props,
				status: AgentStatus.PAUSE,
			},
		});
		emitStatusChange(wrapper, AgentStatus.PAUSE);
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'pause-cause-popup',
				})
				.exists(),
		).toBe(true);
		expect(agentStatusMock).not.toHaveBeenCalled();
	});
});
