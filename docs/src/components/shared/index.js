import Vue from 'vue';
import ComponentProps from './component-props.vue';

const Components = {
  ComponentProps,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
