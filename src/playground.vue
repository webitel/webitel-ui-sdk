<script setup>
import PButton from 'primevue/button';

import WtButton from './components/wt-button/wt-button.vue';
</script>

<template>
  <div class="test-div">
    <wt-button>WEBITER</wt-button>
    <p-button>PRIMEVUE</p-button>
    <wt-button>PRIMEVUE</wt-button>
    <p-button>WEBITER</p-button>
    <p-button severity="transfer">PRIMEVUE</p-button>
  </div>
</template>

