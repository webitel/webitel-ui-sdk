import { CheckboxScheme } from "@webitel/styleguide/component-schemes";

const checkbox = {
  ...CheckboxScheme.sizes,
  colorScheme: CheckboxScheme.colorScheme,

  css: ({ dt }) => `
        .p-checkbox {
          width: ${dt('checkbox.root.wrapperWidth')};
          height: ${dt('checkbox.root.wrapperHeight')};
          align-items: center;
          justify-content: center;
        }

        .p-checkbox-box .wt-icon {
            color: ${dt('checkbox.icon.color')};
            width: ${dt('checkbox.icon.size')};
            height: ${dt('checkbox.icon.size')};
        }

        .p-checkbox-box .wt-icon--color-active {
            color: ${dt('checkbox.icon.checkedColor')};
        }

        .p-checkbox-box .wt-icon--color-disabled {
            color: ${dt('checkbox.icon.disabledColor')};
        }

        .p-checkbox:hover .wt-icon--color-active {
            color: ${dt('checkbox.icon.checkedHoverColor')};
        }

        .wt-checkbox:has(.wt-label:hover) .wt-icon--color-active {
            color: ${dt('checkbox.icon.checkedHoverColor')};
        }
        `,
};

export default checkbox;