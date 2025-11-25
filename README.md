# typescript-react-function-component-props-handler

[![npm version](https://badge.fury.io/js/typescript-react-function-component-props-handler.svg)](https://badge.fury.io/js/typescript-react-function-component-props-handler)
[![npm downloads](https://img.shields.io/npm/dm/typescript-react-function-component-props-handler.svg)](https://www.npmjs.com/package/typescript-react-function-component-props-handler)
[![license](https://img.shields.io/npm/l/typescript-react-function-component-props-handler.svg)](./LICENSE)
<!-- Enable this once CI is set up:
[![CI](https://github.com/Winner95/typescript-react-function-component-props-handler/actions/workflows/ci.yml/badge.svg)](https://github.com/Winner95/typescript-react-function-component-props-handler/actions/workflows/ci.yml)
-->

Custom handler to **process React function component props** for [`react-docgen`](https://react-docgen.dev/).  
It lets you parse props for components typed as `React.FC<Props>` / `React.FunctionComponent<Props>` **without** rewriting your code.

---

## Why this project exists

`react-docgen` can parse React components and generate JSON documentation, but for TypeScript projects there’s a common gotcha:

```tsx
// Button.tsx
import React from "react";

export type ButtonProps = {
  /** Text inside the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => (
  <button disabled={props.disabled}>{props.label}</button>
);
```

With `react-docgen@5.x`:

- If you **don’t** explicitly type the `props` parameter  
  (e.g. `({ label }: ButtonProps)`),  
- And instead only type the component as `React.FC<ButtonProps>`,

then the props information is usually **missing** in the generated docs.

This handler:

- Looks at the component’s **function type** (`React.FC<ButtonProps>`)  
- Copies that type onto the **props parameter** in the AST  
- So `react-docgen` can finally “see” your props and emit them in the output.

It’s a small, one-purpose, zero-dependency helper to fix that specific gap.

---

## Compatibility

| Library version           | `react-docgen` | Node   |
| ------------------------- | -------------- | ------ |
| `1.x` (current)           | `5.x`          | `>=14` |
| `2.x` (planned / WIP)`*` | `6.x`          | `>=18` |

`*` The roadmap for `2.x` (react-docgen 6 support) is tracked in the repo issues.

---

## Installation

Using **yarn**:

```bash
yarn add typescript-react-function-component-props-handler react-docgen
```

Using **npm**:

```bash
npm install typescript-react-function-component-props-handler react-docgen
```

---

## Quick start (step-by-step)

### 1. Add a component typed as `React.FC`

```tsx
// src/Button.tsx
import React from "react";

export type ButtonProps = {
  /** Text inside the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ label, disabled }) => (
  <button disabled={disabled}>{label}</button>
);
```

Note: The parameter itself is **not** explicitly typed, only the component is.

---

### 2. Create a small docgen script

```js
// docgen.js
const fs = require("fs");
const path = require("path");
const reactDocs = require("react-docgen");

// The custom handler from this package
const setParamsTypeDefinitionFromFunctionType =
  require("typescript-react-function-component-props-handler");

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node docgen.js <path-to-component>");
  process.exit(1);
}

const source = fs.readFileSync(path.resolve(filePath), "utf8");

const doc = reactDocs.parse(
  source,
  null,
  [setParamsTypeDefinitionFromFunctionType, ...reactDocs.defaultHandlers],
  null
);

console.log(JSON.stringify(doc, null, 2));
```

---

### 3. Run the script

```bash
node docgen.js src/Button.tsx
```

You should now see your props in the JSON output, even though `props` wasn’t explicitly typed on the parameter.

---

### 4. Example output (trimmed)

```json
{
  "displayName": "Button",
  "props": {
    "label": {
      "type": { "name": "string" },
      "required": true,
      "description": "Text inside the button"
    },
    "disabled": {
      "type": { "name": "boolean" },
      "required": false,
      "description": "Whether the button is disabled"
    }
  }
}
```

---

## Usage options

### 1. Programmatic usage (Node script)

This is the core way to use the handler:

```js
const reactDocs = require("react-docgen");
const setParamsTypeDefinitionFromFunctionType =
  require("typescript-react-function-component-props-handler");

const doc = reactDocs.parse(
  source, // string with your component source
  null,   // resolver (null -> default)
  [setParamsTypeDefinitionFromFunctionType, ...reactDocs.defaultHandlers],
  null
);
```

> `source` should be the component source code (e.g. read from a `.tsx` file).

---

## What code examples are covered

The handler is focused on **function components typed via React’s function component types**, for example:

- `const Button: React.FC<ButtonProps> = (props) => { … }`
- `const Button: React.FunctionComponent<ButtonProps> = (props) => { … }`
- Both named and default exports
- Components where props are **not** explicitly typed at the parameter level

Things this handler **does not** try to solve:

- Class components (already handled by `react-docgen`)
- Function components where the parameter is already explicitly typed
- Non-TypeScript code

If you hit a pattern that doesn’t work as expected, feel free to open an issue with a minimal repro.

---

## Disclaimer

This library is provided **“as is”**, without warranty of any kind.  
Use it at your own risk. The author(s) are **not responsible** for any issues, data loss, or production incidents resulting from its use.

This package is a small helper for `react-docgen`.  
It is **not** an officially supported product of any company I work or have worked for.

---

## Support & responsibility

This is a best-effort open source project maintained in personal spare time.

- I’ll try to review issues and PRs.
- I can’t guarantee response times, feature work, or fixes for every edge case.
- Please evaluate the library and decide if it’s suitable for your project before using it in production.

Contributions (bug reports, failing test cases, docs improvements) are very welcome.

---

## Live examples

These sandboxes show concrete configurations with and without this handler.

- **react-docgen@6 – config without this handler (props NOT shown)**  
  https://codesandbox.io/p/sandbox/initial-600-beta22-config-prototype-with-not-showing-props-react-docgen-kwz72

- **react-docgen@6 – config with this handler (props shown)**  
  https://codesandbox.io/p/sandbox/initial-600-beta22-config-working-prototype-with-showing-props-react-docgen-ftvf2

> For the StackBlitz examples below, open the built-in terminal and run `node index.js`.

- **StackBlitz demo #1 (react-docgen setup, baseline)**  
  https://stackblitz.com/edit/stackblitz-starters-ry91wvpz?file=index.js

- **StackBlitz demo #2 (variant with this handler wired in)**  
  https://stackblitz.com/edit/stackblitz-starters-2w1zpcnx?file=index.js

---

## Useful links

You can explore and debug components & ASTs with:

- [`react-docgen` playground](https://react-docgen.dev/playground)
- [TypeScript AST Viewer](https://ts-ast-viewer.com/)
- [AST Explorer](https://astexplorer.net/)
