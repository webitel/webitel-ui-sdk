export default function variableSearchValidator(value) {
  const isValid = /^(?!.*\s)[^\s=]+=[^\s=]+$/.test(value);
  return !value || isValid;
};
