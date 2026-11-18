# TinyMCE language packs

One TypeScript module per language, each exporting its translations
(`Record<string, string>`); `loadTinyMce` loads the current language's module on demand
and registers it with TinyMCE.

- `es`, `kk`, `pl`, `ro`, `ru`, `uk`, `vi`: Tiny's official TinyMCE 8 packs, taken from
  [`tinymce-i18n`](https://github.com/mklkj/tinymce-i18n) v26.11.2 (`langs8/`).
- `uz`: Tiny publishes no Uzbek pack; this one was added separately.

The published packs left some strings untranslated (empty) or, for `uz`, missing; we filled
those gaps ourselves, so every pack now covers every key. Strings Tiny did translate are
kept as published.

The packs are licensed on the same terms as TinyMCE itself.

Strings of our own TinyMCE plugins (e.g. the `wtvariables` button tooltip) sit in a
marked section at the end of each module. As in Tiny's packs, the key is the English
text, so English needs no entry. Keep that section when updating a pack.

The apps' `kz` locale maps to TinyMCE's `kk` (Kazakh). Should a string end up empty
(e.g. after an update), it falls back to English: `loadTinyMce` leaves empty strings out
when it registers a pack, since TinyMCE would otherwise show an empty label.

To update from a newer `tinymce-i18n` release: take its `langs8/<code>.js`, which calls
`tinymce.addI18n("<code>", { … })`, and turn it into this format: the same object as the
module's default export, with `\uXXXX` escapes decoded to plain text. Then fill in any
strings that are empty or missing in the new release.
