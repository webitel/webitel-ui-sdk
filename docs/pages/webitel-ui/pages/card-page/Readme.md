# Card page styles

#### Що це
Це стилі для сторінки-картки (після таблиці, накриклад: створення чи редагування запису) 

Ці стилі знаходяться тут для того, щоб вирішити проблему з дублюванням стилів в проектах.

Зараз ці стилі прокривають не великий об'єм елементів, тому по мірі використання - стилі потрібно буде додавати
## Які класи використовуються та їх порядок

.

    opened-card
       opened-card-form
    
        opened-card-tabs
         opened-card-tabs__tab
        
    opened-card-header
       opened-card-header__title
    
    opened-card-input-grid opened-card-input-grid--1-col opened-card-input-grid--w50   
        

## Приклад використання

```vue

// crm,  opened-sources.vue
<template>
  <wt-page-wrapper :actions-panel="false" class="opened-card">
    <template #header>
      <wt-page-header
        :primary-action="save"
        :primary-disabled="!(itemInstance && itemInstance._dirty) || v$.$invalid"
        :primary-text="!id || itemInstance._dirty ? t('objects.save'): t('objects.saved')"
        :secondary-action="close"
        :secondary-text="t('cancel')"
        :loading="isSaving"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <form
        class="opened-card-form"
        @submit.prevent="save"
      >
        <article class="opened-card-tabs">
          <router-view
            class="opened-card-tabs__tab"
            :namespace="namespace"
          />
        </article>
        <input
          hidden
          type="submit"
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

// crm,  opened-sources-general.vue

<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid opened-card-input-grid--1-col opened-card-input-grid--w50">
      <wt-input
        :label="t('objects.name')"
        :value="itemInstance.name.length > 0 ? itemInstance.name : ''"
        @input="setItemProp({ prop: 'name', value: $event })"
        :v="itemInstance._dirty ? v$.itemInstance.name : false"
        required
      />
      <wt-select
        :value="itemInstance.type"
        :options="sourcesOptions"
        :clearable="false"
        :disabled="false"
        track-by="name"
        :label="t('lookups.sources.type.type')"
        @input="setItemProp({ prop: 'type', value: $event.type })"
      />
      <wt-textarea
        :label="t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

```
