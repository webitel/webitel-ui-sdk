const enumReducer = (_enum, _import = 'import') => Object.entries(_enum).reduce((accumulator, entry) => (
  `${accumulator}
   ${entry[0]}: ${entry[1]}`
), _import);

export default enumReducer;
