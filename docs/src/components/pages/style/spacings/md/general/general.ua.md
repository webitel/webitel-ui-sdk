### [Змінні і загальна інформація](#general)

Система відступів у стайлгайді Webitel базується на певному мультиплікаторі розміру,
множеннями якого далі створюються змінні відступів необхідних розмірів.

Цим мультиплкатором є <code>var(--_spacing-multiplicator)</code>(<i>Не для використання</i>),
який дорівнює <code>4px</code>
Далі, від цього мультиплікатора створюються змінні, які ми і використовуємо:

<pre class="language-css"><code>
      --_spacing-multiplicator: 4px; // Start point, do NOT use outside this file

      --spacing-xs: calc(var(--_spacing-multiplicator) * 1);
      --spacing-sm: calc(var(--_spacing-multiplicator) * 2);
      --spacing-md: calc(var(--_spacing-multiplicator) * 3);
      --spacing-lg: calc(var(--_spacing-multiplicator) * 4);
      --spacing-xl: calc(var(--_spacing-multiplicator) * 5);
      --spacing-2xl: calc(var(--_spacing-multiplicator) * 6);
      --spacing-3xl: calc(var(--_spacing-multiplicator) * 7);

      --border-radius: var(--spacing-2xs);
</code></pre>

