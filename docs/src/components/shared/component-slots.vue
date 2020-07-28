<template>
  <article class="slots">
    <h3>Slots: </h3>
    <article
      class="slots-wrapper"
      v-for="(slot, key) of slots"
      :key="key"
    >
      <strong class="slots__slot">{{slot.name}}</strong>
      <div class="slot__scope" v-if="slot.scope">
        <strong>scope:</strong>
        <ul>
          <li
            class="slot__param"
            v-for="(scopeItem, key) of slot.scope"
            :key="key"
          >
            <div class="slot__param-name"><strong>Name: </strong>{{scopeItem.name}}</div>

            <div class="slot__param-description" v-if="scopeItem.description">
              <strong>Description: </strong>{{scopeItem.description}}
            </div>
          </li>
        </ul>
      </div>
      <div v-if="slot.description">
        <strong>Description: </strong>
        <p>{{slot.description}}</p>
      </div>
    </article>
  </article>
</template>

<script>
  export default {
    name: 'component-slots',
    props: {
      slots: {
        type: Array,
        default: () => [
          {
            name: 'default',
            description: 'Default content slot',
          },
        ],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .slots-wrapper {
    margin: 30px;

    .slots__slot {
      font-family: monospace;
      font-size: 18px;
    }

    > div {
      margin: 10px;

      p {
        margin-top: 5px;
        @extend %typo-body-md;
      }
    }
    .slot__param {
      @extend %typo-body-md;
    }
  }
</style>
