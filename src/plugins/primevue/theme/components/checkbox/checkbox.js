import { CheckboxScheme } from "@webitel/styleguide/component-schemes";

const checkbox = {
  ...CheckboxScheme.sizes,
  colorScheme: CheckboxScheme.colorScheme,

  css: ({ dt }) => `
        .p-checkbox-box .wt-icon__icon {
            fill: ${dt('checkbox.icon.color')};
            width: ${dt('checkbox.icon.size')};
            height: ${dt('checkbox.icon.size')};
        }

        .p-checkbox-box .wt-icon--color-active .wt-icon__icon {
            fill: ${dt('checkbox.icon.checkedColor')};
        }

        .p-checkbox-box .wt-icon--color-disabled .wt-icon__icon {
            fill: ${dt('checkbox.icon.disabledColor')};
        }

        .p-checkbox:hover .wt-icon--color-active .wt-icon__icon {
            fill: ${dt('checkbox.icon.checkedHoverColor')};
        }

        .wt-checkbox:has(.wt-label:hover) .wt-icon--color-active .wt-icon__icon {
            fill: ${dt('checkbox.icon.checkedHoverColor')};
        }
        `,
};

export default checkbox;