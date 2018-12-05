# Migration to the new Button

## What happened

Some props and their values got deprecated or replaced with new.

## Deprecated props

`themes` - changed to `skin` prop instead.

`id` - removed from storybook definition but still can be passed and used because button supports any native html attribute.

`type` - removed from storybook definition but still can be passed and used because button supports any native html attribute.

`height` - new Button will have `size` instead.

`active` - deprecated.

`hover` - deprecated.

`matchParent` - changed to `fullWidth` prop instead.

## New props

`skin` - this is the prop which controlls the color of the Button just like `theme` prop did before. Some values are deprecated and some are renamed.

`priority` - this the prop which controlls the priority of a button. This is used together with prop `skin` to achieve button color.

Changed

- `fullblue` ---> skin = `standard` (default); priority = "primary"

* `fullpurple` --> skin = `premium`; priority = "primary"

* `fullred` -- skin = `destructive`; priority = "primary"

* `whiteblueprimary` --> `skin = light`; priority = "primary"

* `outlined` --> skin = `dark`; priority = "primary & secondary"

* `transparent` --> skin =`transparent`; priority = "primary & secondary"

* `emptybluesecondary` -> skin = `inverted`; priority = "primary"

* `transparentblue` --> skin = `standard` (default); priority = "secondary"

* `emptyred` --> skin = `destructive`; priority = "secondary"

* `emptypurple` --> skin = `premium`; priority="secondary"

* `whitebluesecondary` --> skin = `light`; priority = "secondary"

Deprecated

- `login` --> deprecated

- `emptyblue` --> deprecated

- `fullgreen` --> deprecated

- `emptygreen` --> deprecated

- `emptylogin` --> deprecated

- `whiteblue` --> deprecated

`size` - this is a prop that controlls the size of a button. It also control prefix and suffix icons sizes.

`fullWidth` - this is a prop that makes button width 100% to its parent container.
