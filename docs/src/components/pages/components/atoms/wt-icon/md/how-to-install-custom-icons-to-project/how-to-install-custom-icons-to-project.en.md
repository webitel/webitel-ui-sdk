### [How to install your custom icons to project?](#how-to-install-custom-icons)

`svg-sprite-loader` webpack rule in <code>vue.config.js</code> also collects all icons from `sprite`
directories in project and adds it to final sprite.

*In fact, webitel-ui icons are added to sprite just cause they're imported from
"sprite" directory - just in <code>node_modules</code>*

For stylistic purposes, it's recommended to allocate icons in <code>src/(app?)/assets/icons/sprite/*</code>,
So that developers and designer could find (and then check or update) them in any project.

All icons from this directory should be imported in <code>index.js</code> in this directory
(create `index.js` if it doesn't exist).

Then, `index.html` should be imported in `main.js`:
<pre class="language-javascript"><code>import './assets/icons/sprite';</code></pre>

And, then, if you put some new icons in this directory, and import them in `index.js`,
they automatically become available in project. 


#### Simple TODO:
* Create directory `src/(app?)/assets/icons/sprite/` (if doesn't exists)
* in this folder, create `index.js` (if doesn't exists)
* Import `index.js` to `>main.js` (if doesn't exists)
* Put icon to this directory, and import it to `index.js`
* That's all, you're awesome!
