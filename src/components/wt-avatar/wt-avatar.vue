<template>
	<PAvatar
:class="[`p-avatar-${props.size}`]" :shape="props.shape" :label="avatarLetters"
		:style="{ background: `var(${avatarLettersBackground})` }" class="wt-avatar">
		<template #default>
			<wt-badge v-if="badge" :color-variable="badgeColorVar" :icon-badge="isBadge ? props.status : null" />

			<img v-if="!isLetterAvatar" :src="imgSrc" alt="avatar" class="wt-avatar__img" />
		</template>
	</PAvatar>
</template>

<script setup>
import { computed } from 'vue';

import defaultAvatar from '../../assets/components/atoms/wt-avatar/default-avatar.svg';
import AbstractUserStatus from '../../enums/AbstractUserStatus/AbstractUserStatus.enum.js';

const props = defineProps({
	/**
	 * Avatar pic. IMPORTANT: if this pic is stored locally in project, pass to this prop only pic, imported and passed to data as property
	 * @type {String}
	 */
	src: {
		type: String,
	},
	/**
	 * Avatar size
	 * @type {String}
	 * @default 'md'
	 * @options ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
	 */
	size: {
		type: String,
		default: 'md',
		options: [
			'xs',
			'sm',
			'md',
			'lg',
			'xl',
			'2xl',
			'3xl',
		],
	},
	/**
	 * Draw status badge
	 * @type {Boolean}
	 * @default false
	 */
	badge: {
		type: Boolean,
		default: false,
	},
	/**
	 * If passed, avatar is letter-based (if not passed src)
	 * @type {String}
	 */
	username: {
		type: String,
		description: 'If passed, avatar is letter-based (if not passed src)',
	},
	/**
	 * Color of the badge
	 * @type {String<AbstractUserStatus>}
	 * @default AbstractUserStatus.OFFLINE
	 */
	status: {
		type: String,
		options: AbstractUserStatus,
		default: AbstractUserStatus.OFFLINE,
	},
	/**
	 * Shape of the element.
	 * @type {String}
	 * @default 'circle'
	 * @options ['circle', 'square']
	 */
	shape: {
		type: String,
		default: 'circle',
		options: [
			'circle',
			'square',
		],
	},
});

const isLetterAvatar = computed(() => !props.src && props.username);

const avatarLetters = computed(() => {
	if (!props.username) return '';
	const abbreviation = props.username
		.trim()
		.replace(/\s+/g, ' ') //change several spaces to one
		.split(' ')
		.map((word) => word.at(0).toUpperCase())
		.join('');
	return abbreviation.length > 2
		? abbreviation.at(0).concat(abbreviation.at(-1))
		: abbreviation;
});

const avatarLettersBackground = computed(() => {
	if (!avatarLetters.value) {
		return '';
	}
	// en.concat(uk)
	const letterList = [
		{
			letters: 'AB'.concat('АБВ'),
			color: '--p-avatar-letters-p1-color',
		},
		{
			letters: 'CD'.concat('ГҐД'),
			color: '--p-avatar-letters-p2-color',
		},
		{
			letters: 'EF'.concat('ЕЄЖ'),
			color: '--p-avatar-letters-p3-color',
		},
		{
			letters: 'GH'.concat('ЗИІ'),
			color: '--p-avatar-letters-p4-color',
		},
		{
			letters: 'IJ'.concat('ЇЙК'),
			color: '--p-avatar-letters-p5-color',
		},
		{
			letters: 'KL'.concat('ЛМН'),
			color: '--p-avatar-letters-p6-color',
		},
		{
			letters: 'MN'.concat('ОПР'),
			color: '--p-avatar-letters-p7-color',
		},
		{
			letters: 'OP'.concat('СТУ'),
			color: '--p-avatar-letters-p8-color',
		},
		{
			letters: 'QR'.concat('ФХЦ'),
			color: '--p-avatar-letters-p9-color',
		},
		{
			letters: 'ST'.concat('ЧШЩ'),
			color: '--p-avatar-letters-p10-color',
		},
		{
			letters: 'UV'.concat('ЬЮЯ'),
			color: '--p-avatar-letters-p11-color',
		},
		{
			letters: 'WX'.concat(''),
			color: '--p-avatar-letters-p12-color',
		},
		{
			letters: 'YZ'.concat(''),
			color: '--p-avatar-letters-p13-color',
		},
	];
	const searchedLetter = letterList.find(({ letters }) =>
		letters.includes(
			avatarLetters.value
				.at(0)
				.trim()
				.replace(/\s+/g, ' ') //change several spaces to one
				.toUpperCase(),
		),
	);
	return searchedLetter?.color || '--p-avatar-letters-p1-color';
});

const imgSrc = computed(() => props.src || defaultAvatar);

const isBadge = computed(() => {
	const eligibleStatuses = [
		AbstractUserStatus.DND,
		AbstractUserStatus.ONLINE,
		AbstractUserStatus.PAUSE,
	];
	return eligibleStatuses.includes(props.status);
});

const badgeColorVar = computed(() => {
	switch (props.status) {
		case AbstractUserStatus.ACTIVE:
			return 'online-color';
		case AbstractUserStatus.DND:
			return 'dnd-color';
		case AbstractUserStatus.BUSY:
			return 'busy-color';
		case AbstractUserStatus.OFFLINE:
			return 'offline-color';
		case AbstractUserStatus.ONLINE:
			return 'online-color';
		case AbstractUserStatus.PAUSE:
			return 'pause-color';
		default:
			return 'offline-color';
	}
});
</script>

<style scoped>
.wt-avatar {
	position: relative;
	user-select: none;
}

.wt-avatar__letters {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	height: 100%;
	width: 100%;
	color: var(--wt-avatar-text-color);
}

.wt-avatar__img {
	border-radius: 50%;
	width: 100%;
	height: 100%;
}
</style>
