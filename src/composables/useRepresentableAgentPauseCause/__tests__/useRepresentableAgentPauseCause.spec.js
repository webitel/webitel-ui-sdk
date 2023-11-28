import {
  useRepresentableAgentPauseCause,
} from '../useRepresentableAgentPauseCause';


describe('useRepresentableAgentPauseCause', () => {
  it('correctly computes duration', () => {
    const pauseCauses = { value: [{ durationMin: 10, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].duration).toBe('00:10');
  });
  it('isOverflow with limit = 0 returns false', () => {
    const pauseCauses = { value: [{ durationMin: 10, limitMin: 0 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].isOverflow).toBe(false);
  });
  it('isOverflow with duration < limit returns false', () => {
    const pauseCauses = { value: [{ durationMin: 10, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].isOverflow).toBe(false);
  });
  it('isOverflow with duration > limit returns true', () => {
    const pauseCauses = { value: [{ durationMin: 14, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].isOverflow).toBe(true);
  });

  it('isOverflow with duration = limit returns false', () => {
    const pauseCauses = { value: [{ durationMin: 12, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].isOverflow).toBe(false);
  });

  it('correctly computes progressColor', () => {
    const pauseCauses = { value: [{ durationMin: 10, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].progressColor).toBe('primary');
  });

  it('correctly computes progressColor with duration > limit', () => {
    const pauseCauses = { value: [{ durationMin: 14, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].progressColor).toBe('error');
  });

  it('correctly computes progressColor with duration < limit', () => {
    const pauseCauses = { value: [{ durationMin: 3, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].progressColor).toBe('success');
  });

it('correctly computes progressColor with duration = limit', () => {
  const pauseCauses = { value: [{ durationMin: 12, limitMin: 12 }] };
  const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].progressColor).toBe('primary');
  });

  it('correctly computes limit', () => {
    const pauseCauses = { value: [{ durationMin: 12, limitMin: 12 }] };
    const {
      representablePauseCause,
    } = useRepresentableAgentPauseCause(pauseCauses);
    expect(representablePauseCause.value[0].limit).toBe('00:12');
  });
});
