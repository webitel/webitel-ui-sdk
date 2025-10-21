const generateCustomSharingPanelSizeCss = ({ size, dt }) => `
        .screen-sharing-control-panel--${size} .screen-sharing-control-panel__actions {
            gap: ${dt(`player-control-bar-${size}-gap`)};
            border-radius: ${dt(`player-control-bar-${size}-border-radius`)};
            padding: ${dt(`player-control-bar-${size}-padding`)};
        }
`;

const playerCss = ({ dt }) => `
    ${generateCustomSharingPanelSizeCss({ size: 'sm', dt })}
    ${generateCustomSharingPanelSizeCss({ size: 'md', dt })}
    ${generateCustomSharingPanelSizeCss({ size: 'lg', dt })}
`;

export { playerCss };
