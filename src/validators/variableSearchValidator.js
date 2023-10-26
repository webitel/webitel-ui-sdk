export default function variableSearchValidator(input) {
  const splitInput = input.split('=');
  if (splitInput.length !== 2) {
    return false;
  }

  const [key, value] = splitInput;

  if (key.endsWith(' ')) {
    return false;
  }

  if (value.startsWith(' ')) {
    return false;
  }

  return !input || true;
};
