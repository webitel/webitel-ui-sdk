# Card page styles

##### ! Стилі додаються автоматично в main.scss !
#### Що це

Це стилі для сторінки-картки (після таблиці, накриклад: створення чи редагування запису) 

## Які класи використовуються

- `opened-card` - загальний клас та обгортка сторінки, використовується з `wt-page-wrapper`     
- `opened-card-form` - форма-обгортка для табів та прихованого інпуту
- `opened-card-tabs` - обгортка для табів
- `opened-card-tabs__tab` - таб `router-view`        
- `opened-card-header` - обгортка назви табу
- `opened-card-header__title` - назву табу
- `opened-card-input-grid` - грід стилі таблиці    
- `opened-card-input-grid--1-col` - модифікатор грід стилів - одна колонка (без розділень)
- `opened-card-input-grid--w50` - модифікатор грід стилів - половина ширини
- `opened-card-input-grid--w100` - модифікатор грід стилів - повна ширина
    
## Приклад використання

```vue
// crm,  opened-sources.vue
<template>
  <wt-page-wrapper class="opened-card">
    <template #main>
      <form
        class="opened-card-form"
      >
        <article class="opened-card-tabs">
          <router-view
            class="opened-card-tabs__tab"
          />
        </article>
      </form>
    </template>
  </wt-page-wrapper>
</template>

// crm,  opened-sources-general.vue

<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        card title
      </h3>
    </header>
    <div class="opened-card-input-grid opened-card-input-grid--1-col opened-card-input-grid--w50">
      ...
    </div>
  </section>
</template>
```
