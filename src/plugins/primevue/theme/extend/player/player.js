const generateCustomSharingPanelSizeCss = ({ size, dt }) => `
        .controls-group--${size} {
            padding: ${dt(`player-control-bar-position-padding-${size}`)};
        }
        
        .controls-group--${size} .controls-group__actions {
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
