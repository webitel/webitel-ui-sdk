export const generateOption = () => ({
  name: '',
  score: 10,
});

export const generateQuestionOptionsSchema = () => ({
  type: 'options',
  options: [
    generateOption(),
  ],
});
