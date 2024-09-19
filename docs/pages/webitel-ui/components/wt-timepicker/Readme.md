<script setup>
import ExampleTimepicker from './examples/example-timepicker.vue';
import ExampleDisabledTimepicker from './examples/example-disabled-timepicker.vue';
import ExampleInvalidTimepicker from './examples/example-invalid-timepicker.vue';
import ExampleTimepickerDateMode from './examples/example-timepicker-date-mode.vue';
</script>

# WtTimepicker

## Props

| Prop       | Type           | Default    | Code                                                  | Description                                                                                      |
|------------|----------------|------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| value      | String, Number | 0          | `<wt-timepicker :value="'my value'"></wt-timepicker>` | Time value in seconds (not milliseconds!)                                                        |
| label      | String         | ''         | `<wt-timepicker :label="My Label"></wt-timepicker>`   | if passed, replaces "hour", "min", "sec" with a single label + format prop value                 |
| format     | String         | 'hh:mm:ss' | `<wt-timepicker :format='hh:mm'></wt-timepicker>`     | Controls visibility of inputs, depending on presence of h, m, s letters                          |
| disabled   | Boolean        | false      | `<wt-timepicker disabled></wt-timepicker>`            |                                                                                                  |
| labelProps | Object         | false      | `<wt-timepicker :label-props='obj'></wt-timepicker>`  | Object with props, passed down to wt-label as props                                              |
| noLabel    | Boolean        | false      | `<wt-timepicker noLabel></wt-timepicker>`             | Not displaying label                                                                             |
| dateMode   | Boolean        | false      | `<wt-timepicker date-mode></wt-timepicker>`           | If date-mode is true, timepicker asserts value is timestamp and displays/changes timestamp value |

## Events

| Value | Type                                                             | Description                                        |
|-------|------------------------------------------------------------------|----------------------------------------------------|
| input | Number sec value or timestamp, depending on date-mode prop value | Event is triggered immediately after value change. |

## Example Timepicker
::: raw
<ExampleTimepicker />
:::

::: details Code
<<< ./examples/example-timepicker.vue
:::

## Timepicker Date Mode
::: raw
<ExampleTimepickerDateMode />
:::

::: details Code
<<< ./examples/example-timepicker-date-mode.vue
:::

## Disabled Timepicker
::: raw
<ExampleDisabledTimepicker />
:::

::: details Code
<<< ./examples/example-disabled-timepicker.vue
:::

## Invalid Timepicker
::: raw
<ExampleInvalidTimepicker />
:::

::: details Code
<<< ./examples/example-invalid-timepicker.vue
:::
