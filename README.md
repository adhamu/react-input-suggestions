# React Search Suggestions

<div align="center">
  <img src="https://raw.githubusercontent.com/adhamu/react-search-suggestions/main/demo.png" alt="demo"/>

A React input component with a pluggable data source for auto suggestions on type.

Also includes arrow key navigation through results.

[![Build](https://github.com/adhamu/react-search-suggestions/workflows/CI/badge.svg)](https://github.com/adhamu/react-search-suggestions/actions)

</div>

## Prerequisities

- React (obviously)

## Installation

```shell
yarn add @adhamu/react-search-suggestions
```

## Usage

```typescript
import React from 'react'
import { SearchSuggestions } from '@adhamu/react-search-suggestions'

const suggestions = [
  'polite',
  'fastidious',
  'dull',
  'pudding',
  'mole',
  'angle',
].map(word => ({
  label: word,
  url: `https://www.google.co.uk/search?q=${word}`,
}))

const MyComponent = () => (
  <SearchSuggestions suggestions={suggestions} autoFocus={true} />
)

export default MyComponent
```

## HTML Structure

The markup is very simple

```html
<div>
  <input />
  <ul>
    <li><a href="url">label</a></li>
    <li><a href="url">label</a></li>
    <li><a href="url">label</a></li>
  </ul>
</div>
```

## Props

`suggestions` is a required array with each item following the below format:

```typescript
export type Suggestion = {
  label: string
  url: string
}
```

| Prop          | Description                            | Type         | Default     | Required? |
| ------------- | -------------------------------------- | ------------ | ----------- | --------- |
| `suggestions` | Data source for suggestions            | Suggestion[] | n/a         | Y         |
| `className`   | Optional class name to style component | string       | `''`        | N         |
| `name`        | Input name                             | string       | `q`         | N         |
| `placeholder` | Input placeholder                      | string       | `Search`    | N         |
| `autoFocus`   | Input autoFocus                        | boolean      | `false`     | N         |
| `onChange`    | Input onChange handler                 | function     | `undefined` | N         |
| `withStyles`  | Basic styling for the component        | boolean      | `false`     | N         |

## Styling

By default, the component comes with almost no styles. Given the semantic nature of the markup, it is quite easy to target these with CSS. As mentioned above, you can provide a `className` to the component for this.

Alternatively, you can set the `withStyles` prop to `true` to achieve some very basic styling. An example of this can be seen on [GitHub Pages](http://adhamu.github.io/react-search-suggestions/).

**Important**: The `:focus` attribute on each anchor tag is what powers the active state of a selected element. Refer to the [HTML Structure](#html-structure) above to correctly determine any CSS selectors.

## Arrow Key Navigation

You get this functionality for free and was the main motivation for creating this shared component.
