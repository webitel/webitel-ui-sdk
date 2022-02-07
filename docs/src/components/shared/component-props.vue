<template>
  <article class="props">
    <h3>Props: </h3>
    <article
      class="props-wrapper"
      v-for="(prop, key) of properties"
      :key="key"
    >
      <strong class="props__prop">{{prop.value}}</strong>
      <div class="prop__required" v-if="prop.required"><strong>Required</strong> {{prop.default}}</div>
      <div class="prop__code" v-if="prop.code">
        <pre><code class="language-html">{{prop.code}}</code></pre>
      </div>
      <div class="prop__type" v-if="prop.type"><strong>Type: </strong>{{prop.type}}</div>
      <div class="prop__options" v-if="prop.options">
        <strong>Options:</strong>
        <ul>
          <li
            v-for="(option, key) of prop.options"
            :key="key"
          >{{option}}
          </li>
        </ul>
      </div>
      <div class="prop__default" v-if="prop.default"><strong>Default:</strong> {{prop.default}}</div>
      <div v-if="prop.description">
        <strong>Description: </strong>
        <p>{{prop.description}}</p>
      </div>
    </article>
  </article>
</template>

<script>
  export default {
    name: 'component-props',
    props: {
      properties: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .props-wrapper {
    margin: 30px;

    .props__prop {
      font-family: monospace;
      font-size: 18px;
    }

    > div {
      margin: 10px;

      p {
        margin-top: 5px;
        @extend %typo-body-2;
      }
    }
  }
</style>
