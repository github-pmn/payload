import JavaScriptObfuscator from 'javascript-obfuscator';
import parser from '@babel/parser';
import template from '@babel/template';
import types from '@babel/types';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
const { cleanupLogFiles, createLogger } = require('./useful');
const deobfuscatorModule = require('./deobfuscator');

/**
 * 解密js
 * @param sourceCode
 * @param argv
 * @returns {string|{code: string, map: null}|*}
 */
export function decode(
  sourceCode,
  argv: any = {
    _: [],
    i: 'input.js',
    inputPath: 'input.js',
    'input-path': 'input.js',
    o: 'output.js',
    outputPath: 'output.js',
    'output-path': 'output.js',
    debug: false,
    d: false,
    debugall: false,
    a: false,
    separateloggers: false,
    l: false,
    writedifffiles: false,
    f: false,
    stringarray: '',
    s: '',
    stringarraywrappers: '',
    w: '',
    stringarraywrappernames: '',
    n: '',
    stringarrayrotate: '',
    r: '',
    cleanuplog: false,
    c: false,
    $0: 'index.js',
    stringArrayCmdLineSpecificNodesInfo: null,
  },
) {
  const logger = createLogger(argv.debug);
  if (argv.cleanuplog) {
    cleanupLogFiles(logger);
  }
  logger.info(`Starting deobfuscation process.`);
  const myDeobfuscator = new deobfuscatorModule.SourceCodeDeobfuscator(
    logger,
    sourceCode,
    {},
  );
  try {
    sourceCode = myDeobfuscator.deobfuscate();
  } catch (e) {
    logger.error(
      `Deobfuscation error in main function. error = ${e}. Stack = \n${e.stack}`,
    );
  }
  return sourceCode;
}

/**
 * 加密js
 * @param sourceCode
 * @returns {string}
 */
export function encode(sourceCode) {
  //将源代码解析为AST
  const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
    optionsPreset: 'high-obfuscation',
    // compact: true,
    // controlFlowFlattening: true,
    // controlFlowFlatteningThreshold: 1,
    // deadCodeInjection: true,
    // deadCodeInjectionThreshold: 1,
    // debugProtection: true,
    // debugProtectionInterval: 4000,
    // disableConsoleOutput: true,
    // identifierNamesGenerator: 'hexadecimal',
    // log: false,
    // numbersToExpressions: true,
    // renameGlobals: false,
    // selfDefending: true,
    // simplify: true,
    // splitStrings: true,
    // splitStringsChunkLength: 5,
    // stringArray: true,
    // stringArrayCallsTransform: true,
    // stringArrayEncoding: ['rc4'],
    // stringArrayIndexShift: true,
    // stringArrayRotate: true,
    // stringArrayShuffle: true,
    // stringArrayWrappersCount: 5,
    // stringArrayWrappersChainedCalls: true,
    // stringArrayWrappersParametersMaxCount: 5,
    // stringArrayWrappersType: 'function',
    // stringArrayThreshold: 1,
    // transformObjectKeys: true,
    // unicodeEscapeSequence: false
  });
  const ast = parser.parse(obfuscationResult.getObfuscatedCode());
  console.time('处理完毕，耗时');
  const DEFNODE = template(`var A = B;`);
  const clbObjiami = types.identifier('clbObjiami');
  const obfuscatLastString = {
    VariableDeclarator(path) {
      const { init } = path.node;
      if (
        !types.isArrayExpression(init) ||
        init.elements.length < 10 ||
        !init.elements.every((element) => types.isStringLiteral(element))
      ) {
        return;
      }
      const lastNode = init.elements.pop();
      init.elements.push(clbObjiami);
      const defNode = DEFNODE({ A: clbObjiami, B: lastNode });
      // @ts-ignore
      ast.program.body.unshift(defNode);
      path.stop();
    },
  };
  traverse(ast, obfuscatLastString);
  const REVERSENODE = template(`A.split("").reverse("").join("")`);
  const stringMap = [];
  const reverseString = {
    StringLiteral(path) {
      const { parentPath, node } = path;
      if (parentPath.isObjectProperty({ key: node })) {
        return;
      }
      const value = node.value;
      if (value.length < 2 || stringMap.includes(value)) {
        return;
      }
      const reverseValue = value.split('').reverse('').join('');
      stringMap.push(reverseValue);
      const newNode = REVERSENODE({ A: types.stringLiteral(reverseValue) });
      if ('expression' in newNode) {
        path.replaceWith(newNode.expression);
      }
    },
  };
  traverse(ast, reverseString);
  const LASTNODE = template(
    `A = "Please contact the author to obtain the source code";`,
  );
  const newNode = LASTNODE({ A: clbObjiami });
  // @ts-ignore
  ast.program.body.push(newNode);
  console.timeEnd('处理完毕，耗时');
  const { code } = generator(ast, { compact: true });
  return code;
}
