### [Variables, and General information](#general)

Webitel styleguide spacing system is based on the size Multiplier.
All size variables are made by multiplying this Multiplier.

This Multiplier is <code>var(--_spacing-multiplicity)</code>(*Not for use!*), 
which is equal to <code>4px</code>

<pre class="language-css"><code>
      --_spacing-multiplicity: 4px; // Start point, do NOT use outside this file

      --spacing--xs: calc(var(--_spacing-multiplicity) * 1);
      --spacing--sm: calc(var(--_spacing-multiplicity) * 2);
      --spacing--md: calc(var(--_spacing-multiplicity) * 3);
      --spacing--lg: calc(var(--_spacing-multiplicity) * 4);
      --spacing--xl: calc(var(--_spacing-multiplicity) * 5);
      --spacing--2xl: calc(var(--_spacing-multiplicity) * 6);
      --spacing--3xl: calc(var(--_spacing-multiplicity) * 7);

      --border-radius: var(--spacing--xs);
</code></pre>

