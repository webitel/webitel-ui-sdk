const generateCustomSharingControlsSizeCss = ({ size, dt }) => `
        .screen-sharing-controls--${size} .screen-sharing-controls__actions {
            gap: ${dt(`player-control-bar-${size}-gap`)};
            border-radius: ${dt(`player-control-bar-${size}-border-radius`)};
            padding: ${dt(`player-control-bar-${size}-padding`)};
        }
`;

const playerCss = ({ dt }) => `
    ${generateCustomSharingControlsSizeCss({ size: 'sm', dt })}
    ${generateCustomSharingControlsSizeCss({ size: 'md', dt })}
    ${generateCustomSharingControlsSizeCss({ size: 'lg', dt })}
    
    .video-wrapper {
      background: ${dt('player.background')};
      box-shadow: ${dt('player.shadow')};
    }
`;

export { playerCss };
