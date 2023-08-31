import { shallowMount } from '@vue/test-utils';
import agentPauseCauseRepresentationMixin from '../useRepresentableAgentPauseCause';

describe('Agent Pause Cause Representation mixin', () => {
  const Component = {
    mixins: [agentPauseCauseRepresentationMixin],
    render() {},
  };
  it('prettifyPauseCauseDuration correctly computes time', () => {
    const wrapper = shallowMount(Component);
    const input = 112;
    const output = '01:52';
    expect(wrapper.vm.prettifyPauseCauseDuration(input)).toBe(output);
  });
  it('isDurationOverflow with limit = 0 returns false', () => {
    const wrapper = shallowMount(Component);
    const option = { durationMin: 10, limitMin: 0 };
    expect(wrapper.vm.isDurationOverflow(option)).toBe(false);
  });
  it('duration correctly computes duration', () => {
    const wrapper = shallowMount(Component);
    const pauseCause = { durationMin: 10, limitMin: 12 };
    expect(wrapper.vm.duration(pauseCause)).toBe('00:10');
  });
  it('duration correctly computes overflown duration', () => {
    const wrapper = shallowMount(Component);
    const pauseCause = { durationMin: 12, limitMin: 10 };
    expect(wrapper.vm.duration(pauseCause)).toBe('-00:02');
  });
  it('pauseCauseProgressColor correctly computes "danger" color', () => {
    const wrapper = shallowMount(Component);
    const pauseCause = { durationMin: 12, limitMin: 10 };
    expect(wrapper.vm.pauseCauseProgressColor(pauseCause)).toBe('danger');
  });
  it('pauseCauseProgressColor correctly computes "primary" color', () => {
    const wrapper = shallowMount(Component);
    const pauseCause = { durationMin: 8, limitMin: 10 };
    expect(wrapper.vm.pauseCauseProgressColor(pauseCause)).toBe('primary');
  });
  it('pauseCauseProgressColor correctly computes "success" color', () => {
    const wrapper = shallowMount(Component);
    const pauseCause = { durationMin: 5, limitMin: 10 };
    expect(wrapper.vm.pauseCauseProgressColor(pauseCause)).toBe('success');
  });
});
