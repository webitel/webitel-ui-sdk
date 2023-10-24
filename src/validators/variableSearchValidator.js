export default function variableSearchValidator(value) {
  const isValid = /^(\w+)=(?!\s).*?$/.test(value);
  return !value || isValid;
};
