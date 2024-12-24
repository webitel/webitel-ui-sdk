<template>
  <wt-empty
    headline="Component is fully built using props"
    image="https://via.placeholder.com/150"
    primary-action-text="alert me"
    secondary-action-text="me too"
    text="There is no data to display"
    title="No data"
    @click:primary="handleClick('primary')"
    @click:secondary="handleClick('secondary')"
  />
</template>

<script setup>
const props = defineProps({});

const emit = defineEmits([]);

const handleClick = (action) => {
  alert(`Clicked ${action}`);
};
</script>

<style lang="scss" scoped>
.example-empty {

}
</style>
