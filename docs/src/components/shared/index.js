import Vue from 'vue';
import ComponentEvents from './component-events.vue';
import ComponentModel from './component-model.vue';
import ComponentProps from './component-props.vue';

const Components = {
  ComponentEvents,
  ComponentModel,
  ComponentProps,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
