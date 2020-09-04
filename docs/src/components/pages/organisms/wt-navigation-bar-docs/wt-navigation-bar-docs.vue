<template>
  <section>
    <h2>Navigation bar</h2>
    <article>
      <div class="example-wrapper">
        <wt-navigation-bar
          :current-app="'history'"
          :nav="[
            { value: '1', name: 'Name 1', route: '/1' },
            { value: 'exp1', name: 'Expansion 1', subNav: [
            { value: '2', name: 'Name 2', route: '/2' },
            { value: '3', name: 'Name 3', route: '/3' },
            ] },
            { value: 'exp2', name: 'Expansion 2', subNav: [
            { value: '4', name: 'Name 4', route: '/4' },
            { value: '5', name: 'Name 5', route: '/5' },
            ] },
            ]"
        ></wt-navigation-bar>
        <pre><code
          class="language-html">
        &lt;wt-navigation-bar
          :current-app="'history'"
          :nav="[
            { value: '1', name: 'Name 1', route: '/1' },
            { value: 'exp1', name: 'Expansion 1', subNav: [
            { value: '2', name: 'Name 2', route: '/2' },
            { value: '3', name: 'Name 3', route: '/3' },
            ] },
            { value: 'exp2', name: 'Expansion 2', subNav: [
            { value: '4', name: 'Name 4', route: '/4' },
            { value: '5', name: 'Name 5', route: '/5' },
            ] },
            ]"
        &gt;&lt;/wt-navigation-bar&gt;
        </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'headline',
  data: () => ({
    properties: [
      {
        value: 'activeApp',
        code: '<wt-navigation-bar active-app="admin"></wt-navigation-bar>',
        type: 'String',
        description: 'Currently opened app',
      },
      {
        value: 'nav',
        code: '<wt-navigation-bar :nav="nav"></wt-navigation-bar>',
        type: 'Array',
        default: '[]',
        description: `Should receive array of nav objects. All objects should have following properties:
        "value" -- main inner logic property, should be unique. "name" -- display name. If none,
         displays "value" property. "route" -- relative path, used for :to attr ib router-link component.
          "subNav": array of objects, with properties, described above.`,
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
