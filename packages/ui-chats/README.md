# @webitel/ui-chats

Reusable Webitel Frontend Code for Chats UI

## Build steps

1. `npm ci` - install dependencies
2. `npm version patch --git-tag-version false` - bump version
3. `npm run lint:fix || true` - fix lint errors
4. `(npm run build:types || true)` - build types
5. `npm run lint:package` - lint package
6. `npm run utils:publish` - publish library