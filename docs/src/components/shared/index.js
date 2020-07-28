import Vue from 'vue';
import ComponentModel from './component-model.vue';
import ComponentProps from './component-props.vue';

const Components = {
  ComponentModel,
  ComponentProps,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
