### [How to clean up icons before adding them to project?](#cleanup-icons)

After export from Figma, icons should be cleaned up to avoid a few issues.

Use this checklist:
1. **Remove** `width` and `height` from svg-tag
   ![Remove width and height](../../assets/cleanup-svg-width-height.png)


2. **Check** `viewBox`: it's size should be square **(НО НЕ УДАЛЯТЬ!)**

If there's an issue, contact the designer.

Incorrect:
![viewBox is incorrect](../../assets/cleanup-svg-viewbox-incorrect.png)

Correct:
![viewBox is correct](../../assets/cleanup-svg-viewbox-correct.png)

4. **Remove** `fill="none"` from svg-tag
   ![Remove "fill=none"](../../assets/cleanup-svg-fill-none.png)

5. **Remove** all `fill=""` with default color

*Default "fill" should be cleaned up, cause Figma adds it to icon by default, but we are
changing this fill in styles to suit our needs.
But! Specific colors should stay in svg-code. (for instance, red dot in `record` icon)*
![Remove this "fill"](../../assets/cleanup-svg-fill.png)
