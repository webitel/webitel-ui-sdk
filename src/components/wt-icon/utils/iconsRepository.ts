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
	svg,
}: IconRepositoryEntry) {
	iconsRepository.set(iconName, dompurify.sanitize(svg));
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
