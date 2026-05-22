import prefixSelector from 'postcss-prefix-selector';
import { postcssIsolateStyles } from 'vitepress';

export default {
	plugins: [
		/*
      @author HlukhovYe
      see: https://github.com/vuejs/vitepress/issues/4425

      VitePress base.css ship unlayered CSS resets (e.g. `input { border: 0 }`).
      Unlayered styles always beat @layer rules regardless of specificity, so they override
      PrimeVue's `@layer primevue` component styles — inputs lose their border and background.

      postcssIsolateStyles wraps the matched files in `@layer base`, making those resets layered.
      Since `base` is declared before `primevue` in src/css/main.css (@layer wt-default, base, primevue, wt-typography),
      PrimeVue's layer now wins over the resets.
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
