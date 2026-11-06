<script setup>
import { ref } from 'vue';
import { PasswordAction } from '@webitel/ui-sdk/enums';
import { generatePassword } from '@webitel/ui-sdk/scripts';

const password = ref('');
const generatedPassword = ref('');
</script>

<template>
  <wt-password
    v-model="password"
    label="Password"
    placeholder="Enter your password"
  />
  <wt-password
    v-model="generatedPassword"
    label="Password with copy and generate"
    :actions="[PasswordAction.Copy, PasswordAction.Generate, PasswordAction.Toggle]"
    @click:generate="generatedPassword = generatePassword()"
  />
</template>

<style scoped lang="scss"></style>
