import montserratBlack from './Montserrat/Montserrat-Black.woff2';
import montserratBlackItalic from './Montserrat/Montserrat-BlackItalic.woff2';
import montserratBold from './Montserrat/Montserrat-Bold.woff2';
import montserratBoldItalic from './Montserrat/Montserrat-BoldItalic.woff2';
import montserratExtraBold from './Montserrat/Montserrat-ExtraBold.woff2';
import montserratExtraBoldItalic from './Montserrat/Montserrat-ExtraBoldItalic.woff2';
import montserratExtraLight from './Montserrat/Montserrat-ExtraLight.woff2';
import montserratExtraLightItalic from './Montserrat/Montserrat-ExtraLightItalic.woff2';
import montserratItalic from './Montserrat/Montserrat-Italic.woff2';
import montserratLight from './Montserrat/Montserrat-Light.woff2';
import montserratLightItalic from './Montserrat/Montserrat-LightItalic.woff2';
import montserratMedium from './Montserrat/Montserrat-Medium.woff2';
import montserratMediumItalic from './Montserrat/Montserrat-MediumItalic.woff2';
import montserratRegular from './Montserrat/Montserrat-Regular.woff2';
import montserratSemiBold from './Montserrat/Montserrat-SemiBold.woff2';
import montserratSemiBoldItalic from './Montserrat/Montserrat-SemiBoldItalic.woff2';
import montserratThin from './Montserrat/Montserrat-Thin.woff2';
import montserratThinItalic from './Montserrat/Montserrat-ThinItalic.woff2';

export const fontMap = {
	regular: montserratRegular,
	medium: montserratMedium,
	black: montserratBlack,
	italic: montserratItalic,
	light: montserratLight,
	lightItalic: montserratLightItalic,
	mediumItalic: montserratMediumItalic,
	semiBold: montserratSemiBold,
	semiBoldItalic: montserratSemiBoldItalic,
	bold: montserratBold,
	boldItalic: montserratBoldItalic,
	extraLight: montserratExtraLight,
	extraLightItalic: montserratExtraLightItalic,
	extraBold: montserratExtraBold,
	extraBoldItalic: montserratExtraBoldItalic,
	thin: montserratThin,
	thinItalic: montserratThinItalic,
	blackItalic: montserratBlackItalic,
} as const;

export type FontKey = keyof typeof fontMap;

export function preloadFonts(
	fontKeys: readonly FontKey[] = Object.keys(fontMap) as FontKey[],
) {
	fontKeys.forEach((key) => {
		const font = fontMap[key];

		if (document.querySelector(`link[href="${font}"]`)) return;

		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'font';
		link.type = 'font/woff2';
		link.href = font;
		link.crossOrigin = 'anonymous';

		document.head.appendChild(link);
	});
}
