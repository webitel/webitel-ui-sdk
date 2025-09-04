import { AvatarScheme } from '@webitel/styleguide/component-schemes';

const generateCustomSizeCss = ({ size, dt }) => `
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
        ${generateCustomSizeCss({ size: '2xs', dt })}
        ${generateCustomSizeCss({ size: 'xs', dt })}
        ${generateCustomSizeCss({ size: 'sm', dt })}
        ${generateCustomSizeCss({ size: 'md', dt })}
        ${generateCustomSizeCss({ size: '2xl', dt })}
        ${generateCustomSizeCss({ size: '3xl', dt })}
        
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
