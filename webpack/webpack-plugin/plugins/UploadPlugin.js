class UploadPlugin {
  apply(compiler) {
    console.log(compiler.hooks, '1122222')
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        console.log(compilation, 'compilation编译的对象')
        resolve()
      })
    })
  }
}

module.exports = UploadPlugin

{
  filter: [Function],
    find: [Function],
    findIndex: [Function],
    includes: [Function],
    indexOf: [Function],
    join: [Function],
    lastIndexOf: [Function],
    map: [Function],
    reduce: [Function],
    reduceRight: [Function],
    slice: [Function],
    some: [Function],
    push: [Function],
    copyWithin: [Function],
    fill: [Function],
    pop: [Function],
    reverse: [Function],
    shift: [Function],
    splice: [Function],
    sort: [Function],
    unshift: [Function],
    [Symbol(Symbol.isConcatSpreadable)]: true
  },
  chunkGroups: [
    Entrypoint {
      groupDebugId: 5002,
      options: [Object],
      _children: [SortableSet [Set]],
      _parents: [SortableSet [Set]],
      _asyncEntrypoints: [SortableSet [Set]],
      _blocks: [SortableSet [Set]],
      chunks: [Array],
      origins: [Array],
      _modulePreOrderIndices: [Map],
      _modulePostOrderIndices: [Map],
      index: 0,
      _runtimeChunk: [Chunk],
      _entrypointChunk: [Chunk],
      _initial: true
    }
  ],
  namedChunkGroups: Map {
    'main' => Entrypoint {
      groupDebugId: 5002,
      options: [Object],
      _children: [SortableSet [Set]],
      _parents: [SortableSet [Set]],
      _asyncEntrypoints: [SortableSet [Set]],
      _blocks: [SortableSet [Set]],
      chunks: [Array],
      origins: [Array],
      _modulePreOrderIndices: [Map],
      _modulePostOrderIndices: [Map],
      index: 0,
      _runtimeChunk: [Chunk],
      _entrypointChunk: [Chunk],
      _initial: true
    }
  },
  namedChunks: Map {
    'main' => Chunk {
      id: 'main',
      ids: [Array],
      debugId: 1002,
      name: 'main',
      idNameHints: [SortableSet [Set]],
      preventIntegration: false,
      filenameTemplate: undefined,
      _groups: [SortableSet [Set]],
      runtime: 'main',
      files: [SetDeprecatedArray [Set]],
      auxiliaryFiles: Set {},
      rendered: true,
      hash: '344c872fadf122b47615e308fe6f4d8a',
      contentHash: [Object: null prototype],
      renderedHash: '344c872fadf122b47615',
      chunkReason: undefined,
      extraAsync: false
    }
  },
  modules: Set {
    NormalModule {
      dependencies: [Array],
      blocks: [],
      type: 'javascript/auto',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: true,
      debugId: 1000,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: [Object],
      presentationalDependencies: [Array],
      request: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      userRequest: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      rawRequest: './src/index.js',
      binary: false,
      parser: [JavascriptParser],
      generator: JavascriptGenerator {},
      resource: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      matchResource: undefined,
      loaders: [],
      error: null,
      _source: [RawSource],
      _sourceSizes: undefined,
      _lastSuccessfulBuildMeta: {},
      _forceBuild: false,
      _isEvaluatingSideEffects: false,
      _ast: null
    },
    NormalModule {
      dependencies: [Array],
      blocks: [],
      type: 'javascript/auto',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: true,
      debugId: 1002,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: [Object],
      buildInfo: [Object],
      presentationalDependencies: [Array],
      request: '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/mini-css-extract-plugin/dist/loader.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      userRequest: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      rawRequest: './index.css',
      binary: false,
      parser: [JavascriptParser],
      generator: JavascriptGenerator {},
      resource: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      matchResource: undefined,
      loaders: [Array],
      error: null,
      _source: [RawSource],
      _sourceSizes: undefined,
      _lastSuccessfulBuildMeta: [Object],
      _forceBuild: false,
      _isEvaluatingSideEffects: false,
      _ast: null
    },
    CssModule {
      dependencies: [],
      blocks: [],
      type: 'css/mini-extract',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: false,
      debugId: 1009,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: {},
      presentationalDependencies: undefined,
      _context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      _identifier: '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      _identifierIndex: 0,
      content: <Buffer 62 6f 64 79 20 7b 0a 20 20 62 61 63 6b 67 72 6f 75 6e 64 2d 63 6f 6c 6f 72 3a 20 61 71 75 61 3b 0a 7d>,
      media: '',
      sourceMap: undefined
    },
    MakeNamespaceObjectRuntimeModule {
      dependencies: [],
      blocks: [],
      type: 'runtime',
      context: null,
      needId: true,
      debugId: 1010,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: {},
      presentationalDependencies: undefined,
      name: 'make namespace object',
      stage: 0,
      compilation: [Circular],
      chunk: [Chunk],
      fullHash: false,
      _cachedGeneratedCode: '// define __esModule on exports\n' +
        '__webpack_require__.r = (exports) => {\n' +
        "\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n" +
        "\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n" +
        '\t}\n' +
        "\tObject.defineProperty(exports, '__esModule', { value: true });\n" +
        '};'
    },
    concat: [Function],
    entry: [Function],
    filter: [Function],
    find: [Function],
    findIndex: [Function],
    includes: [Function],
    indexOf: [Function],
    join: [Function],
    lastIndexOf: [Function],
    map: [Function],
    reduce: [Function],
    reduceRight: [Function],
    slice: [Function],
    some: [Function],
    push: [Function],
    copyWithin: [Function],
    fill: [Function],
    pop: [Function],
    reverse: [Function],
    shift: [Function],
    splice: [Function],
    sort: [Function],
    unshift: [Function],
    [Symbol(Symbol.isConcatSpreadable)]: true
  },
  _modules: Map {
    '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js' => NormalModule {
      dependencies: [Array],
      blocks: [],
      type: 'javascript/auto',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: true,
      debugId: 1000,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: [Object],
      presentationalDependencies: [Array],
      request: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      userRequest: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      rawRequest: './src/index.js',
      binary: false,
      parser: [JavascriptParser],
      generator: JavascriptGenerator {},
      resource: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.js',
      matchResource: undefined,
      loaders: [],
      error: null,
      _source: [RawSource],
      _sourceSizes: undefined,
      _lastSuccessfulBuildMeta: {},
      _forceBuild: false,
      _isEvaluatingSideEffects: false,
      _ast: null
    },
    '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/mini-css-extract-plugin/dist/loader.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css' => NormalModule {
      dependencies: [Array],
      blocks: [],
      type: 'javascript/auto',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: true,
      debugId: 1002,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: [Object],
      buildInfo: [Object],
      presentationalDependencies: [Array],
      request: '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/mini-css-extract-plugin/dist/loader.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      userRequest: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      rawRequest: './index.css',
      binary: false,
      parser: [JavascriptParser],
      generator: JavascriptGenerator {},
      resource: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      matchResource: undefined,
      loaders: [Array],
      error: null,
      _source: [RawSource],
      _sourceSizes: undefined,
      _lastSuccessfulBuildMeta: [Object],
      _forceBuild: false,
      _isEvaluatingSideEffects: false,
      _ast: null
    },
    'css /Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css 0' => CssModule {
      dependencies: [],
      blocks: [],
      type: 'css/mini-extract',
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      needId: false,
      debugId: 1009,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: {},
      presentationalDependencies: undefined,
      _context: '/Users/shangguanjianming/Desktop/code/webpack-plugin/src',
      _identifier: '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      _identifierIndex: 0,
      content: <Buffer 62 6f 64 79 20 7b 0a 20 20 62 61 63 6b 67 72 6f 75 6e 64 2d 63 6f 6c 6f 72 3a 20 61 71 75 61 3b 0a 7d>,
      media: '',
      sourceMap: undefined
    },
    'webpack/runtime/make namespace object' => MakeNamespaceObjectRuntimeModule {
      dependencies: [],
      blocks: [],
      type: 'runtime',
      context: null,
      needId: true,
      debugId: 1010,
      resolveOptions: {},
      factoryMeta: undefined,
      useSourceMap: false,
      useSimpleSourceMap: false,
      _warnings: undefined,
      _errors: undefined,
      buildMeta: {},
      buildInfo: {},
      presentationalDependencies: undefined,
      name: 'make namespace object',
      stage: 0,
      compilation: [Circular],
      chunk: [Chunk],
      fullHash: false,
      _cachedGeneratedCode: '// define __esModule on exports\n' +
        '__webpack_require__.r = (exports) => {\n' +
        "\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n" +
        "\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n" +
        '\t}\n' +
        "\tObject.defineProperty(exports, '__esModule', { value: true });\n" +
        '};'
    }
  },
  records: {
    HtmlWebpackCompiler: [ [Object] ],
    'mini-css-extract-plugin /Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!./src/index.css': [ [Object] ],
    modules: { byIdentifier: {}, usedIds: [] },
    chunks: { byName: {}, bySource: {}, usedIds: [] }
  },
  additionalChunkAssets: [],
  assets: {
    'main.css': SizeOnlySource { _size: 35 },
    'bundle.js': SizeOnlySource { _size: 3056 },
    'index.html': SizeOnlySource { _size: 270 },
    'list.md': SizeOnlySource { _size: 74 }
  },
  assetsInfo: Map {
    '__child-HtmlWebpackPlugin_0' => { javascriptModule: false },
    'main.css' => { size: 35 },
    'bundle.js' => { javascriptModule: false, size: 3056 },
    'index.html' => { size: 270 },
    'list.md' => { size: 74 }
  },
  _assetsRelatedIn: Map {},
  errors: [],
  warnings: [],
  children: [
    Compilation {
      hooks: [Object],
      name: 'HtmlWebpackCompiler',
      startTime: 1606370804828,
      endTime: 1606370804895,
      compiler: [Compiler],
      resolverFactory: [ResolverFactory],
      inputFileSystem: [CachedInputFileSystem],
      fileSystemInfo: [FileSystemInfo],
      requestShortener: [RequestShortener],
      compilerPath: 'HtmlWebpackCompiler|0|',
      logger: [WebpackLogger],
      options: [Object],
      outputOptions: [Object],
      bail: false,
      profile: false,
      mainTemplate: [MainTemplate],
      chunkTemplate: [ChunkTemplate],
      runtimeTemplate: [RuntimeTemplate],
      moduleTemplates: [Object],
      moduleGraph: [ModuleGraph],
      chunkGraph: [ChunkGraph],
      codeGenerationResults: [CodeGenerationResults],
      factorizeQueue: [AsyncQueue],
      addModuleQueue: [AsyncQueue],
      buildQueue: [AsyncQueue],
      rebuildQueue: [AsyncQueue],
      processDependenciesQueue: [AsyncQueue],
      creatingModuleDuringBuild: [WeakMap],
      entries: [Map],
      globalEntry: [Object],
      entrypoints: [Map],
      asyncEntrypoints: [],
      chunks: [Set],
      chunkGroups: [Array],
      namedChunkGroups: [Map],
      namedChunks: [Map],
      modules: [Set],
      _modules: [Map],
      records: [Object],
      additionalChunkAssets: [],
      assets: [Object],
      assetsInfo: [Map],
      _assetsRelatedIn: Map {},
      errors: [],
      warnings: [],
      children: [],
      logging: [Map],
      dependencyFactories: [Map],
      dependencyTemplates: [DependencyTemplates],
      childrenCounters: {},
      usedChunkIds: null,
      usedModuleIds: null,
      needAdditionalPass: false,
      builtModules: [WeakSet],
      codeGeneratedModules: [WeakSet],
      _rebuildingModules: Map {},
      emittedAssets: Set {},
      comparedForEmitAssets: Set {},
      fileDependencies: [LazySet],
      contextDependencies: [LazySet],
      missingDependencies: [LazySet],
      buildDependencies: [LazySet],
      compilationDependencies: [Object],
      _modulesCache: [CacheFacade],
      _assetsCache: [CacheFacade],
      _codeGenerationCache: [CacheFacade],
      fullHash: 'a5d25c225fcf75152a74d2d166e571dc',
      hash: 'a5d25c225fcf75152a74'
    },
    Compilation {
      hooks: [Object],
      name: 'mini-css-extract-plugin /Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css',
      startTime: 1606370804907,
      endTime: 1606370804983,
      compiler: [Compiler],
      resolverFactory: [ResolverFactory],
      inputFileSystem: [CachedInputFileSystem],
      fileSystemInfo: [FileSystemInfo],
      requestShortener: [RequestShortener],
      compilerPath: 'mini-css-extract-plugin /Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css|0|',
      logger: [WebpackLogger],
      options: [Object],
      outputOptions: [Object],
      bail: false,
      profile: false,
      mainTemplate: [MainTemplate],
      chunkTemplate: [ChunkTemplate],
      runtimeTemplate: [RuntimeTemplate],
      moduleTemplates: [Object],
      moduleGraph: [ModuleGraph],
      chunkGraph: [ChunkGraph],
      codeGenerationResults: [CodeGenerationResults],
      factorizeQueue: [AsyncQueue],
      addModuleQueue: [AsyncQueue],
      buildQueue: [AsyncQueue],
      rebuildQueue: [AsyncQueue],
      processDependenciesQueue: [AsyncQueue],
      creatingModuleDuringBuild: [WeakMap],
      entries: [Map],
      globalEntry: [Object],
      entrypoints: [Map],
      asyncEntrypoints: [],
      chunks: [Set],
      chunkGroups: [Array],
      namedChunkGroups: [Map],
      namedChunks: [Map],
      modules: [Set],
      _modules: [Map],
      records: [Object],
      additionalChunkAssets: [],
      assets: {},
      assetsInfo: Map {},
      _assetsRelatedIn: Map {},
      errors: [],
      warnings: [],
      children: [],
      logging: [Map],
      dependencyFactories: [Map],
      dependencyTemplates: [DependencyTemplates],
      childrenCounters: {},
      usedChunkIds: null,
      usedModuleIds: null,
      needAdditionalPass: false,
      builtModules: [WeakSet],
      codeGeneratedModules: [WeakSet],
      _rebuildingModules: Map {},
      emittedAssets: Set {},
      comparedForEmitAssets: Set {},
      fileDependencies: [LazySet],
      contextDependencies: [LazySet],
      missingDependencies: [LazySet],
      buildDependencies: [LazySet],
      compilationDependencies: [Object],
      _modulesCache: [CacheFacade],
      _assetsCache: [CacheFacade],
      _codeGenerationCache: [CacheFacade],
      fullHash: 'f8138d66369d81de36b473bfa9094da6',
      hash: 'f8138d66369d81de36b4'
    }
  ],
  logging: Map {
    'webpack.Compiler' => [ [Object], [Object], [Object], [Object], [Object] ],
    'webpack.ResolverCachePlugin' => [ [Object] ],
    'webpack.FlagDependencyExportsPlugin' => [ [Object], [Object], [Object], [Object] ],
    'webpack.Compilation' => [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object]
    ],
    'webpack.SideEffectsFlagPlugin' => [ [Object] ],
    'webpack.buildChunkGraph' => [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    'webpack.SplitChunksPlugin' => [ [Object], [Object], [Object], [Object] ],
    'webpack.FileSystemInfo' => [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  dependencyFactories: Map {
    [Function: CssDependency] => CssModuleFactory {},
    [Function: WorkerDependency] {
      Template: [Function: WorkerDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: EntryDependency] => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: HarmonyImportSideEffectDependency] {
      Template: [Function: HarmonyImportSideEffectDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: HarmonyImportSpecifierDependency] {
      Template: [Function: HarmonyImportSpecifierDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: HarmonyExportImportedSpecifierDependency] {
      Template: [Function: HarmonyExportImportedSpecifierDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: HarmonyAcceptImportDependency] {
      Template: [Function: HarmonyAcceptImportDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: AMDRequireItemDependency] {
      Template: [Function: ModuleDependencyTemplateAsRequireId]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: AMDRequireContextDependency] {
      Template: [Function: ContextDependencyTemplateAsRequireCall]
    } => ContextModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory]
    },
    [Function: CommonJsRequireDependency] {
      Template: [Function: ModuleDependencyTemplateAsId]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: CommonJsFullRequireDependency] {
      Template: [Function: CommonJsFullRequireDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: CommonJsRequireContextDependency] {
      Template: [Function: ContextDependencyTemplateAsRequireCall]
    } => ContextModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory]
    },
    [Function: RequireResolveDependency] {
      Template: [Function: ModuleDependencyTemplateAsId]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: RequireResolveContextDependency] {
      Template: [Function: ContextDependencyTemplateAsId]
    } => ContextModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory]
    },
    [Function: CommonJsExportRequireDependency] {
      Template: [Function: CommonJsExportRequireDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: CommonJsSelfReferenceDependency] {
      Template: [Function: CommonJsSelfReferenceDependencyTemplate]
    } => SelfModuleFactory { moduleGraph: [ModuleGraph] },
    [Function: ModuleDecoratorDependency] {
      Template: [Function: ModuleDecoratorDependencyTemplate]
    } => SelfModuleFactory { moduleGraph: [ModuleGraph] },
    [Function: LoaderDependency] => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: RequireIncludeDependency] {
      Template: [Function: RequireIncludeDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: RequireEnsureItemDependency] {
      Template: [Function: NullDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: RequireContextDependency] {
      Template: [Function: ModuleDependencyTemplateAsRequireId]
    } => ContextModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory]
    },
    [Function: ContextElementDependency] => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: ImportDependency] {
      Template: [Function: ImportDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: ImportEagerDependency] {
      Template: [Function: ImportEagerDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: ImportWeakDependency] {
      Template: [Function: ImportDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    },
    [Function: ImportContextDependency] {
      Template: [Function: ContextDependencyTemplateAsRequireCall]
    } => ContextModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory]
    },
    [Function: URLDependency] {
      Template: [Function: URLDependencyTemplate]
    } => NormalModuleFactory {
      hooks: [Object],
      resolverFactory: [ResolverFactory],
      ruleSet: [Object],
      unsafeCache: true,
      cachePredicate: [Function],
      context: '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      fs: [CachedInputFileSystem],
      parserCache: [Map],
      generatorCache: [Map]
    }
  },
  dependencyTemplates: DependencyTemplates {
    _map: Map {
      [Function: CssDependency] => CssDependencyTemplate {},
      [Function] => WorkerDependencyTemplate {},
      [Function] => RuntimeRequirementsDependencyTemplate {},
      [Function] => ConstDependencyTemplate {},
      [Function] => HarmonyExportDependencyTemplate {},
      [Function] => HarmonyImportSideEffectDependencyTemplate {},
      [Function] => HarmonyImportSpecifierDependencyTemplate {},
      [Function] => HarmonyExportDependencyTemplate {},
      [Function] => HarmonyExportDependencyTemplate {},
      [Function] => HarmonyExportSpecifierDependencyTemplate {},
      [Function] => HarmonyExportImportedSpecifierDependencyTemplate {},
      [Function] => HarmonyAcceptDependencyTemplate {},
      [Function] => HarmonyAcceptImportDependencyTemplate {},
      [Function] => AMDRequireDependencyTemplate {},
      [Function] => ModuleDependencyTemplateAsRequireId {},
      [Function] => AMDRequireArrayDependencyTemplate {},
      [Function] => ContextDependencyTemplateAsRequireCall {},
      [Function] => AMDDefineDependencyTemplate {},
      [Function] => UnsupportedDependencyTemplate {},
      [Function] => LocalModuleDependencyTemplate {},
      [Function] => ModuleDependencyTemplateAsId {},
      [Function] => CommonJsFullRequireDependencyTemplate {},
      [Function] => ContextDependencyTemplateAsRequireCall {},
      [Function] => ModuleDependencyTemplateAsId {},
      [Function] => ContextDependencyTemplateAsId {},
      [Function] => RequireResolveHeaderDependencyTemplate {},
      [Function] => RequireHeaderDependencyTemplate {},
      [Function] => CommonJsExportsDependencyTemplate {},
      [Function] => CommonJsExportRequireDependencyTemplate {},
      [Function] => CommonJsSelfReferenceDependencyTemplate {},
      [Function] => ModuleDecoratorDependencyTemplate {},
      [Function] => ExportsInfoDependencyTemplate {},
      [Function] => CachedConstDependencyTemplate {},
      [Function] => RequireIncludeDependencyTemplate {},
      [Function] => NullDependencyTemplate {},
      [Function] => RequireEnsureDependencyTemplate {},
      [Function] => ModuleDependencyTemplateAsRequireId {},
      [Function] => ImportDependencyTemplate {},
      [Function] => ImportEagerDependencyTemplate {},
      [Function] => ImportDependencyTemplate {},
      [Function] => ContextDependencyTemplateAsRequireCall {},
      [Function] => URLDependencyTemplate {}
    },
    _hash: '31d6cfe0d16ae931b73c59d7e0c089c0'
  },
  childrenCounters: {
    HtmlWebpackCompiler: 1,
    'mini-css-extract-plugin /Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/css-loader/dist/cjs.js!/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.css': 1
  },
  usedChunkIds: null,
  usedModuleIds: null,
  needAdditionalPass: false,
  builtModules: WeakSet { <items unknown> },
  codeGeneratedModules: WeakSet { <items unknown> },
  _rebuildingModules: Map {},
  emittedAssets: Set {},
  comparedForEmitAssets: Set { 'main.css', 'index.html', 'bundle.js', 'list.md' },
  fileDependencies: LazySet {
    _set: Set {
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/html-webpack-plugin/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/html-webpack-plugin/lib/loader.js',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/html-webpack-plugin/lib',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/html-webpack-plugin',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin',
      '/Users/shangguanjianming/Desktop/code',
      '/Users/shangguanjianming/Desktop',
      '/Users/shangguanjianming',
      '/Users',
      '/',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.html',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/src'
    },
    _toMerge: Set {},
    _toDeepMerge: [ [LazySet], [LazySet], [LazySet], [LazySet], [Object], [Object] ],
    _needMerge: true,
    _deopt: false
  },
  contextDependencies: LazySet {
    _set: Set {},
    _toMerge: Set {},
    _toDeepMerge: [ [LazySet], [LazySet], [LazySet], [LazySet], [Object], [Object] ],
    _needMerge: true,
    _deopt: false
  },
  missingDependencies: LazySet {
    _set: Set {
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/node_modules/html-webpack-plugin/lib/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/src/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/package.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.html',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.html.js',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.html.json',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/Users/shangguanjianming/Desktop/code/webpack-plugin/src/index.html.wasm',
      '/Users/shangguanjianming/Desktop/code/webpack-plugin/src/package.json'
    },
    _toMerge: Set {},
    _toDeepMerge: [ [LazySet], [LazySet], [LazySet], [LazySet], [Object], [Object] ],
    _needMerge: true,
    _deopt: false
  },
  buildDependencies: LazySet {
    _set: Set {},
    _toMerge: Set {},
    _toDeepMerge: [ [LazySet], [LazySet], [LazySet] ],
    _needMerge: true,
    _deopt: false
  },
  compilationDependencies: { add: [Function: deprecated] },
  _modulesCache: CacheFacade {
    _cache: Cache { hooks: [Object] },
    _name: 'Compilation/modules'
  },
  _assetsCache: CacheFacade {
    _cache: Cache { hooks: [Object] },
    _name: 'Compilation/assets'
  },
  _codeGenerationCache: CacheFacade {
    _cache: Cache { hooks: [Object] },
    _name: 'Compilation/codeGeneration'
  },
  fullHash: 'cf41f162b48dfb960dde1d8f2a023abd',
  hash: 'cf41f162b48dfb960dde'
}