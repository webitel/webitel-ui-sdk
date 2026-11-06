<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
	name: 'WtPasswordDocs',
	data: () => ({
		properties: [
			{
				value: 'modelValue',
				code: '<wt-password v-model="value"></wt-password>',
				type: 'String',
				default: '',
				description: 'Input value (v-model)',
			},
			{
				value: 'label',
				code: '<wt-password label="Password"></wt-password>',
				type: 'String',
				default: "t('vocabulary.password')",
				description: 'Input label, "Password" by default',
			},
			{
				value: 'placeholder',
				code: '<wt-password placeholder="Enter password"></wt-password>',
				type: 'String',
				default: '',
				description: 'Input placeholder',
			},
			{
				value: 'disabled',
				code: '<wt-password disabled></wt-password>',
				type: 'Boolean',
				default: 'false',
				description: 'Disable input and all its actions',
			},
			{
				value: 'required',
				code: '<wt-password required></wt-password>',
				type: 'Boolean',
				default: 'false',
				description: 'Show required asterisk in label',
			},
			{
				value: 'invalid',
				code: '<wt-password invalid></wt-password>',
				type: 'Boolean',
				default: 'false',
				description: 'Show invalid state',
			},
			{
				value: 'actions',
				code: '<wt-password :actions="[PasswordAction.Copy, PasswordAction.Generate, PasswordAction.Toggle]"></wt-password>',
				type: 'PasswordAction[]',
				default: '[PasswordAction.Toggle]',
				description:
					'Shown actions (PasswordAction enum from @webitel/ui-sdk/enums), rendered in the passed order. Each click emits click:[action]. Copy copies the value and is shown only when the field has a value. Generate unmasks the field, the parent sets the value (e.g. generatePassword from @webitel/ui-sdk/scripts). Toggle shows/hides the value (replaces the former toggleMask prop); without it the value is shown unmasked. Every action has a tooltip',
			},
			{
				value: 'hideHash',
				code: '<wt-password hide-hash></wt-password>',
				type: 'Boolean',
				default: 'false',
				description:
					'A saved password may come back as a hash (longer than 59 chars): such a value is not shown or copied. Typed text goes to v-model as is. Adds a label hint that an empty field keeps the saved value (a hint from labelProps wins)',
			},
		],
		events: [
			{
				value: 'update:modelValue',
				params: [
					{
						name: 'value',
						type: 'String',
					},
				],
				description: 'Emitted when input value changes',
			},
			{
				value: 'click:copy',
				params: [],
				description: 'Emitted on copy action click, after the value is copied',
			},
			{
				value: 'click:generate',
				params: [],
				description:
					'Emitted on generate action click, the parent sets the generated value',
			},
			{
				value: 'click:toggle',
				params: [],
				description:
					'Emitted on mask toggle click, after the value is shown/hidden',
			},
		],
		slots: [
			{
				name: 'label',
				scope: [
					{
						name: 'label',
					},
				],
				description: 'Custom label slot',
			},
		],
	}),
	mounted() {
		Prism.highlightAll();
	},
};
</script>

<style lang="scss" scoped></style>
