### [Variables, and General information](#general)

Webitel styleguide spacing system is based on the size Multiplier.
All size variables are made by multiplying this Multiplier.

This Multiplier is <code>var(--_spacing-multiplicator)</code>(*Not for use!*), 
which is equal to <code>4px</code>

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

