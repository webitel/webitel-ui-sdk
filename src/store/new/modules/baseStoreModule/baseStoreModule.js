import set from 'lodash/set';

const state = () => ({});

const getters = {};

const actions = {};

const mutations = {
  SET: (state, { path, value }) => {
    return set(state, path, value);
  },
};

export default () => ({
  state: state(),
  getters,
  actions,
  mutations,
  namespaced: true,
});
