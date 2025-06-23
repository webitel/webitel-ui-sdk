const loadedIcons = new Set<string>();

export async function injectIconToSprite(name: string) {
  if (!name) {
    console.warn('[SVG Sprite] Icon name is undefined');
    return;
  }
  if (loadedIcons.has(name)) return;

  const spriteContainerId = 'svg-sprite-container';
  let container = document.getElementById(spriteContainerId);

  if (!container) {
    container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    container.setAttribute('aria-hidden', 'true');
    container.setAttribute('style', 'display: none;');
    container.setAttribute('id', spriteContainerId);
    document.body.prepend(container);
  }

  const svgText: string = (
    await import(`../assets/icons/sprite/${name}.svg?raw`)
  ).default;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');

  if (!svgEl) return;

  const symbol = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'symbol',
  );
  symbol.setAttribute('id', name);
  const viewBox = svgEl.getAttribute('viewBox');
  if (viewBox) symbol.setAttribute('viewBox', viewBox);

  Array.from(svgEl.children).forEach((child) => {
    symbol.appendChild(child.cloneNode(true));
  });

  container.appendChild(symbol);
  loadedIcons.add(name);
}
