export const generateOption = () => ({
  text: '',
  score: 10,
});

export const generateQuestionOptionsSchema = () => ({
  type: 'options',
  options: [
    generateOption(),
  ],
});
