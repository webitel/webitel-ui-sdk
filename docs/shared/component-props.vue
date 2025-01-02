<template>
  <section class="props">
    <article class="docs-text">
      <h2>Props: </h2>
    </article>
    <wt-table
      :headers="headers"
      :data="properties"
      :selectable="false"
    >
      <template #value="{ item }">
        <code>{{ item.value }}</code>
      </template>
      <template #type="{ item }">
        <code>{{ item.type }}</code>
      </template>
      <template #default="{ item }">
        <code>{{ item.default }}</code>
      </template>
      <template #code="{ item }">
        <code>{{ item.code }}</code>
      </template>
      <template #description="{ item }">
        <div>
          <md-component
            v-if="item.description"
            :value="item.description"
          />
          <p v-if="item.options">
            Options: <code>{{ item.options }}</code>
          </p>
        </div>
      </template>
    </wt-table>
  </section>
</template>

<script>
import MdComponent from './md-component.vue';
  export default {
    name: 'ComponentProps',
    components: { MdComponent },
    props: {
      properties: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      headers() {
        return [
          { value: 'value', text: 'Name', width: '200px' },
          { value: 'required', text: 'Required', width: '70px' },
          { value: 'type', text: 'Type', width: '220px' },
          { value: 'default', text: 'Default', width: '160px' },
          { value: 'code', text: 'Example code' },
          { value: 'description', text: 'Description' },
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
