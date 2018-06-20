# rollup-plugin-flow-defs

Small plugin to add a `.js.flow` file next to a rollup bundle that simply requires the entry point (from `src` or similar) for that bundle, which is assumed to have all the relevant types exported from there.

## Usage

```js
import defs from 'rollup-plugin-flow-defs';
import fs from 'fs';
import path from 'path';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [defs()]
  }
];
```

By default the plugin assumes the types are exported in the `input` file but you can override this by passing a path e.g. `defs('src/types.js')`;

## Todo

- Add tests
