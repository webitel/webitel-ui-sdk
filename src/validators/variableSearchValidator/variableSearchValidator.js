export default function variableSearchValidator(input) {
  if (input) {
    const splitInput = input.split('=');
    const [key, value] = splitInput;
    if (key.endsWith(' ') || value.startsWith(' ') || splitInput.length !== 2) {
      return false;
    }
  }
  return true;
}
