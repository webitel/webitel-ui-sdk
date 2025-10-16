import { GalleriaScheme } from '@webitel/styleguide/component-schemes';

const galleria = {
  ...GalleriaScheme.sizes,
  colorScheme: GalleriaScheme.colorScheme,

  css: ({dt}) => `
    .p-galleria-mask {
      z-index: ${dt('galleria.mask.zIndex')} !important;
    }

    .wt-galleria__image-container--preview {
      width: ${dt('galleria.activeImageContainer.width')};
      height: ${dt('galleria.activeImageContainer.height')};
      background: ${dt('galleria.activeImageContainer.background')};
    }

    .wt-galleria__image--fullscreen {
      max-height: ${dt('galleria.fullscreenImage.maxHeight')};
      max-width: ${dt('galleria.fullscreenImage.maxWidth')};
    }

    .wt-galleria__thumbnail {
      width: ${dt('galleria.thumbnailImage.width')};
      height: ${dt('galleria.thumbnailImage.height')};
    }

    .p-galleria-nav-button svg {
      fill: ${dt('galleria.navButton.color')};
    }

    .p-galleria-nav-button:hover svg {
      fill: ${dt('galleria.navButton.hoverColor')};
    }

    .p-galleria-thumbnail-nav-button svg {
      fill: ${dt('galleria.thumbnailNavButton.color')};
    }

    .p-galleria-thumbnail-nav-button:hover svg {
      fill: ${dt('galleria.thumbnailNavButton.hoverColor')};
    }

    .p-galleria-close-button svg {
      fill: ${dt('galleria.closeButton.color')};
    }

    .p-galleria-close-button:hover svg {
      fill: ${dt('galleria.closeButton.hoverColor')};
    }

    .wt-galleria__footer {
      background: ${dt('galleria.footer.background')};
      padding: ${dt('galleria.footer.padding')};
    }

    .wt-galleria__footer svg {
      fill: ${dt('galleria.footerIcon.color')};
    }

    .wt-galleria__footer svg:hover {
      fill: ${dt('galleria.footerIcon.hoverColor')};
    }
  `,
};

export default galleria;