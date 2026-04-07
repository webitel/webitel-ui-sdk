import { mount, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import AgentStatus from '../../../../enums/AgentStatus/AgentStatus.enum.js';
import * as AgentStatusAPIFactory from '../../api/agent-status.js';
import * as PauseCauseAPIFactory from '../../api/pause-cause.js';
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
// https://stackoverflow.com/a/63727813
vi.spyOn(PauseCauseAPIFactory, 'default').mockImplementation(() => ({
	getList: getAgentPauseCausesMock,
}));

const agentStatusMock = vi.fn(() => {});
// https://stackoverflow.com/a/63727813
vi.spyOn(AgentStatusAPIFactory, 'default').mockImplementation(() => ({
	patch: agentStatusMock,
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

describe('Wt Cc Agent Status Select', () => {
	beforeEach(() => {
		getAgentPauseCausesMock.mockClear();
	});
	it('renders a component', () => {
		const wrapper = shallowMount(WtCcAgentStatusSelect, mountOptions);
		expect(wrapper.exists()).toBe(true);
	});
	it(`at pause-cause-popup "change" event, triggers patch agent status
   with "pause" status and passed pauseCause`, async () => {
		const pauseCause = 'jest';
		const wrapper = mount(WtCcAgentStatusSelect, mountOptions);
		wrapper.vm.openPauseCausePopup();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		wrapper
			.findComponent({
				name: 'pause-cause-popup',
			})
			.vm.$emit('change', pauseCause);
		const reqPayload = {
			status: AgentStatus.PAUSE,
			agentId: agent.agentId,
			pauseCause: undefined,
			statusComment: undefined,
		};
		expect(agentStatusMock).toHaveBeenCalledWith(reqPayload);
	});
});
