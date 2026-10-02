<template>
  <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: var(--wt-page-background-color)">
    <wt-content-wrapper v-for="align of ['left', 'center', 'stretch']" :key="align" :align="align">
      <wt-button>{{ align }}</wt-button>
    </wt-content-wrapper>
  </div>
</template>
