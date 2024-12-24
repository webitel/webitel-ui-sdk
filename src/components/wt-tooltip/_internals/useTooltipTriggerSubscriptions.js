// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/util/events.ts
import { onBeforeUnmount, onMounted } from 'vue';

const SHOW_EVENT_MAP = {
  hover: 'mouseenter',
  focus: 'focus',
  click: 'click',
  touch: 'touchstart',
  pointer: 'pointerdown',
};

// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/util/events.ts
const HIDE_EVENT_MAP = {
  hover: 'mouseleave',
  focus: 'blur',
  click: 'click',
  touch: 'touchend',
  pointer: 'pointerup',
};

// eslint-disable-next-line import/prefer-default-export
export const useTooltipTriggerSubscriptions = ({ target, triggers, show, hide }) => {
  const subscribeTriggers = () => {
    const setEventListeners = (target, triggers) => {
      triggers.forEach((trigger) => {
        const showEvent = SHOW_EVENT_MAP[trigger];
        if (showEvent) {
          target.addEventListener(showEvent, show);
        } else {
          console.log(`No Tooltip Show event for ${trigger} trigger`);
        }
        const hideEvent = HIDE_EVENT_MAP[trigger];
        if (hideEvent) {
          target.addEventListener(hideEvent, hide);
        } else {
          console.log(`No Tooltip Hide event for ${trigger} trigger`);
        }
      });
    };

    setEventListeners(target.value, triggers);
  };
  const unsubscribeTriggers = () => {
    const unsetEventListeners = (target, triggers) => {
      triggers.forEach((trigger) => {
        const showEvent = SHOW_EVENT_MAP[trigger];
        if (showEvent) {
          target.removeEventListener(showEvent, show);
        } else {
          console.log(`No Tooltip Show event for ${trigger} trigger`);
        }
        const hideEvent = HIDE_EVENT_MAP[trigger];
        if (hideEvent) {
          target.removeEventListener(hideEvent, hide);
        } else {
          console.log(`No Tooltip Hide event for ${trigger} trigger`);
        }
      });
    };

    unsetEventListeners(target.value, triggers);
  };

  onMounted(() => subscribeTriggers());
  onBeforeUnmount(() => unsubscribeTriggers());
};
