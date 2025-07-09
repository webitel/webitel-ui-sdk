import { MenubarScheme } from '@webitel/styleguide/component-schemes';

const generateCustomSlotCss = ({ slot, dt }) => `
        .p-menubar-${slot} {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: ${dt('menubar.gap')};
        }
`;

const menubar = {
  ...MenubarScheme.sizes,
  colorScheme: MenubarScheme.colorScheme,

  css: ({ dt }) => `
        ${generateCustomSlotCss({ slot: 'start', dt })}
        ${generateCustomSlotCss({ slot: 'end', dt })}
  `,
};

export default menubar;
