<template>
  <section class="typo">
    <h2>Typography</h2>
    <article class="typo__family">
      <h3 class="typo__family-heading">Heading:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <h4 class="typo__item-text typo__item-text--heading-1">Heading-1: </h4>
          <p>Usage:</p>
          <code class="language-css">.heading { @extend %typo-heading-1; }</code>
        </div>
        <div class="typo__item">
          <h4 class="typo__item-text typo__item-text--heading-2">Heading-2: </h4>
          <p>Usage:</p>
          <code class="language-css">
            .heading { @extend %typo-heading-2; }
          </code>
        </div>
        <div class="typo__item">
          <h4 class="typo__item-text typo__item-text--heading-3">Heading-3: </h4>
          <p>Usage:</p>
          <code class="language-css">
            .heading { @extend %typo-heading-3; }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Subtitle:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--subtitle-1">Subtitle-1:</div>
          <code class="language-css">
            .subtitle { @extend %typo-subtitle-1; }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--subtitle-2">Subtitle-2:</div>
          <code class="language-css">
            .subtitle { @extend %typo-subtitle-2; }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Body:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-1">Body-1:</div>
          <code class="language-css">
            .body { @extend %typo-body-1; }
          </code>
        </div>
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--body-2">Body-2:</div>
          <code class="language-css">
            .body { @extend %typo-body-2; }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Button:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--button">Button:</div>
          <code class="language-css">
            .btn { @extend %typo-button; }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Caption:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--caption">Caption:</div>
          <code class="language-css">
            .caption { @extend %typo-caption; }
          </code>
        </div>
      </div>
    </article>

    <article class="typo__family">
      <h3 class="typo__family-heading">Overline:</h3>
      <div class="typo__family-wrapper">
        <div class="typo__item">
          <div class="typo__item-text typo__item-text--overline">Overline:</div>
          <code class="language-css">
            .overline { @extend %typo-overline; }
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
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid black;

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
      &-1 {
        @extend %typo-heading-1;
      }

      &-2 {
        @extend %typo-heading-2;
      }

      &-3 {
        @extend %typo-heading-3;
      }
    }

    &--subtitle {
      &-1 {
        @extend %typo-subtitle-1;
      }

      &-2 {
        @extend %typo-subtitle-2;
      }
    }

    &--body {
      &-1 {
        @extend %typo-body-1;
      }

      &-2 {
        @extend %typo-body-2;
      }
    }

    &--button {
      @extend %typo-button;
    }

    &--caption {
      @extend %typo-caption;
    }

    &--overline {
      @extend %typo-overline;
    }
  }
}
</style>
