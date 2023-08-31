import convertDuration from '../../scripts/convertDuration';

const prettifyPauseCauseDuration = (min) => {
  const SEC_IN_MIN = 60;
  const secDuration = convertDuration(min * SEC_IN_MIN);
  return secDuration.slice(0, -3);
};

const isDurationOverflow = ({ durationMin, limitMin }) => {
  return (durationMin > limitMin) && limitMin !== 0;
};

const duration = ({ durationMin, limitMin }) => {
  return isDurationOverflow({ durationMin, limitMin })
    ? `-${prettifyPauseCauseDuration(durationMin - limitMin)}`
    : prettifyPauseCauseDuration(durationMin);
};

const pauseCauseProgressColor = ({ durationMin, limitMin }) => {
  if (isDurationOverflow({ durationMin, limitMin })) return 'danger';
  if (durationMin <= (limitMin * 0.75)) return 'success';
  return 'primary';
};

// eslint-disable-next-line import/prefer-default-export
export const useRepresentableAgentPauseCause = (pauseCauses) => {
  const prettifiedPauseCauses = pauseCauses.map((pauseCause) => ({
    ...pauseCause,

  }));
};
