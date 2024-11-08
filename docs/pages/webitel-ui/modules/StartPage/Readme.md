# Start page

### Props:

| Name      | Type   | Default | Required | Description                                                             |
|-----------|--------|---------|----------|-------------------------------------------------------------------------|
| `nav`     | Array  | `[]`    | +        | Масив обʼєктів включаючих у себе ключі value, route, name, text, images |
| `appLogo` | Object | `{}`    | +        | Об'єкт з зображеннями логотипу для  light/dark теми                     |

## Example Code Start Page

```vue
<template>
  <start-page :nav="nav" :app-logo="logo" />
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import StartPage from '@webitel/ui-sdk/src/modules/StartPage/components/the-start-page.vue';
  import StartLogoLight from '../assets/start-page-logo-light.svg';
  import StartLogoDark from '../assets/start-page-logo-dark.svg';
  import ConfigurationLight from '../assets/configuration-section-light.svg';
  import ConfigurationDark from '../assets/configuration-section-dark.svg';
  import ContactsLight from '../assets/contacts-section-light.svg';
  import ContactsDark from '../assets/contacts-section-dark.svg';

  const { t } = useI18n();

  const logo = {
    light: StartLogoLight,
    dark: StartLogoDark
  }

  const nav = [
    {
      value: 'contacts',
      route: '/contacts',
      name: t(`startPage.contacts.name`),
      text: t(`startPage.contacts.text`),
      images: {
        light: ContactsLight,
        dark: ContactsDark,
      },
    },
    {
      value: 'configuration',
      route: '/configuration',
      name: t(`startPage.configuration.name`),
      text: t(`startPage.configuration.text`),
      images: {
        light: ConfigurationLight,
        dark: ConfigurationDark,
      },
    },
  ]
</script>
```
