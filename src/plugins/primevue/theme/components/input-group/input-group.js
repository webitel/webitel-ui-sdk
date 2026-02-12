import { InputGroupScheme } from '@webitel/styleguide/component-schemes';

/*  author @HlukhovYe
    selectors are including inputtext itself where .p-inputtext is sibling 
    and inputnumber where .p-inputtext is inside of the sibling block
*/
const addonStateStyle = (inputState, cssProperty, dtToken, dt) => `
  .p-inputtext${inputState} ~ .p-inputgroupaddon,
  *:has(.p-inputtext${inputState}) ~ .p-inputgroupaddon,
  .p-inputgroupaddon:has(~ .p-inputtext${inputState}),
  .p-inputgroupaddon:has(~ * .p-inputtext${inputState}) {
    ${cssProperty}: ${dt(dtToken)};
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

    ${addonStateStyle('.p-invalid', 'border-color', 'inputtext.invalid.borderColor', dt)}
    ${addonStateStyle('.p-invalid:enabled:hover', 'border-color', 'inputtext.invalidHoverBorderColor', dt)}
    ${addonStateStyle(':enabled:hover', 'border-color', 'inputtext.hover.borderColor', dt)}
    ${addonStateStyle(':enabled:focus', 'border-color', 'inputtext.focus.borderColor', dt)}
    ${addonStateStyle(':disabled', 'background', 'inputtext.disabled.background', dt)}
  `,
};

export default inputGroup;
