export default function variableSearchValidator(value) {
  const isValid = /\s*([^=]+)\s*=\s*(.*?)(?=\s*[^=]+\s*|$)/g.test(value);
  return !value || isValid;
};
