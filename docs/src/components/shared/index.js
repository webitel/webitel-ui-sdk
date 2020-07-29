import Vue from 'vue';
import ComponentEvents from './component-events.vue';
import ComponentModel from './component-model.vue';
import ComponentProps from './component-props.vue';
import ComponentSlots from './component-slots.vue';

const Components = {
  ComponentEvents,
  ComponentModel,
  ComponentProps,
  ComponentSlots,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
