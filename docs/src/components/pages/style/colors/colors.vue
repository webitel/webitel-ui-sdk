<template>
  <section class="colors">
    <h2>Main Colors</h2>
    <article
      class="colors__family"
      v-for="(colorFamily, key) of mainColors"
      :key="key"
    >
      <h3 class="colors__family-heading">{{ colorFamily.title }}</h3>
      <div class="colors__family-wrapper">
        <div
          class="color-item"
          v-for="(color, key) of colorFamily.colors"
          :key="key"
        >
          <div
            class="color-item__color"
            :style="{background: `var(${color.color})`}"
          ><strong :style="{color: `${color.textColor}`}">{{ color.code }}</strong>
          </div>
          <div class="color-item__text-wrapper">
            <div class="color-item__name">{{ color.name }}</div>
            <div class="color-item__code">{{ color.color }}</div>
            <p class="color-item__description">{{ color.description }}</p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
const ACCENT_COLOR_HUE = 42;
const SECONDARY_COLOR_HUE = 202;
const PAGE_BG_COLOR_HUE = 209;
const POSITIVE_COLOR_HUE = 119;
const NEGATIVE_COLOR_HUE = 11;
const HOLD_COLOR_HUE = 54;
const TRANSFER_COLOR_HUE = 227;
const JOB_COLOR_HUE = 209;
const ICON_COLOR_HUE = 202;

const ACCENT_COLOR = `${ACCENT_COLOR_HUE}, 100%, 50%`;
const MAIN_COLOR = `${ACCENT_COLOR_HUE}, 20%, 99%`;
const CONTRAST_COLOR = `${ACCENT_COLOR_HUE}, 20%, 1%`;
const SECONDARY_COLOR = `${SECONDARY_COLOR_HUE}, 20%, 90%`;
const SECONDARY_COLOR_50 = `${SECONDARY_COLOR_HUE}, 22%, 94%`;
const PAGE_BG_COLOR = `${PAGE_BG_COLOR_HUE}, 20%, 95%`;
const HEADER_COLOR = `${PAGE_BG_COLOR_HUE}, 20%, 90%`;
const POSITIVE_COLOR = `${POSITIVE_COLOR_HUE}, 60%, 40%`;
const NEGATIVE_COLOR = `${NEGATIVE_COLOR_HUE}, 80%, 50%`;
const HOLD_COLOR = `${HOLD_COLOR_HUE}, 80%, 50%`;
const TRANSFER_COLOR = `${TRANSFER_COLOR_HUE}, 80%, 50%`;
const JOB_COLOR = `${JOB_COLOR_HUE}, 96%, 57%`;
const ICON_COLOR = `${ICON_COLOR_HUE}, 100%, 15%`;

const MAIN_COLOR_OPACITY = 1;
const DEFAULT_OPACITY = 0.8;
const HOVER_OPACITY = 1;
const ACTIVE_OPACITY = 1;
// const FOCUS_OPACITY = 0.8;
const DISABLED_OPACITY = 0.4;

const FORM_PLACEHOLDER_OPACITY = 0.4;
const FORM_PLACEHOLDER_OPACITY__HOVER = 0.6;
const FORM_BORDER_DISABLED_OPACITY = 0.05;

export default {
  name: 'colors',
  data: () => ({
    mainColors: [
      {
        title: 'Main colors',
        colors: [
          {
            textColor: '#fff',
            code: `hsla(${ACCENT_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--accent-color',
            name: 'Accent color',
          },
          {
            textColor: '#000',
            code: `hsla(${MAIN_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--main-color',
            name: 'Main color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--contrast-color',
            name: 'Contrast color',
          },
          {
            textColor: '#000',
            code: `hsla(${SECONDARY_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--secondary-color',
            name: 'Secondary color',
          },
          {
            textColor: '#000',
            code: `hsla(${SECONDARY_COLOR_50}, ${MAIN_COLOR_OPACITY})`,
            color: '--secondary-color-50',
            name: 'Secondary color 50',
          },
          {
            textColor: '#000',
            code: `hsla(${PAGE_BG_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--page-bg-color',
            name: 'Page background color',
          },
          {
            textColor: '#000',
            code: `hsla(${HEADER_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--header-color',
            name: 'Header color',
          },
          {
            textColor: '#000',
            code: `hsla(${ACCENT_COLOR}, 0.3)`,
            color: '--accent-secondary-color',
            name: 'Accent secondary color',
          },
        ],
      },
      {
        title: 'Semantic colors',
        colors: [
          {
            textColor: '#000',
            code: `hsla(${CONTRAST_COLOR}, ${DISABLED_OPACITY})`,
            color: '--disabled-color',
            name: 'Disabled color',
          },
          {
            textColor: '#000',
            code: `hsla(${POSITIVE_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--true-color',
            name: 'True color',
          },
          {
            textColor: '#000',
            code: `hsla(${POSITIVE_COLOR}, ${HOVER_OPACITY})`,
            color: '--true--hover-color',
            name: 'True hover color',
          },
          {
            textColor: '#000',
            code: `hsla(${NEGATIVE_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--false-color',
            name: 'False color',
          },
          {
            textColor: '#000',
            code: `hsla(${NEGATIVE_COLOR}, ${HOVER_OPACITY})`,
            color: '--false--hover-color',
            name: 'False hover color',
          },
          {
            textColor: '#000',
            code: `hsla(${NEGATIVE_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--hold-color',
            name: 'Hold color',
          },
          {
            textColor: '#000',
            code: `hsla(${HOLD_COLOR}, ${HOVER_OPACITY})`,
            color: '--hold--hover-color',
            name: 'Hold hover color',
          },
          {
            textColor: '#000',
            code: `hsla(${TRANSFER_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--transfer-color',
            name: 'Transfer color',
          },
          {
            textColor: '#000',
            code: `hsla(${TRANSFER_COLOR}, ${HOVER_OPACITY})`,
            color: '--transfer--hover-color',
            name: 'Transfer hover color',
          },
          {
            textColor: '#000',
            code: `hsla(${JOB_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--job-color',
            name: 'Job color',
          },
          {
            textColor: '#000',
            code: `hsla(${JOB_COLOR}, ${HOVER_OPACITY})`,
            color: '--job--hover-color',
            name: 'Job hover color',
          },
        ],
      },
      {
        title: 'Icon colors',
        colors: [
          {
            textColor: '#fff',
            code: `hsla(${ICON_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--icon-color',
            name: 'Icon color',
          },
          {
            textColor: '#fff',
            code: `hsla(${ICON_COLOR}, ${HOVER_OPACITY})`,
            color: '--icon-color--hover',
            name: 'Icon hover color',
          },
          {
            textColor: '#fff',
            code: `hsla(${ICON_COLOR}, ${DISABLED_OPACITY})`,
            color: '--icon-color-disabled',
            name: 'Icon disabled color',
          },
        ],
      },
      {
        title: 'Form colors',
        colors: [
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${MAIN_COLOR_OPACITY})`,
            color: '--form-input-color',
            name: 'User input color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--form-label-color',
            name: 'Form label color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${HOVER_OPACITY})`,
            color: '--form-label--hover-color',
            name: 'Form label hover color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${ACTIVE_OPACITY})`,
            color: '--form-label--active-color',
            name: 'Form label active color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DISABLED_OPACITY})`,
            color: '--form-label--disabled-color',
            name: 'Form label disabled color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--form-border-color',
            name: 'Form border color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${HOVER_OPACITY})`,
            color: '--form-border--hover-color',
            name: 'Form border hover color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${FORM_BORDER_DISABLED_OPACITY})`,
            color: '--form-border--disabled-color',
            name: 'Form border disabled color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${FORM_PLACEHOLDER_OPACITY})`,
            color: '--form-placeholder-color',
            name: 'Form placeholder color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${FORM_PLACEHOLDER_OPACITY__HOVER})`,
            color: '--form-placeholder--hover-color',
            name: 'Form placeholder hover color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DISABLED_OPACITY})`,
            color: '--form-placeholder--disabled-color',
            name: 'Form placeholder disabled color',
          },
        ],
      },
      {
        title: 'Outline colors',
        colors: [
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, 0.4`,
            color: '--form-outline-label-color',
            name: 'Form outline label color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, 0.7)`,
            color: '--form-outline-border-color',
            name: 'Form outline border color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, 0.7)`,
            color: '--form-outline-border--hover-color',
            name: 'Form outline border hover color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR},0.4)`,
            color: '--form-outline-placeholder-color',
            name: 'Form outline placeholder color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, 0.7)`,
            color: '--form-outline-placeholder--hover-color',
            name: 'Form outline placeholder hover color',
          },
        ],
      },
      {
        title: 'Text colors',
        colors: [
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--text-primary-color',
            name: 'Text primary color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, 0.7)`,
            color: '--text-outline-color',
            name: 'Text outline color',
          },
          {
            textColor: '#000',
            code: `hsla(${MAIN_COLOR}, ${DEFAULT_OPACITY})`,
            color: '--text-contrast-color',
            name: 'Text contrast color',
          },
          {
            textColor: '#fff',
            code: `hsla(${CONTRAST_COLOR}, ${DISABLED_OPACITY})`,
            color: '--text--disabled-color',
            name: 'Text disabled color',
          },
        ],
      },
      {
        title: 'Chat colors',
        colors: [
          {
            textColor: '#000',
            code: `hsla(${ACCENT_COLOR}, 0.2)`,
            color: '--chat-client-message-bg-color',
            name: 'Client message background',
          },
          {
            textColor: '#000',
            code: `hsla(${CONTRAST_COLOR}, 0.1)`,
            color: '--chat-agent-message-bg-color',
            name: 'Client message background',
          },
          {
            textColor: '#000',
            code: `hsla(${ACCENT_COLOR}, 0.2)`,
            color: '--chat-client-attachment-bg-color',
            name: 'Client message attachment background',
          },
          {
            textColor: '#000',
            code: `hsla(${CONTRAST_COLOR}, 0.1)`,
            color: '--chat-agent-attachment-bg-color',
            name: 'Client message attachment background',
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.color-family {
  margin-bottom: 30px;
}

.colors__family-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 460px);
  grid-gap: 20px;
}

.color-item {
  display: flex;
}

.color-item__color {
  flex: 0 0 200px;
  display: flex;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
}

.color-item__text-wrapper {
  margin-left: 10px;

  > * {
    margin-bottom: 5px;
  }
}

.color-item__name {
  font-weight: bold;
}

.color-item__code {
  white-space: nowrap;
}

.color-item__description {
}
</style>
