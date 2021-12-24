<template>
  <section class="typo">
    <h2>Typography</h2>
    <article class="typo__family">
      <h3 class="typo__family-heading">Heading classes:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-lg">Heading large (24px): </div>
          <code class="language-css">.heading { @extend %typo-heading-1; }</code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-md">Heading medium (20px): </div>
          <code class="language-css">
            .heading {
              @extend %typo-heading-2;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--heading-sm">Heading small (18px): </div>
          <code class="language-css">
            .heading {
              @extend %typo-heading-3;
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
              @extend %typo-subtitle-1;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--strong-md">Strong medium (12px): </div>
          <code class="language-css">
            .strong {
              @extend %typo-subtitle-2;
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
              @extend %typo-body-1;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-md">Body medium (12px): </div>
          <code class="language-css">
            .body {
              @extend %typo-body-2;
            }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-sm">Body small (10px): </div>
          <code class="language-css">
            .body {
              @extend %typo-caption;
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
        @extend %typo-heading-1;
      }
      &-md {
        @extend %typo-heading-2;
      }
      &-sm {
        @extend %typo-heading-3;
      }
    }
    &--strong {
      &-lg {
        @extend %typo-subtitle-1;
      }
      &-md {
        @extend %typo-subtitle-2;
      }
      &-sm {
        @extend %typo-strong-sm;
      }
    }
    &--body {
      &-lg {
        @extend %typo-body-1;
      }
      &-md {
        @extend %typo-body-2;
      }
      &-sm {
        @extend %typo-caption;
      }
    }
  }
</style>
