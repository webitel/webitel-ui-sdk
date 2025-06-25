# FAQ

## Which code editor to use?

JetBrains WebStorm is highly recommended, but not required

### WebStorm code style config

## Recommended environment and tools

- Node.js - [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) - LTS(!) version
- npm (not yarn)
- GitKraken

## Compositions API vs Options API

Коротко: **по можливості, пишемо на Compositions API**. Це не завжди можливо,
тому що десь необхідні mixins, які, відповідно, форсять Options API. Але, по можливості,
краще старатись писати на Compositions, щоб відмовитись в перспективі від mixins в сторону
composables.
