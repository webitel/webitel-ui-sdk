import { $dt } from '@primeuix/themes';
import { WtTypography } from '@webitel/styleguide/enums';


export const generateWtTypographyCustomCss = ({ dt, typo, cssSelector }: { dt: typeof $dt, typo: WtTypography, cssSelector?: string }) => {
    const style = `
        font-size: ${dt(`typography.${typo}.font.size`)};
        font-weight: ${dt(`typography.${typo}.font.weight`)};
        line-height: ${dt(`typography.${typo}.lineHeight`)};
        text-transform: ${dt(`typography.${typo}.textTransform`)};
    `;

    if (cssSelector) {
        return `${cssSelector} {${style}}`;
    }

    return style;
};