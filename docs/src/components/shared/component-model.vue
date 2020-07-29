<template>
    <article>
      <h3>v-model:</h3>
      <div>Prop: <strong>{{prop}}</strong></div>
      <div>Event: <strong>{{event}}</strong></div>
    </article>
</template>

<script>
  export default {
    name: 'component-model',
    props: {
      prop: {
        type: String,
        default: 'value',
      },
      event: {
        type: String,
        default: 'input',
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
