import { InputGroupScheme } from '@webitel/styleguide/component-schemes';

/*  author @HlukhovYe
    selectors are including inputtext itself where .p-inputtext is sibling 
    and inputnumber where .p-inputtext is inside of the sibling block
*/
const addonStateStyle = (inputState, cssPropertyName, cssPropertyValue) => `
  .p-inputtext${inputState} ~ .p-inputgroupaddon,
  *:has(.p-inputtext${inputState}) ~ .p-inputgroupaddon,
  .p-inputgroupaddon:has(~ .p-inputtext${inputState}),
  .p-inputgroupaddon:has(~ * .p-inputtext${inputState}) {
    ${cssPropertyName}: ${cssPropertyValue};
  }
`;

const inputGroup = {
	...InputGroupScheme.sizes,
	colorScheme: InputGroupScheme.colorScheme,

	// transition is needed to copy input component transition value
	css: ({ dt }) => `
    .p-inputgroupaddon {
      transition: background ${dt('inputtext.transition.duration')},
                  color ${dt('inputtext.transition.duration')},
                  border-color ${dt('inputtext.transition.duration')},
                  outline-color ${dt('inputtext.transition.duration')},
                  box-shadow ${dt('inputtext.transition.duration')};
    }

    .p-inputtext ~ .p-inputgroupaddon,
    *:has(.p-inputtext) ~ .p-inputgroupaddon {
      padding-left: 0;
    }

    .p-inputgroupaddon:has(~ .p-inputtext),
    .p-inputgroupaddon:has(~ * .p-inputtext) {
      padding-right: 0;
    }

    ${addonStateStyle('.p-invalid', 'border-color', dt('inputtext.invalid.borderColor'))}
    ${addonStateStyle('.p-invalid:enabled:hover', 'border-color', dt('inputtext.invalidHoverBorderColor'))}
    ${addonStateStyle(':enabled:hover', 'border-color', dt('inputtext.hover.borderColor'))}
    ${addonStateStyle(':enabled:focus', 'border-color', dt('inputtext.focus.borderColor'))}
    ${addonStateStyle(':disabled', 'background', dt('inputtext.disabled.background'))}
  `,
};

export default inputGroup;
