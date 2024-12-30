<script setup></script>

<template>
  <wt-headline-nav
    :path="[
      { name: 'Admin' },
      { name: 'Contact-center' },
      {
        name: 'Queues',
        route: 'https://dev.webitel.com/contact-center/queues',
      },
    ]"
  ></wt-headline-nav>
</template>

<style lang="scss" scoped></style>
