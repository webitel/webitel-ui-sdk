import prefixSelector from 'postcss-prefix-selector';
import { postcssIsolateStyles } from 'vitepress';

export default {
	plugins: [
		/* 
      @author HlukhovYe

      see: https://github.com/vuejs/vitepress/issues/4425
      This plugin fixes the issue with the isolation of styles in the documentation,
      because this styles have higher priority than other more specific styles
    */
		postcssIsolateStyles({
			includeFiles: [
				/vp-doc\.css/,
				/base\.css/,
			],
		}),
		prefixSelector({
			prefix: ':not(:where(.vp-raw *))',
			includeFiles: [
				/vp-doc\.css/,
			],
			transform(prefix, _selector) {
				const [selector, pseudo = ''] = _selector.split(/(:\S*)$/);
				return selector + prefix + pseudo;
			},
		}),
	],
};
