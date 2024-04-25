# Як працювати з form аплікейшенами

## Відміннісіть від інших аплікейшенами
1. Ці аплікейшенами зазвичай мають схожі поля. Тому для таких аплікейшенами створені спеціальні реюзабельні компоненти. 
src/applications/nodes/processing/_extensions/processing-form-input/processing-form-input-config-form-extension.vue - приклад для поля id
2. В JSON форматі аплікейшени мають однакову назву - formComponent.
3. Компоненти мають специфічний конвертер. Використання 
src/applications/nodes/general/iframe/IFrameAppConverter.js
4. У компонентів немає полів які має отримати бек. Бек відправляє всі дані які він отримує від фронту. Відповідно все що ми відправляємо потім можемо отримати в аплікейшені workspace.

### Приклади form аплікейшенів
1. formTextfield
2. formText
3. formRichTextEditor
4. formFile

## Створення схеми з form аплікейшенами
При створенні схеми обов'язково використовувати аплікейшен Generate Form для створення форми!
[Приклад схеми](https://dev.webitel.com/flow/1641/processing)
