# How to add Docs section to (new) Webitel UI docs

## Adding new component
_By new component we mean "New component" == has `.vue` extension and stored in `components` folder_

### Theory
1. [How Vue Styleguidist locates components](https://vue-styleguidist.github.io/docs/Components.html#finding-components)

2. [How to add docs to a component](https://vue-styleguidist.github.io/docs/Documenting.html#usage-examples-and-readme-files)

2. How to document component 
[props](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments),
[events](https://vue-styleguidist.github.io/docs/Documenting.html#events),
[slots](https://vue-styleguidist.github.io/docs/Documenting.html#slots)

2. [How to add examples to a component](https://vue-styleguidist.github.io/docs/Documenting.html#writing-code-examples)ччч

### Practice
1. Create `Readme.md` file (capitalized!) in the same folder as component

2. If styleguide is already running, restart it to locale new `Readme.md` file

2. Comment props, events and slots as listed in [Theory](#theory) section

3. Add code examples as described in [Theory](#theory) section

## Adding new docs page, not related to any component
### Theory
1. Sections [docs](https://vue-styleguidist.github.io/docs/Components.html#sections)

### Practice
1. Add `.md` file anywhere you need it. It would be great to store it in the same folder as documented entity

2. In `styleguide.config.js` add new section to `sections` array. As `.md` files, not related to components, doesn't detect automatically,
you need to specify its direct location

3. Restart styleguide to see changes

