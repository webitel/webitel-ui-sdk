const getNamespacedState = (state, namespace) => (
  namespace.split('/').reduce((subState, subNamespace) => subState[subNamespace], state)
);

export default getNamespacedState;
