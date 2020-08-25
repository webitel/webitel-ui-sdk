<template>
  <section class="colors">
    <h2>Colors</h2>
    <article
      class="colors__family"
      v-for="(colorFamily, key) of colors"
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
            :style="{color: color.textColor, background: `var(${color.color})`}"
          ><strong>{{ color.code }}</strong>
          </div>
          <div class="color-item__text-wrapper">
            <div class="color-item__text">{{ color.name }}</div>
            <div class="color-item__code">{{ color.color }}</div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'colors',
  data: () => ({
    colors: [
      {
        title: 'Main colors',
        colors: [
          {
            textColor: '#000',
            code: '#FFF',
            color: '--main-primary-color',
            name: 'Main primary color',
          },
          {
            textColor: '#fff',
            code: '#171A2A',
            color: '--main-primary-accent-color',
            name: 'Main primary accent color',
          },
          {
            textColor: '#000',
            code: '#EAEAEA',
            color: '--main-outline-color',
            name: 'Main outline color',
          },
          {
            textColor: '#fff',
            code: '#000',
            color: '--main-secondary-color',
            name: 'Main secondary color',
          },
          {
            textColor: '#000',
            code: '#FFE69C',
            color: '--main-secondary-accent-color',
            name: 'Main secondary accent color',
          },
          {
            textColor: '#000',
            code: '#FFC107',
            color: '--main-accent-color',
            name: 'Main accent color',
          },
          {
            textColor: '#000',
            code: '#F1F4F6',
            color: '--main-page-bg-color',
            name: 'Main page background color',
          },
          {
            textColor: '#000',
            code: '#FFF9E6',
            color: '--main-option-hover-color',
            name: 'Main option hover color',
          },
        ],
      },
      {
        title: 'Semantic colors',
        colors: [
          {
            textColor: '#000',
            code: '#F3F4F4',
            color: '--disabled-color',
            name: 'Disabled color',
          },
          {
            textColor: '#fff',
            code: '#4CAF50',
            color: '--true-color',
            name: 'True color',
          },
          {
            textColor: '#fff',
            code: '#43A146',
            color: '--true--hover-color',
            name: 'True hover color',
          },
          {
            textColor: '#fff',
            code: '#FF4444',
            color: '--false-color',
            name: 'False color',
          },
          {
            textColor: '#fff',
            code: '#F03D3D',
            color: '--false--hover-color',
            name: 'False hover color',
          },
          {
            textColor: '#000',
            code: '#FFC107',
            color: '--hold-color',
            name: 'Hold color',
          },
          {
            textColor: '#000',
            code: '#EFB917',
            color: '--hold--hover-color',
            name: 'Hold hover color',
          },
          {
            textColor: '#fff',
            code: '#708FFF',
            color: '--transfer-color',
            name: 'Transfer color',
          },
          {
            textColor: '#fff',
            code: '#6582EB',
            color: '--transfer--hover-color',
            name: 'Transfer hover color',
          },
        ],
      },
      {
        title: 'Form colors',
        colors: [
          {
            textColor: '#fff',
            code: '#000',
            color: '--form-input-color',
            name: 'User input color',
          },
          {
            textColor: '#000',
            code: '#ACACAC',
            color: '--form-label-color',
            name: 'Form label color',
          },
          {
            textColor: '#000',
            code: '#000',
            color: '--form-label--active--color',
            name: 'Form label active color',
          },
          {
            textColor: '#fff',
            code: '#000',
            color: '--form-label--hover-color',
            name: 'Form label hover color',
          },
          {
            textColor: '#000',
            code: '#EAEAEA',
            color: '--form-label--disabled-color',
            name: 'Form label disabled color',
          },
          {
            textColor: '#000',
            code: '#ACACAC',
            color: '--form-border-color',
            name: 'Form border color',
          },
          {
            textColor: '#fff',
            code: '#000',
            color: '--form-border--hover-color',
            name: 'Form border hover color',
          },
          {
            textColor: '#000',
            code: '#F5F5F5',
            color: '--form-border--disabled-color',
            name: 'Form border disabled color',
          },
          {
            textColor: '#000',
            code: '#ACACAC',
            color: '--form-placeholder-color',
            name: 'Form placeholder color',
          },
          {
            textColor: '#fff',
            code: '#000',
            color: '--form-placeholder--hover-color',
            name: 'Form placeholder hover color',
          },
          {
            textColor: '#000',
            code: '#E3E3E3',
            color: '--form-placeholder--disabled-color',
            name: 'Form placeholder disabled color',
          },
        ],
      },
      {
        title: 'Outline colors',
        colors: [
          {
            textColor: '#000',
            code: '#EAEAEA',
            color: '--form-outline-label-color',
            name: 'Form outline label color',
          },
          {
            textColor: '#000',
            code: 'EAEAEA',
            color: '--form-outline-border-color',
            name: 'Form outline border color',
          },
          {
            textColor: '#fff',
            code: '#ACACAC',
            color: '--form-outline-border--hover-color',
            name: 'Form outline border hover color',
          },
          {
            textColor: '#000',
            code: '#EAEAEA',
            color: '--form-outline-placeholder-color',
            name: 'Form outline placeholder color',
          },
          {
            textColor: '#fff',
            code: '#ACACAC',
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
            code: '#000',
            color: '--text-primary-color',
            name: 'Text primary color',
          },
          {
            textColor: '#000',
            code: '#ACACAC',
            color: '--text-outline-color',
            name: 'Text outline color',
          },
          {
            textColor: '#000',
            code: '#FFF',
            color: '--text-contrast-color',
            name: 'Text contrast color',
          },
          {
            textColor: '#000',
            code: '#F3F4F4',
            color: '--text--disabled-color',
            name: 'Text disabled color',
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
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 20px;
}

.color-item {
  display: flex;
  align-items: center;
}

.color-item__color {
  display: flex;
  width: 120px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
}

.color-item__text-wrapper {
  margin-left: 10px;
}

.color-item__text,
.color-item__code {
  white-space: nowrap;
}

.color-item__text {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
