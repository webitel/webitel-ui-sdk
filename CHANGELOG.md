# Webitel UI Changelog

## [1.0.0] - 02.02.2022

### What's new

1. Border-radius pill style: `--border-radius--pill: 50px`
1. New typography styles (`subtitle`, `caption`, `overline`)
1. 10 different Elevation variables (`--elevation-1` - `--elevation-10`)
1. `secondary-50` icon color
1. added `size` prop with `sm` and `md` values (default is `md`) for:
    - `<wt-rounded-action>`
    - `<wt-button>`
    - `<wt-indicator>`

### Breaking changes

1. `<wt-badge>` renamed to `<wt-chip>`
1. removed a dash (`-`) from spacings system (for ex. `--spacing--sm` -> `--spacing-sm`)
1. Removed all deprecated spacings variables. Existing components moved to newest ones.
1. Removed all deprecated colors variables. Existing components moved to newest ones.
1. Removed deprecated `--box-shadow` css variable 
1. Removed `strong` typography classes. (`strong` typo -> `subtitle` typo)
1. Typo size suffixes update: `-sm`, `-md`, `-lg` -> `-3`, `-2`, `-1`
1.

### Changes

1. Updated spacings: `spacing-multiplicator` value increased from `4px` to `8px`.
1. Updated typography:
    - updated font files, added special font files for each `font-weight`
     property (`100`-`900`) and style (`italic`)
    - font-sizes of typography
    - line-heights of typography
    
1. (Almost?) all component paddings, spacings, etc. moved to `spacing` variables
1. Refactored placeholder: 
    - removed hover
    - removeed outline styles
    - focus style now is more transparent than default state
1. Many component styles reviewed and updated
