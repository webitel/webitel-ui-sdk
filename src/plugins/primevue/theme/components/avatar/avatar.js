import { AvatarScheme } from '@webitel/styleguide/component-schemes';

const generateCustomColorCss = ({ size, dt }) => `
        .p-avatar-${size} {
            width: ${dt(`avatar-${size}-width`)};
            height: ${dt(`avatar-${size}-width`)};
            font-size: ${dt(`avatar-${size}-font-size`)};
        }
`;

const avatar = {
  ...AvatarScheme.sizes,
  colorScheme: AvatarScheme.colorScheme,

  css: ({ dt }) => `
        ${generateCustomColorCss({ size: 'xs', dt })}
        ${generateCustomColorCss({ size: 'sm', dt })}
        ${generateCustomColorCss({ size: 'md', dt })}
        ${generateCustomColorCss({ size: '2xl', dt })}
        ${generateCustomColorCss({ size: '3xl', dt })}
        
        .p-avatar {
          display: block;
          background: transparent;
        }
        
        .p-avatar-label {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
  `,
};

export default avatar;
