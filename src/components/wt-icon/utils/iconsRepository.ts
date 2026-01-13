import dompurify from 'dompurify';

import icons from '../../../assets/icons/sprite/_index';

export type IconRepositoryEntry = {
	iconName: string;
	svg: string;
};

const iconsRepository = new Map<
	IconRepositoryEntry['iconName'],
	IconRepositoryEntry['svg']
>();

fillIconsRepository({
	icons: Object.entries(icons).map(([iconName, svg]) => ({
		iconName,
		svg,
	})),
});

export function getIconFromRepository(iconName: string) {
	return iconsRepository.get(iconName);
}

/* export */ function addIconToRepository({
	iconName,
	svg: rawSvg,
}: IconRepositoryEntry) {
	// should check for ssr coz dompurify is not available in ssr, and vitepress is ssr
	// https://github.com/vercel/next.js/issues/46893
	const svg = import.meta.env.SSR ? rawSvg : dompurify.sanitize(rawSvg);
	iconsRepository.set(iconName, svg);
}

export function fillIconsRepository({
	icons,
}: {
	icons: IconRepositoryEntry[];
}) {
	icons.forEach((entry) => {
		addIconToRepository(entry);
	});
}
