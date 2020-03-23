# Typescript-react-function-component-props-handler [![npm version](https://badge.fury.io/js/typescript-react-function-component-props-handler.svg)](https://badge.fury.io/js/typescript-react-function-component-props-handler)

Custom handler to proccess react function component props for `react-docgen` package. It allows you to parse props, which are typed as React.functionComponent&lt;props> without rewriting your code.

## Intro

React-docgen 5.3.0 allow you to parse React.components and generate documentation. But if you don't explicitly set type of pros parameter, information about props is not visible in output. This custom handler allows you to fix [this problem](https://github.com/reactjs/react-docgen/issues/387). This is one-purpose, zero-dependency project.

## Getting started

### Add nececcary dependencies to your project

```bash
yarn add typescript-react-function-component-props-handler react-docgen
```

### Write script for running react-docgen

Add the following content to the file:

```js

const reactDocs = require('react-docgen');

const setParamsTypeDefinitionFromFunctionType = require('typescript-react-function-component-props-handler');

const doc = reactDocs.parse(
    source,
    null,
    [setParamsTypeDefinitionFromFunctionType, ...reactDocs.defaultHandlers],
    null
);

```

**Note:** `source` is a path to your component to parse.

## What code-examples are covered

Most of general and corner-cases for `React.functionComponents` were covered.
