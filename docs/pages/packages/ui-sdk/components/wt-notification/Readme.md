<script setup>
import ExampleNotification from './examples/example-notification.vue';
import ExamplePrimevueToastMigration from './examples/example-primevue-toast-migration.vue';
</script>

# WtNotification

## PrimeVue Toast (migration preview)

`WtNotification` — це статична картка з іконкою та слотом тексту; push-сповіщення в проді зазвичай показує **`WtNotificationsBar`**, який слухає подію **`notification`** на event bus і тримає список повідомлень з таймаутом (за замовчуванням 4 с, або `timeout` у секундах у payload).

Міграція на **PrimeVue Toast** зводиться до такого:

1. Один раз змонтувати **`<PToast />`** (наприклад, у кореневому layout), позиція на кшталт `top-right` відповідає правому верхньому куту як у `wt-notifications-bar`.
2. Підключити **`ToastService`** через `app.use(ToastService)` (у цьому репозиторії це вже робить `primevue.plugin.js`).
3. Замість `eventBus.$emit('notification', { text, type, timeout })` викликати **`useToast()`** і `toast.add({ severity, summary, detail, life })`, де **`life` у мілісекундах** (у старому API `timeout` був у секундах).
4. Відповідність типів: `success` → `success`, `info` → `info`, `error` → `error`, `warning` → **`warn`** (PrimeVue).

Нижче можна натиснути кнопки й перевірити, що тости з’являються (контейнер `PToast` додано у VitePress layout документації).

::: raw
<ExamplePrimevueToastMigration/>
:::

::: details Code
<<< ./examples/example-primevue-toast-migration.vue
:::

## Props

| Prop | Type   | Default | Code                                                 | Description | Options                       |
| ---- | ------ | ------- | ---------------------------------------------------- | ----------- | ----------------------------- |
| type | String | success | `<wt-notification type="success"></wt-notification>` |             | info, error, warning, success |

## Events

| Value | Params | Description |
| ----- | ------ | ----------- |
| close |        |             |

## Example Notification

::: raw
<ExampleNotification/>
:::

::: details Code
<<< ./examples/example-notification.vue
:::
