<template>
  <div class="playground">
    <!--    <wt-button color="primary">Save</wt-button>-->
    <wt-button-select
      :options="options"
      select-option="pes"
    >Save
    </wt-button-select>
  </div>
</template>

<script>

export default {
  name: 'playground',
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
    active: true,
  }),
  methods: {
    pes(option, index) {
      console.log('pes');
      console.log(option);
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>

.wt-select__arrow-caret {
  transform: rotate(0);
  transition: var(--transition);
  z-index: var(--select-caret-z-index);

  &--active {
    transform: rotate(180deg);
  }
}

.active {
  transform: rotate(180deg);
}

.playground {
  min-height: 100vh;
  padding: 90px;
  box-sizing: border-box;
}

.wt-button {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
