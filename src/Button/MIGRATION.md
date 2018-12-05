# Migration to the new Button

## What happened

Some props and their values got deprecated or replaced with new. Version 5 by default will support previous Button api, but by passing prop `upgrade` you can already use new api. Next major version (6) will remove this functionality.

## Deprecated props

`themes` - changed to `skin` prop instead.

`id` - removed from storybook definition but still can be passed and used because button supports any native html attribute.

`type` - removed from storybook definition but still can be passed and used because button supports any native html attribute.

`onMouseEnter` - removed from storybook definition but still can be passed and used.

`onMouseLeave` - removed from storybook definition but still can be passed and used.

`height` - new Button will have `size` instead.

`active` - deprecated.

`hover` - deprecated.

`matchParent` - changed to `fullWidth` prop instead.

## New props

`skin` - this is the prop which controlls the color of the Button just like `theme` prop did before. Some values are deprecated and some are renamed.

`priority` - this the prop which controlls the priority of a button. This is used together with prop `skin` to achieve button color.

Changed `theme` values

- `fullblue` ---> skin = `standard` (default); priority = "primary"

- `fullpurple` --> skin = `premium`; priority = "primary"

- `fullred` -- skin = `destructive`; priority = "primary"

- `whiteblueprimary` --> `skin = light`; priority = "primary"

- `outlined` --> skin = `dark`; priority = "primary & secondary"

- `transparent` --> skin =`transparent`; priority = "primary & secondary"

- `emptybluesecondary` -> skin = `inverted`; priority = "primary"

- `transparentblue` --> skin = `standard` (default); priority = "secondary"

- `emptyred` --> skin = `destructive`; priority = "secondary"

- `emptypurple` --> skin = `premium`; priority="secondary"

- `whitebluesecondary` --> skin = `light`; priority = "secondary"

Deprecated `theme` values

- `login` --> deprecated

- `emptyblue` --> deprecated

- `fullgreen` --> deprecated

- `emptygreen` --> deprecated

- `emptylogin` --> deprecated

- `whiteblue` --> deprecated

`size` - this is a prop that controlls the size of a button. It also control prefix and suffix icons sizes.

`fullWidth` - this is a prop that makes button width 100% to its parent container.

## IconButton, TextButton and CloseButton

Themes that change the core button layout were moved to different components: `IconButton`, `TextButton` and `CloseButton`.

IconButton

- `icon-standard` --> skin = "standard" (default); priority = "primary"

- `icon-white` --> skin = "light"; priority = "primary"

- `icon-greybackground` --> skin = "inverted"; priority = "primary"

- `icon-standardsecondary` --> skin = "standard" (default); priority = "secondary"

- `icon-whitesecondary` --> skin = "light"; priority = "secondary"

TextButton

- `no-border` --> skin = "dark"

- `dark-no-border` --> skin = "light"

CloseButton

- `close-standard` --> skin = "standard"

- `close-dark` --> skin = "dark"

- `close-transparent` --> skin = "transparent'

## Testkit deprecations

New button testkit is written with unidriver which means that ReactTestUtils, Enzyme, Puppeteer and Protractor are now supported by default.

Deprecated Unit API

- `focus` - deprecated

- `blur` - deprecated

- `mounseEnter` - deprecated

- `mouseLeave` - deprecated

- `isPrefixIconExists` - deprecated because this is internal implementation of a button. It should not be tested by the user.

- `isSuffixIconExists` - deprecated because this is internal implementation of a button. It should not be tested by the user.

- `setProps` - deprecated.

Deprecated E2E API

- `element` - deprecated.
