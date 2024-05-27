import { mount, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AgentStatus from '../../../../enums/AgentStatus/AgentStatus.enum';
import * as AgentStatusAPIFactory from '../../api/agent-status';
import * as PauseCauseAPIFactory from '../../api/pause-cause';
import WtCcAgentStatusSelect from '../wt-cc-agent-status-select.vue';

const pauseCauses = [{ name: 'jest1' }, { name: 'jest2' }];
const getAgentPauseCausesMock = vi.fn(() => ({ items: pauseCauses }));
// https://stackoverflow.com/a/63727813
vi.spyOn(PauseCauseAPIFactory, 'default')
.mockImplementation(() => ({ getList: getAgentPauseCausesMock }));

const agentStatusMock = vi.fn(() => {});
// https://stackoverflow.com/a/63727813
vi.spyOn(AgentStatusAPIFactory, 'default')
.mockImplementation(() => ({ patch: agentStatusMock }));

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
    plugins: [createStore({})],
  },
  shallow: true,
};

describe('Wt Cc Agent Status Select', () => {
  beforeEach(() => {
    getAgentPauseCausesMock.mockClear();
  });
  it('renders a component', () => {
    const wrapper = shallowMount(WtCcAgentStatusSelect, mountOptions);
    expect(wrapper.exists())
    .toBe(true);
  });
  it(`at wt-status-select "change" to "online" event, triggers agent status patch
   with "online" status`, () => {
    const wrapper = shallowMount(WtCcAgentStatusSelect, mountOptions);
    wrapper.findComponent({ name: 'wt-status-select' })
    .vm.$emit('change', AgentStatus.ONLINE);
    const reqPayload = {
      status: AgentStatus.ONLINE, agentId: agent.agentId, payload: undefined,
    };
    expect(agentStatusMock).toHaveBeenCalledWith(reqPayload);
  });
  it('at wt-status-select "change" to "pause" event, pause causes are loaded', async () => {
    const wrapper = shallowMount(WtCcAgentStatusSelect, mountOptions);
    wrapper.findComponent({ name: 'wt-status-select' })
    .vm.$emit('change', AgentStatus.PAUSE);
    await wrapper.vm.$nextTick();
    expect(getAgentPauseCausesMock).toHaveBeenCalled();
  });
  it(`at wt-status-select "change" to "pause" event and pause causes truthy response,
   pause-cause-popup appears`, async () => {
    const wrapper = mount(WtCcAgentStatusSelect, mountOptions);
    wrapper.findComponent({ name: 'wt-status-select' })
    .vm.$emit('change', AgentStatus.PAUSE);
    await wrapper.vm.$nextTick(); // load pause causes
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // render popup
    expect(wrapper.findComponent({ name: 'pause-cause-popup' }).isVisible())
    .toBe(true);
  });
  it(`at pause-cause-popup "change" event, triggers patch agent status
   with "pause" status and passed pauseCause`, async () => {
    const pauseCause = 'jest';
    const wrapper = mount(WtCcAgentStatusSelect, mountOptions);
    wrapper.vm.openPauseCausePopup();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.findComponent({ name: 'pause-cause-popup' })
    .vm.$emit('change', pauseCause);
    const reqPayload = {
      status: AgentStatus.PAUSE, agentId: agent.agentId, pauseCause,
    };
    expect(agentStatusMock).toHaveBeenCalledWith(reqPayload);
  });
});
