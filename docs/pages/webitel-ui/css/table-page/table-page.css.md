# Table page styles

##### ! Стилі додаються автоматично в main.scss !
#### Що це

Це стилі для сторінки з стандартними таблицями.

## Які класи використовуються

- `table-page` - загальний клас та обгортка сторінки, використовується з `wt-page-wrapper`
- `table-section` - обгортка хедеру, dummy, лоадеру та таблиці в темплейті main
- `table-title` - обгортка хедеру таблиці
- `table-title__title` - назва таблиці
- `table-title__actions-wrap` - обгортка для пошуку, іконок видалення, оновлення таблиці і тд.
- `table-section__table-wrapper` - обгортка таблиці

## Приклад використання

```vue
// crm,  the-sources.vue

<template>
  <wt-page-wrapper :actions-panel="false"
                   class="table-page">
    <template #main>
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            table title
          </h3>
          <div class="table-title__actions-wrap">
            ...
          </div>
        </header>

        <div class="table-section__table-wrapper">
           <wt-table>
              ...
           </wt-table>
          </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>
```
