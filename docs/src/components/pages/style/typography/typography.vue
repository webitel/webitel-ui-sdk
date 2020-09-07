<template>
  <section class="typo">
    <h2>Typography</h2>
    <article class="typo__family">
      <h3 class="typo__family-heading">Heading classes:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-lg">Heading large (24px): </div>
          <code class="language-css">.heading { @extend %typo-heading-lg; }</code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-md">Heading medium (20px): </div>
          <code class="language-css">
            .heading {
              @extend %typo-heading-md;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-sm">Heading small (18px): </div>
          <code class="language-css">
            .heading {
              @extend %typo-heading-sm;
            }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Strong classes:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--strong-lg">Strong large (14px): </div>
          <code class="language-css">
            .strong {
              @extend %typo-strong-lg;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--strong-md">Strong medium (12px): </div>
          <code class="language-css">
            .strong {
              @extend %typo-strong-md;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--strong-sm">Strong small (10px): </div>
          <code class="language-css">
            .strong {
              @extend %typo-strong-sm;
            }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Body classes:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-lg">Body large (14px): </div>
          <code class="language-css">
            .body {
              @extend %typo-body-lg;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-md">Body medium (12px): </div>
          <code class="language-css">
            .body {
              @extend %typo-body-md;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-sm">Body small (10px): </div>
          <code class="language-css">
            .body {
              @extend %typo-body-sm;
            }
          </code>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'typography',
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  .typo__family {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid black;
  }

  .typo__family-heading {
    margin-bottom: 10px;
  }

  .typo__family-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  .typo__item {
  }

  .typo__item-text {
    margin-bottom: 10px;

    &--heading {
      &-lg {
        @extend %typo-heading-lg;
      }
      &-md {
        @extend %typo-heading-md;
      }
      &-sm {
        @extend %typo-heading-sm;
      }
    }
    &--strong {
      &-lg {
        @extend %typo-strong-lg;
      }
      &-md {
        @extend %typo-strong-md;
      }
      &-sm {
        @extend %typo-strong-sm;
      }
    }
    &--body {
      &-lg {
        @extend %typo-body-lg;
      }
      &-md {
        @extend %typo-body-md;
      }
      &-sm {
        @extend %typo-body-sm;
      }
    }
  }
</style>
