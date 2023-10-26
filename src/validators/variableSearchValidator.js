export default function variableSearchValidator(input) {
  if (input) {
    const [key, value] = input.split('=');

    return !(key.endsWith(' ') || value.startsWith(' '));
  }
  return true;
}
