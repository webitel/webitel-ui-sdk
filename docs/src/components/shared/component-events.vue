<template>
  <article class="events">
    <h3>Events: </h3>
    <article
      class="events-wrapper"
      v-for="(event, key) of events"
      :key="key"
    >
      <strong class="events__event">{{event.value}}</strong>
      <div class="event__params" v-if="event.params">
        <strong>Params:</strong>
        <ul>
          <li
            class="event__param"
            v-for="(param, key) of event.params"
            :key="key"
          >
            <div class="event__param-name"><strong>Name: </strong>{{param.name}}</div>
            <div class="event__param-type" v-if="param.type">
              <strong>Type: </strong>{{param.type}}
            </div>
            <div class="event__param-description" v-if="param.description">
              <strong>Description: </strong>{{param.description}}
            </div>
          </li>
        </ul>
      </div>
      <div v-if="event.description">
        <strong>Description: </strong>
        <p>{{event.description}}</p>
      </div>
    </article>
  </article>
</template>

<script>
  export default {
    name: 'component-events',
    props: {
      events: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .events-wrapper {
    margin: 30px;

    .events__event {
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
    .event__param {
      @extend %typo-body-md;
    }
  }
</style>
