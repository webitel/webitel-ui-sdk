import prefixSelector from 'postcss-prefix-selector';
import postcss from 'postcss';

/*
  @author HlukhovYe

  VitePress base.css ship unlayered resets (e.g. `input { border: 0 }`),
  which always beat any @layer rule including PrimeVue's. Wrapping them in `@layer base`
  puts them below `@layer primevue` in the priority order declared in src/css/main.css.
*/
const wrapResetStylesInBaseLayer = () => ({
	postcssPlugin: 'wrap-reset-styles-in-base-layer',
	OnceExit(root, { result }) {
		const from = result.opts.from ?? '';
		const isVpBase = from.includes('vitepress') && from.endsWith('base.css');
		if (!isVpBase) return;

		const layer = postcss.atRule({
			name: 'layer',
			params: 'base',
			raws: {
				between: ' ',
			},
		});
		root.each((node) => layer.append(node.clone()));
		root.removeAll();
		root.append(layer);
	},
});
wrapResetStylesInBaseLayer.postcss = true;

export default {
	plugins: [
		wrapResetStylesInBaseLayer(),
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
