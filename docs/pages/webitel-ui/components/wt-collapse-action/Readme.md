<script setup>
import WtCollapseActionExample from './examples/wt-collapse-action-example.vue';
</script>
# WtCollapseAction

The `wt-collapse-action` component provides a button that toggles between expanded and collapsed states. It emits a
`click` event when the button is clicked, allowing parent components to handle the action as needed.

## Props

| Prop      | Type    | Default | Code                                       | Description                                                 |
|-----------|---------|---------|--------------------------------------------|-------------------------------------------------------------|
| collapsed | Boolean | false   | `<wt-collapse-action :collapsed="true" />` | Determines if the button shows 'expand' or 'collapse' icon. |

## Events

| Event | Params | Description                         |
|-------|--------|-------------------------------------|
| click | None   | Emitted when the button is clicked. |

## Slots

No slots are available for this component.

## Example Usage

### Basic Collapse Action Button

[//]: # (::: raw)

[//]: # (<WtCollapseActionExample/>)

[//]: # (:::)

[//]: # ()
[//]: # (::: details Code)

[//]: # (<<< ./examples/wt-collapse-action-example.vue)

[//]: # (:::)
## Description

The `wt-collapse-action` component is useful for toggling UI elements, such as side panels, with a simple
expand/collapse button. The `collapsed` prop controls the icon shown, while the `click` event allows parent components
to control the collapsed state.

