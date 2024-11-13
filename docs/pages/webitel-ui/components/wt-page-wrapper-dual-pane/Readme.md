<script setup>
import WtPageWrapperDualPaneExample from './examples/wt-page-wrapper-dual-pane-example.vue';
</script>

# WtPageWrapperDualPane

The `wt-page-wrapper-dual-pane` component provides a layout with a dual-pane interface. It is used in applications that
require both a main content area and a secondary side panel, with the option to collapse or expand the side panel.

## Props

| Prop         | Type    | Default | Code                                                  | Description                                      |
|--------------|---------|---------|-------------------------------------------------------|--------------------------------------------------|
| actionsPanel | Boolean | true    | `<wt-page-wrapper-dual-pane :actionsPanel="false" />` | Controls whether the actions panel is displayed. |
| collapsible  | Boolean | true    | `<wt-page-wrapper-dual-pane :collapsible="false" />`  | Determines if the side panel can be collapsed.   |

## Events

| Event       | Params   | Description                                                  |
|-------------|----------|--------------------------------------------------------------|
| update:size | `String` | Emitted when the side panel size changes (`'sm'` or `'md'`). |

## Slots

| Name          | Description                                                                          |
|---------------|--------------------------------------------------------------------------------------|
| header        | Slot for rendering the header section.                                               |
| actions-panel | Slot for rendering the actions panel. Only visible if `actionsPanel` prop is `true`. |
| side          | Slot for rendering the side panel content.                                           |
| main          | Slot for rendering the main content area.                                            |

## Example Usage

### Advanced Dual Pane Layout

::: raw
<WtPageWrapperDualPaneExample/>
:::

::: details Code
<<< ./examples/wt-page-wrapper-dual-pane-example.vue
:::

## Description

The `wt-page-wrapper-dual-pane` component is useful for creating a two-column layout where the side panel can be collapsed
or expanded. The `collapsible` prop allows to control the visibility of `wt-collapse-action` icon. The
`update:size` event allows parent components to react to changes in the side panel size, providing a flexible and
interactive user experience.

