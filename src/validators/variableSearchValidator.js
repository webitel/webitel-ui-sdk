export default function variableSearchValidator(input) {
  const [key, value] = input.split('=');

  return !(key.endsWith(' ') || value.startsWith(' '));
}
