import { flushPromises, shallowMount } from '@vue/test-utils';

import CommentCard from '../call-wave-comment-card.vue';

const comment = {
	id: '1',
	note: 'note',
	startSec: 3,
	endSec: 6,
	createdAt: '1700000000000',
	updatedAt: '1700000000000',
	createdBy: {
		name: 'Jane Doe',
	},
};

const mountCard = ({ saveNoteText = vi.fn(), ...commentOverrides } = {}) =>
	shallowMount(CommentCard, {
		props: {
			comment: {
				...comment,
				...commentOverrides,
			},
			saveNoteText,
		},
	});

const findButtons = (wrapper) =>
	wrapper.findAllComponents({
		name: 'wt-button',
	});

describe('Call wave comment card', () => {
	it('shows the comment range', () => {
		const wrapper = mountCard();
		expect(wrapper.text()).toContain('00:00:03 - 00:00:06');
	});

	it('marks an edited comment', () => {
		const wrapper = mountCard({
			updatedAt: '1700000100000',
		});
		expect(wrapper.find('.call-wave-comment-card__author').text()).toContain(
			'Edited',
		);
	});

	it('emits edit-range from the range edit icon', () => {
		const wrapper = mountCard();
		wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		expect(wrapper.emitted()['edit-range']).toBeTruthy();
	});

	it('does not allow saving an unchanged note', async () => {
		const wrapper = mountCard();
		await findButtons(wrapper)[0].vm.$emit('click');
		expect(findButtons(wrapper)[0].attributes('disabled')).toBe('true');
	});

	it('saves the edited note and leaves edit mode', async () => {
		const saveNoteText = vi.fn().mockResolvedValue(true);
		const wrapper = mountCard({
			saveNoteText,
		});
		await findButtons(wrapper)[0].vm.$emit('click');
		await wrapper
			.findComponent({
				name: 'wt-textarea',
			})
			.vm.$emit('update:modelValue', 'new note');
		await findButtons(wrapper)[0].vm.$emit('click');
		await flushPromises();
		expect(saveNoteText).toHaveBeenCalledWith('new note');
		expect(
			wrapper
				.findComponent({
					name: 'wt-textarea',
				})
				.exists(),
		).toBe(false);
	});

	it('stays in edit mode when saving fails', async () => {
		const wrapper = mountCard({
			saveNoteText: vi.fn().mockResolvedValue(false),
		});
		await findButtons(wrapper)[0].vm.$emit('click');
		await wrapper
			.findComponent({
				name: 'wt-textarea',
			})
			.vm.$emit('update:modelValue', 'new note');
		await findButtons(wrapper)[0].vm.$emit('click');
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'wt-textarea',
				})
				.exists(),
		).toBe(true);
	});
});
