const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const flowStr = path =>
  `// @flow

export * from '${path}';
`;

const promisify = fn => (...a1) =>
  new Promise((res, rej) =>
    fn(...a1, (err, ...a2) => {
      err ? rej(err) : res(...a2);
    })
  );

const mkdirpp = promisify(mkdirp);
const writep = promisify(fs.writeFile);

const getRelative = (input, output) => {
  const inDir = path.dirname(input);
  const inFile = path.basename(input);
  const outDir = path.dirname(output);
  return path.join(path.relative(outDir, inDir), inFile);
};

const addFlowDefs = overrideInputPath => {
  let input;
  return {
    name: 'rollup-plugin-flow-defs',
    options: opts => {
      input = opts.input;
    },
    generateBundle: async function({ file: output }) {
      const relativePath = getRelative(overrideInputPath || input, output);

      await mkdirpp(path.dirname(output));
      await writep(`${output}.flow`, flowStr(relativePath));
    }
  };
};

module.exports = {
  default: addFlowDefs
};
