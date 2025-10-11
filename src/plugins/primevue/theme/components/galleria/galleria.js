import { css } from '@primeuix/themes';
import { GalleriaScheme } from '@webitel/styleguide/component-schemes';

const galleria = {
  ...GalleriaScheme.sizes,
  colorScheme: GalleriaScheme.colorScheme,

  css: ({dt}) => `
    .wt-galleria__image {
      max-height: ${dt('galleria.activeImage.maxHeight')};
    }

    .wt-galleria__thumbnail {
      width: ${dt('galleria.thumbnailImage.width')};
      height: ${dt('galleria.thumbnailImage.height')};
    }
  `,
};

export default galleria;