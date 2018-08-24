(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":2,"./handlebars/exception":5,"./handlebars/no-conflict":15,"./handlebars/runtime":16,"./handlebars/safe-string":17,"./handlebars/utils":18}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":3,"./exception":5,"./helpers":6,"./logger":14,"./utils":18}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":4}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":18}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":7,"./helpers/each":8,"./helpers/helper-missing":9,"./helpers/if":10,"./helpers/log":11,"./helpers/lookup":12,"./helpers/with":13}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":5,"../utils":18}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":5}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":18}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":18}],15:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":2,"./exception":5,"./utils":18}],17:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],19:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":1}],20:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":19}],21:[function(require,module,exports){
/* global apex */
var Handlebars = require('hbsfy/runtime')

Handlebars.registerHelper('raw', function (options) {
  return options.fn(this)
})

// Require dynamic templates
var modalReportTemplate = require('./templates/modal-report.hbs')
Handlebars.registerPartial('report', require('./templates/partials/_report.hbs'))
Handlebars.registerPartial('rows', require('./templates/partials/_rows.hbs'))
Handlebars.registerPartial('pagination', require('./templates/partials/_pagination.hbs'))

;(function ($, window) {
  $.widget('mho.modalLov', {
    // default options
    options: {
      id: '',
      title: '',
      itemName: '',
      searchField: '',
      searchButton: '',
      searchPlaceholder: '',
      ajaxIdentifier: '',
      showHeaders: false,
      returnCol: '',
      displayCol: '',
      validationError: '',
      cascadingItems: '',
      modalWidth: 600,
      noDataFound: '',
      allowMultilineRows: false,
      rowCount: 15,
      pageItemsToSubmit: '',
      markClasses: 'u-hot',
      hoverClasses: 'hover u-color-1',
      previousLabel: 'previous',
      nextLabel: 'next'
    },

    _returnValue: '',

    _item$: null,
    _searchButton$: null,
    _clearInput$: null,

    _searchField$: null,

    _templateData: {},
    _lastSearchTerm: '',

    _modalDialog$: null,

    _activeDelay: false,
    _disableChangeEvent: false,

    _ig$: null,
    _grid: null,

    _topApex: null,

    _resetFocus: function () {
      var self = this
      if (this._grid) {
        var recordId = this._grid.model.getRecordId(this._grid.view$.grid('getSelectedRecords')[0])
        var column = this._ig$.interactiveGrid('option').config.columns.filter(function (column) {
          return column.staticId === self.options.itemName
        })[0]
        this._grid.setEditMode(false)
        this._grid.view$.grid('gotoCell', recordId, column.name)
        this._grid.focus()
      } else {
        this._item$.focus()
      }
    },

    // Combination of number, char and space, arrow keys
    _validSearchKeys: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, // chars
      93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // numpad numbers
      40, // arrow down
      32, // spacebar
      8, // backspace
      106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 220 // interpunction
    ],

    _create: function () {
      var self = this

      self._item$ = $('#' + self.options.itemName)
      self._returnValue = self._item$.data('returnValue').toString()
      self._searchButton$ = $('#' + self.options.searchButton)
      self._clearInput$ = self._item$.parent().find('.search-clear')
      self._topApex = apex.util.getTopApex()

      self._addCSSToTopLevel()

      // Trigger event on click input display field
      self._triggerLOVOnDisplay()

      // Trigger event on click input group addon button (magnifier glass)
      self._triggerLOVOnButton()

      // Clear text when clear icon is clicked
      self._initClearInput()

      // Cascading LOV item actions
      self._initCascadingLOVs()

      // Init APEX pageitem functions
      self._initApexItem()
    },

    _onOpenDialog: function (modal, options) {
      var self = options.widget
      self._modalDialog$ = self._topApex.jQuery(modal)
      // Focus on search field in LOV
      self._topApex.jQuery('#' + self.options.searchField).focus()
      // Remove validation results
      self._removeValidation()
      // Add text from display field
      if (options.fillSearchText) {
        self._topApex.apex.item(self.options.searchField).setValue(self._item$.val())
      }
      // Add class on hover
      self._onRowHover()
      // selectInitialRow
      self._selectInitialRow()
      // Set action when a row is selected
      self._onRowSelected()
      // Navigate on arrow keys trough LOV
      self._initKeyboardNavigation()
      // Set search action
      self._initSearch()
      // Set pagination actions
      self._initPagination()
    },

    _onCloseDialog: function (modal, options) {
      // close takes place when no record has been selected, instead the close modal (or esc) was clicked/ pressed
      // It could mean two things: keep current or take the user's display value
      // What about two equal display values?

      // But no record selection could mean cancel
      // but open modal and forget about it
      // in the end, this should keep things intact as they were
      options.widget._destroy(modal)
      options.widget._triggerLOVOnDisplay()
    },

    _initGridConfig: function () {
      this._ig$ = this._item$.closest('.a-IG')

      if (this._ig$.length > 0) {
        this._grid = this._ig$.interactiveGrid('getViews').grid
      }
    },

    _onLoad: function (options) {
      var self = options.widget

      self._initGridConfig()

      // Create LOV region
      var $modalRegion = self._topApex.jQuery(modalReportTemplate(self._templateData)).appendTo('body')
      
      // Open new modal
      $modalRegion.dialog({
        height: $modalRegion.find('.t-Report-wrap').height() + 150, // + dialog button height
        width: self.options.modalWidth,
        closeText: apex.lang.getMessage('APEX.DIALOG.CLOSE'),
        draggable: true,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        dialogClass: 'ui-dialog--apex ',
        open: function (modal) {
          // remove opener because it makes the page scroll down for IG
          self._topApex.jQuery(this).data('uiDialog').opener = self._topApex.jQuery()
          self._topApex.navigation.beginFreezeScroll()
          self._onOpenDialog(this, options)
        },
        beforeClose: function () {
          self._onCloseDialog(this, options)
          // Prevent scrolling down on modal close
          if (document.activeElement) {
            // document.activeElement.blur()
          }
        },
        close: function () {
          self._topApex.navigation.endFreezeScroll()
          // Stop edit mode of possible IG
        }
      })
    },

    _onReload: function () {
      var self = this
      // This function is executed after a search
      var reportHtml = Handlebars.partials.report(self._templateData)
      var paginationHtml = Handlebars.partials.pagination(self._templateData)

      // Get current modal-lov table
      var modalLOVTable = self._modalDialog$.find('.modal-lov-table')
      var pagination = self._modalDialog$.find('.t-ButtonRegion-wrap')

      // Replace report with new data
      $(modalLOVTable).replaceWith(reportHtml)
      $(pagination).html(paginationHtml)

      // selectInitialRow in new modal-lov table
      self._selectInitialRow()

      // Make the enter key do something again
      self._activeDelay = false
    },

    _unescape: function (val) {
      return val // $('<input value="' + val + '"/>').val()
    },

    _getTemplateData: function () {
      var self = this

      // Create return Object
      var templateData = {
        id: self.options.id,
        classes: 'modal-lov',
        title: self.options.title,
        modalSize: self.options.modalSize,
        region: {
          attributes: 'style="bottom: 66px;"'
        },
        searchField: {
          id: self.options.searchField,
          placeholder: self.options.searchPlaceholder
        },
        report: {
          columns: {},
          rows: {},
          colCount: 0,
          rowCount: 0,
          showHeaders: self.options.showHeaders,
          noDataFound: self.options.noDataFound,
          classes: (self.options.allowMultilineRows) ? 'multiline' : ''
        },
        pagination: {
          rowCount: 0,
          firstRow: 0,
          lastRow: 0,
          allowPrev: false,
          allowNext: false,
          previous: self.options.previousLabel,
          next: self.options.nextLabel
        }
      }

      // No rows found?
      if (self.options.dataSource.row.length === 0) {
        return templateData
      }

      // Get columns
      var columns = Object.keys(self.options.dataSource.row[0])

      // Pagination
      templateData.pagination.firstRow = self.options.dataSource.row[0]['ROWNUM###']
      templateData.pagination.lastRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['ROWNUM###']

      // Check if there is a next resultset
      var nextRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['NEXTROW###']

      // Allow previous button?
      if (templateData.pagination.firstRow > 1) {
        templateData.pagination.allowPrev = true
      }

      // Allow next button?
      try {
        if (nextRow.toString().length > 0) {
          templateData.pagination.allowNext = true
        }
      } catch (err) {
        templateData.pagination.allowNext = false
      }

      // Remove internal columns (ROWNUM###, ...)
      columns.splice(columns.indexOf('ROWNUM###'), 1)
      columns.splice(columns.indexOf('NEXTROW###'), 1)

      // Remove column return-item
      columns.splice(columns.indexOf(self.options.returnCol), 1)
      // Remove column return-display if display columns are provided
      if (columns.length > 1) {
        columns.splice(columns.indexOf(self.options.displayCol), 1)
      }

      templateData.report.colCount = columns.length

      // Rename columns to standard names like column0, column1, ..
      var column = {}
      $.each(columns, function (key, val) {
        if (columns.length === 1 && self.options.itemLabel) {
          column['column' + key] = {
            name: val,
            label: self.options.itemLabel
          }
        } else {
          column['column' + key] = {
            name: val
          }
        }
        templateData.report.columns = $.extend(templateData.report.columns, column)
      })

      /* Get rows

        format will be like this:

        rows = [{column0: "a", column1: "b"}, {column0: "c", column1: "d"}]

      */
      var tmpRow

      var rows = $.map(self.options.dataSource.row, function (row, rowKey) {
        tmpRow = {
          columns: {}
        }
        // add column values to row
        $.each(templateData.report.columns, function (colId, col) {
          tmpRow.columns[colId] = self._unescape(row[col.name])
        })
        // add metadata to row
        tmpRow.returnVal = row[self.options.returnCol]
        tmpRow.displayVal = row[self.options.displayCol]
        return tmpRow
      })

      templateData.report.rows = rows

      templateData.report.rowCount = (rows.length === 0 ? false : rows.length)
      templateData.pagination.rowCount = templateData.report.rowCount

      return templateData
    },

    _destroy: function (modal) {
      var self = this
      $(window.top.document).off('keydown')
      $(window.top.document).off('keyup', '#' + self.options.searchField)
      self._item$.off('keyup')
      self._modalDialog$.remove()
      self._topApex.navigation.endFreezeScroll()
    },

    _getData: function (options, handler) {
      var self = this

      var settings = {
        searchTerm: '',
        firstRow: 1,
        fillSearchText: true
      }

      settings = $.extend(settings, options)
      var searchTerm = (settings.searchTerm.length > 0) ? settings.searchTerm : self._topApex.item(self.options.searchField).getValue()
      var items = self.options.pageItemsToSubmit

      // Store last searchTerm
      self._lastSearchTerm = searchTerm

      apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_DATA',
        x02: searchTerm, // searchterm
        x03: settings.firstRow, // first rownum to return
        pageItems: items
      }, {
        target: self._item$,
        dataType: 'json',
        loadingIndicator: $.proxy(options.loadingIndicator, self),
        success: function (pData) {
          self.options.dataSource = pData
          self._templateData = self._getTemplateData()
          handler({
            widget: self,
            fillSearchText: settings.fillSearchText
          })
        }
      })
    },

    _initSearch: function () {
      var self = this
      // if the lastSearchTerm is not equal to the current searchTerm, then search immediate
      if (self._lastSearchTerm !== self._topApex.item(self.options.searchField).getValue()) {
        self._getData({
          firstRow: 1,
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      }

      // Action when user inputs search text
      $(window.top.document).on('keyup', '#' + self.options.searchField, function (event) {
        // Do nothing for navigation keys, escape and enter
        var navigationKeys = [37, 38, 39, 40, 9, 33, 34, 27, 13]
        if ($.inArray(event.keyCode, navigationKeys) > -1) {
          return false
        }

        // Stop the enter key from selecting a row
        self._activeDelay = true

        // Don't search on all key events but add a delay for performance
        var srcEl = event.currentTarget
        if (srcEl.delayTimer) {
          clearTimeout(srcEl.delayTimer)
        }

        srcEl.delayTimer = setTimeout(function () {
          self._getData({
            firstRow: 1,
            loadingIndicator: self._modalLoadingIndicator
          }, function () {
            self._onReload()
          })
        }, 350)
      })
    },

    _initPagination: function () {
      var self = this
      var prevSelector = '#' + self.options.id + ' .t-Report-paginationLink--prev'
      var nextSelector = '#' + self.options.id + ' .t-Report-paginationLink--next'

      // remove current listeners
      self._topApex.jQuery(window.top.document).off('click', prevSelector)
      self._topApex.jQuery(window.top.document).off('click', nextSelector)

      // Previous set
      self._topApex.jQuery(window.top.document).on('click', prevSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumPrevSet(),
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      })

      // Next set
      self._topApex.jQuery(window.top.document).on('click', nextSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumNextSet(),
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      })
    },

    _getFirstRownumPrevSet: function () {
      var self = this
      try {
        return self._templateData.pagination.firstRow - self.options.rowCount
      } catch (err) {
        return 1
      }
    },

    _getFirstRownumNextSet: function () {
      var self = this
      try {
        return self._templateData.pagination.lastRow + 1
      } catch (err) {
        return 16
      }
    },

    _openLOV: function (options) {
      var self = this
      // Remove previous modal-lov region
      $('#' + self.options.id, document).remove()

      self._getData({
        firstRow: 1,
        searchTerm: options.searchTerm,
        fillSearchText: options.fillSearchText,
        loadingIndicator: self._itemLoadingIndicator
      }, options.afterData)
    },

    _addCSSToTopLevel: function () {
      var self = this
      // CSS file is always present when the current window is the top window, so do nothing
      if (window === window.top) {
        return
      }
      var cssSelector = 'link[rel="stylesheet"][href*="modal-lov"]'

      // Check if file exists in top window
      if (self._topApex.jQuery(cssSelector).length === 0) {
        self._topApex.jQuery('head').append($(cssSelector).clone())
      }
    },

    _triggerLOVOnDisplay: function () {
      var self = this
      // Trigger event on click input display field
      self._item$.on('keyup', function (e) {
        if ($.inArray(e.keyCode, self._validSearchKeys) > -1 && (!e.ctrlKey || e.keyCode === 86)) {
          $(this).off('keyup')
          self._openLOV({
            searchTerm: self._item$.val(),
            fillSearchText: true,
            afterData: function (options) {
              self._onLoad(options)
              // Clear input as soon as modal is ready
              self._returnValue = ''
              self._item$.val('')
            }
          })
        }
      })
    },

    _triggerLOVOnButton: function () {
      var self = this
      // Trigger event on click input group addon button (magnifier glass)
      self._searchButton$.on('click', function (e) {
        self._openLOV({
          searchTerm: '',
          fillSearchText: false,
          afterData: self._onLoad
        })
      })
    },

    _onRowHover: function () {
      var self = this
      self._modalDialog$.on('mouseenter mouseleave', '.t-Report-report tbody tr', function () {
        if ($(this).hasClass('mark')) {
          return
        }
        $(this).toggleClass(self.options.hoverClasses)
      })
    },

    _selectInitialRow: function () {
      var self = this
      // If current item in LOV then select that row
      // Else select first row of report
      var $curRow = self._modalDialog$.find('.t-Report-report tr[data-return="' + self._returnValue + '"]')
      if ($curRow.length > 0) {
        $curRow.addClass('mark ' + self.options.markClasses)
      } else {
        self._modalDialog$.find('.t-Report-report tr[data-return]').first().addClass('mark ' + self.options.markClasses)
      }
    },

    _initKeyboardNavigation: function () {
      var self = this

      function navigate (direction, event) {
        event.stopImmediatePropagation()
        event.preventDefault()
        var currentRow = self._modalDialog$.find('.t-Report-report tr.mark')
        switch (direction) {
          case 'up':
            if ($(currentRow).prev().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).prev().addClass('mark ' + self.options.markClasses)
            }
            break
          case 'down':
            if ($(currentRow).next().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).next().addClass('mark ' + self.options.markClasses)
            }
            break
        }
      }

      $(window.top.document).on('keydown', function (e) {
        switch (e.keyCode) {
          case 38: // up
            navigate('up', e)
            break
          case 40: // down
            navigate('down', e)
            break
          case 9: // tab
            navigate('down', e)
            break
          case 13: // ENTER
            if (!self._activeDelay) {
              var currentRow = self._modalDialog$.find('.t-Report-report tr.mark').first()
              self._returnSelectedRow(currentRow)
            }
            break
          case 33: // Page up
            e.preventDefault()
            self._topApex.jQuery('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--prev').trigger('click')
            break
          case 34: // Page down
            e.preventDefault()
            self._topApex.jQuery('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--next').trigger('click')
            break
        }
      })
    },

    _returnSelectedRow: function ($row) {
      var self = this

      // Do nothing if row does not exist
      if (!$row || $row.length === 0) {
        return
      }

      apex.item(self.options.itemName).setValue(self._unescape($row.data('return').toString()), self._unescape($row.data('display')))


      // Trigger a custom event and add data to it: all columns of the row
      var data = {}
      $.each($('.t-Report-report tr.mark').find('td'), function (key, val) {
        data[$(val).attr('headers')] = $(val).html()
      })

      // Finally hide the modal
      self._modalDialog$.dialog('close')

      // And focus on input but not for IG column item
      self._resetFocus()
    },

    _onRowSelected: function () {
      var self = this
      // Action when row is clicked
      self._modalDialog$.on('click', '.modal-lov-table .t-Report-report tbody tr', function (e) {
        self._returnSelectedRow(self._topApex.jQuery(this))
      })
    },

    _removeValidation: function () {
      // Clear current errors
      apex.message.clearErrors(this.options.itemName)
    },

    _clearInput: function () {
      var self = this
      apex.item(self.options.itemName).setValue('')
      self._returnValue = ''
      self._removeValidation()
      self._item$.focus()
    },

    _initClearInput: function () {
      var self = this

      self._clearInput$.on('click', function () {
        self._clearInput()
      })
    },

    _initCascadingLOVs: function () {
      var self = this
      self._topApex.jQuery(self.options.cascadingItems).on('change', function () {
        self._clearInput()
      })
    },

    _setValueBasedOnDisplay: function (pValue) {
      var self = this

      var promise = apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_VALUE',
        x02: pValue // returnVal
      }, {
        dataType: 'json',
        loadingIndicator: $.proxy(self._itemLoadingIndicator, self),
        success: function (pData) {
          self._disableChangeEvent = false
          self._returnValue = pData.returnValue
          self._item$.val(pData.displayValue)
          self._item$.trigger('change')
        }
      })

      promise
        .done(function (pData) {
          self._returnValue = pData.returnValue
          self._item$.val(pData.displayValue)
          self._item$.trigger('change')
        })
        .always(function () {
          self._disableChangeEvent = false
        })
    },

    _initApexItem: function () {
      var self = this
      // Set and get value via apex functions
      apex.item.create(self.options.itemName, {
        enable: function () {
          self._item$.prop('disabled', false)
          self._searchButton$.prop('disabled', false)
          self._clearInput$.show()
        },
        disable: function () {
          self._item$.prop('disabled', true)
          self._searchButton$.prop('disabled', true)
          self._clearInput$.hide()
        },
        isDisabled: function () {
          return self._item$.prop('disabled')
        },
        show: function () {
          self._item$.show()
          self._searchButton$.show()
        },
        hide: function () {
          self._item$.hide()
          self._searchButton$.hide()
        },

        setValue: function (pValue, pDisplayValue, pSuppressChangeEvent) {
          if (pDisplayValue || !pValue || pValue.length === 0) {
            // Assuming no check is needed to see if the value is in the LOV
            self._item$.val(pDisplayValue)
            self._returnValue = pValue
          } else {
            self._item$.val(pDisplayValue)
            self._disableChangeEvent = true
            self._setValueBasedOnDisplay(pValue)
          }
        },
        getValue: function () {
          // Always return at least an empty string
          return self._returnValue || ''
        },
        isChanged: function () {
          return document.getElementById(self.options.itemName).value !== document.getElementById(self.options.itemName).defaultValue
        }
      })
      apex.item(self.options.itemName).callbacks.displayValueFor = function () {
        return self._item$.val()
      }

      // Only trigger the change event after the Async callback if needed
      self._item$['trigger'] = function (type, data) {
        if (type === 'change' && self._disableChangeEvent) {
          return
        }
        $.fn.trigger.call(self._item$, type, data)
      }
    },

    _itemLoadingIndicator: function (loadingIndicator) {
      $('#' + this.options.searchButton).after(loadingIndicator)
      return loadingIndicator
    },

    _modalLoadingIndicator: function (loadingIndicator) {
      this._modalDialog$.prepend(loadingIndicator)
      return loadingIndicator
    }
  })
})(apex.jQuery, window)

},{"./templates/modal-report.hbs":22,"./templates/partials/_pagination.hbs":23,"./templates/partials/_report.hbs":24,"./templates/partials/_rows.hbs":25,"hbsfy/runtime":20}],22:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"t-DialogRegion js-regieonDialog t-Form--stretchInputs t-Form--large modal-lov\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"t-DialogRegion-body js-regionDialog-body no-padding\" "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.region : depth0)) != null ? stack1.attributes : stack1), depth0)) != null ? stack1 : "")
    + ">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col col-12\">\r\n                    <div class=\"t-Report t-Report--altRowsDefault\">\r\n                        <div class=\"t-Report-wrap\" style=\"width: 100%\">\r\n                            <div class=\"t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs margin-top-sm\" id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.id : stack1), depth0))
    + "_CONTAINER\">\r\n                                <div class=\"t-Form-inputContainer\">\r\n                                    <div class=\"t-Form-itemWrapper\">\r\n                                        <input type=\"text\" class=\"apex-item-text modal-lov-item \" id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" autocomplete=\"off\" placeholder=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.placeholder : stack1), depth0))
    + "\">\r\n                                        <button type=\"button\" id=\"P1110_ZAAL_FK_CODE_BUTTON\" class=\"a-Button modal-lov-button a-Button--popupLOV\">\r\n                                            <span class=\"fa fa-search\" aria-hidden=\"true\"></span>\r\n                                        </button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n"
    + ((stack1 = container.invokePartial(partials.report,depth0,{"name":"report","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"t-DialogRegion-buttons js-regionDialog-buttons\">\r\n        <div class=\"t-ButtonRegion t-ButtonRegion--dialogRegion\">\r\n            <div class=\"t-ButtonRegion-wrap\">\r\n"
    + ((stack1 = container.invokePartial(partials.pagination,depth0,{"name":"pagination","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":20}],23:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div class=\"t-ButtonRegion-col t-ButtonRegion-col--left\">\r\n    <div class=\"t-ButtonRegion-buttons\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.allowPrev : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n<div class=\"t-ButtonRegion-col t-ButtonRegion-col--center\" style=\"text-align: center;\">\r\n  "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.firstRow : stack1), depth0))
    + " - "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.lastRow : stack1), depth0))
    + "\r\n</div>\r\n<div class=\"t-ButtonRegion-col t-ButtonRegion-col--right\">\r\n    <div class=\"t-ButtonRegion-buttons\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.allowNext : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a href=\"javascript:void(0);\" class=\"t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev\">\r\n          <span class=\"a-Icon icon-left-arrow\"></span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.previous : stack1), depth0))
    + "\r\n        </a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a href=\"javascript:void(0);\" class=\"t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.next : stack1), depth0))
    + "\r\n          <span class=\"a-Icon icon-right-arrow\"></span>\r\n        </a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.rowCount : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

},{"hbsfy/runtime":20}],24:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), buffer = 
  "            <table cellpadding=\"0\" border=\"0\" cellspacing=\"0\" summary=\"\" class=\"t-Report-report "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.classes : stack1), depth0))
    + "\" width=\"100%\">\r\n              <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.showHeaders : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.report || (depth0 != null ? depth0.report : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"report","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(alias1,options) : helper));
  if (!helpers.report) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "              </tbody>\r\n            </table>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                  <thead>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.columns : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                  </thead>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                      <th class=\"t-Report-colHead\" id=\""
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "                      </th>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                          "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                          "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.rows,depth0,{"name":"rows","data":data,"indent":"                  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <span class=\"nodatafound\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.noDataFound : stack1), depth0))
    + "</span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"t-Report-tableWrap modal-lov-table\">\r\n  <table cellpadding=\"0\" border=\"0\" cellspacing=\"0\" class=\"\" width=\"100%\">\r\n    <tbody>\r\n      <tr>\r\n        <td></td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.rowCount : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n"
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.rowCount : stack1),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":20}],25:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <tr data-return=\""
    + alias2(alias1((depth0 != null ? depth0.returnVal : depth0), depth0))
    + "\" data-display=\""
    + alias2(alias1((depth0 != null ? depth0.displayVal : depth0), depth0))
    + "\" class=\"pointer\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.columns : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "      <td headers=\""
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"t-Report-cell\">"
    + alias1(container.lambda(depth0, depth0))
    + "</td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.rows : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

},{"hbsfy/runtime":20}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYnNmeS9ydW50aW1lLmpzIiwic3JjL2pzL21vZGFsLWxvdi5qcyIsInNyYy9qcy90ZW1wbGF0ZXMvbW9kYWwtcmVwb3J0LmhicyIsInNyYy9qcy90ZW1wbGF0ZXMvcGFydGlhbHMvX3BhZ2luYXRpb24uaGJzIiwic3JjL2pzL3RlbXBsYXRlcy9wYXJ0aWFscy9fcmVwb3J0LmhicyIsInNyYy9qcy90ZW1wbGF0ZXMvcGFydGlhbHMvX3Jvd3MuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OEJDQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICogYXMgYmFzZSBmcm9tICcuL2hhbmRsZWJhcnMvYmFzZSc7XG5cbi8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbi8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG5pbXBvcnQgU2FmZVN0cmluZyBmcm9tICcuL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2hhbmRsZWJhcnMvZXhjZXB0aW9uJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vaGFuZGxlYmFycy91dGlscyc7XG5pbXBvcnQgKiBhcyBydW50aW1lIGZyb20gJy4vaGFuZGxlYmFycy9ydW50aW1lJztcblxuaW1wb3J0IG5vQ29uZmxpY3QgZnJvbSAnLi9oYW5kbGViYXJzL25vLWNvbmZsaWN0JztcblxuLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gIGxldCBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gIGhiLlNhZmVTdHJpbmcgPSBTYWZlU3RyaW5nO1xuICBoYi5FeGNlcHRpb24gPSBFeGNlcHRpb247XG4gIGhiLlV0aWxzID0gVXRpbHM7XG4gIGhiLmVzY2FwZUV4cHJlc3Npb24gPSBVdGlscy5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICB9O1xuXG4gIHJldHVybiBoYjtcbn1cblxubGV0IGluc3QgPSBjcmVhdGUoKTtcbmluc3QuY3JlYXRlID0gY3JlYXRlO1xuXG5ub0NvbmZsaWN0KGluc3QpO1xuXG5pbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0O1xuIiwiaW1wb3J0IHtjcmVhdGVGcmFtZSwgZXh0ZW5kLCB0b1N0cmluZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0SGVscGVyc30gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9yc30gZnJvbSAnLi9kZWNvcmF0b3JzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9ICc0LjAuMTEnO1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1JFVklTSU9OID0gNztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuICA3OiAnPj0gNC4wLjAnXG59O1xuXG5jb25zdCBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nZ2VyLmxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgZXh0ZW5kKHRoaXMucGFydGlhbHMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIiR7bmFtZX1cIiBhcyB1bmRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuZGVjb3JhdG9yc1tuYW1lXTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBsb2cgPSBsb2dnZXIubG9nO1xuXG5leHBvcnQge2NyZWF0ZUZyYW1lLCBsb2dnZXJ9O1xuIiwiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiIsImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iLCJcbmNvbnN0IGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICBsZXQgbG9jID0gbm9kZSAmJiBub2RlLmxvYyxcbiAgICAgIGxpbmUsXG4gICAgICBjb2x1bW47XG4gIGlmIChsb2MpIHtcbiAgICBsaW5lID0gbG9jLnN0YXJ0LmxpbmU7XG4gICAgY29sdW1uID0gbG9jLnN0YXJ0LmNvbHVtbjtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgY29sdW1uO1xuICB9XG5cbiAgbGV0IHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEV4Y2VwdGlvbik7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChsb2MpIHtcbiAgICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG5cbiAgICAgIC8vIFdvcmsgYXJvdW5kIGlzc3VlIHVuZGVyIHNhZmFyaSB3aGVyZSB3ZSBjYW4ndCBkaXJlY3RseSBzZXQgdGhlIGNvbHVtbiB2YWx1ZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2x1bW4nLCB7XG4gICAgICAgICAgdmFsdWU6IGNvbHVtbixcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChub3ApIHtcbiAgICAvKiBJZ25vcmUgaWYgdGhlIGJyb3dzZXIgaXMgdmVyeSBwYXJ0aWN1bGFyICovXG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG4iLCJpbXBvcnQgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlckVhY2ggZnJvbSAnLi9oZWxwZXJzL2VhY2gnO1xuaW1wb3J0IHJlZ2lzdGVySGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVySWYgZnJvbSAnLi9oZWxwZXJzL2lmJztcbmltcG9ydCByZWdpc3RlckxvZyBmcm9tICcuL2hlbHBlcnMvbG9nJztcbmltcG9ydCByZWdpc3Rlckxvb2t1cCBmcm9tICcuL2hlbHBlcnMvbG9va3VwJztcbmltcG9ydCByZWdpc3RlcldpdGggZnJvbSAnLi9oZWxwZXJzL3dpdGgnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyRWFjaChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySWYoaW5zdGFuY2UpO1xuICByZWdpc3RlckxvZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9va3VwKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJXaXRoKGluc3RhbmNlKTtcbn1cbiIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzQXJyYXksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuLFxuICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmV0ID0gJycsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHRQYXRoO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjSXRlcmF0aW9uKGZpZWxkLCBpbmRleCwgbGFzdCkge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5rZXkgPSBmaWVsZDtcbiAgICAgICAgZGF0YS5pbmRleCA9IGluZGV4O1xuICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgIGRhdGEubGFzdCA9ICEhbGFzdDtcblxuICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGNvbnRleHQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHByaW9yS2V5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgLy8gV2UncmUgcnVubmluZyB0aGUgaXRlcmF0aW9ucyBvbmUgc3RlcCBvdXQgb2Ygc3luYyBzbyB3ZSBjYW4gZGV0ZWN0XG4gICAgICAgICAgICAvLyB0aGUgbGFzdCBpdGVyYXRpb24gd2l0aG91dCBoYXZlIHRvIHNjYW4gdGhlIG9iamVjdCB0d2ljZSBhbmQgY3JlYXRlXG4gICAgICAgICAgICAvLyBhbiBpdGVybWVkaWF0ZSBrZXlzIGFycmF5LlxuICAgICAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJpb3JLZXkgPSBrZXk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbigvKiBtZXNzYWdlLCBvcHRpb25zICovKSB7XG4gICAgbGV0IGFyZ3MgPSBbdW5kZWZpbmVkXSxcbiAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgbGV2ZWwgPSAxO1xuICAgIGlmIChvcHRpb25zLmhhc2gubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmhhc2gubGV2ZWw7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5kYXRhLmxldmVsO1xuICAgIH1cbiAgICBhcmdzWzBdID0gbGV2ZWw7XG5cbiAgICBpbnN0YW5jZS5sb2coLi4uIGFyZ3MpO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn1cbiIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFpc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0XSwgW2RhdGEgJiYgZGF0YS5jb250ZXh0UGF0aF0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBDT01QSUxFUl9SRVZJU0lPTiwgUkVWSVNJT05fQ0hBTkdFUywgY3JlYXRlRnJhbWUgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgY29uc3QgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mbyAmJiBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICBjb25zdCBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBydW50aW1lVmVyc2lvbnMgKyAnKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKCcgKyBjb21waWxlclZlcnNpb25zICsgJykuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBjb21waWxlckluZm9bMV0gKyAnKS4nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlJyk7XG4gIH1cbiAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgfVxuXG4gIHRlbXBsYXRlU3BlYy5tYWluLmRlY29yYXRvciA9IHRlbXBsYXRlU3BlYy5tYWluX2Q7XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICBvcHRpb25zLmlkc1swXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGxldCByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJPcHRpb25zLCBlbnYpO1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuICAgICAgICBsZXQgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICBsZXQgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICBpZiAoIShuYW1lIGluIG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgY29uc3QgbGVuID0gZGVwdGhzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGRlcHRoc1tpXSAmJiBkZXB0aHNbaV1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBkZXB0aHNbaV1bbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxhbWJkYTogZnVuY3Rpb24oY3VycmVudCwgY29udGV4dCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICB9LFxuXG4gICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgIGZuOiBmdW5jdGlvbihpKSB7XG4gICAgICBsZXQgcmV0ID0gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBwcm9ncmFtczogW10sXG4gICAgcHJvZ3JhbTogZnVuY3Rpb24oaSwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgICAgbGV0IHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMgfHwgYmxvY2tQYXJhbXMgfHwgZGVjbGFyZWRCbG9ja1BhcmFtcykge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9ncmFtV3JhcHBlcjtcbiAgICB9LFxuXG4gICAgZGF0YTogZnVuY3Rpb24odmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgbGV0IG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgb2JqID0gVXRpbHMuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIC8vIEFuIGVtcHR5IG9iamVjdCB0byB1c2UgYXMgcmVwbGFjZW1lbnQgZm9yIG51bGwtY29udGV4dHNcbiAgICBudWxsQ29udGV4dDogT2JqZWN0LnNlYWwoe30pLFxuXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJcbiAgfTtcblxuICBmdW5jdGlvbiByZXQoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIGxldCBkZXB0aHMsXG4gICAgICAgIGJsb2NrUGFyYW1zID0gdGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zID8gW10gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBjb250ZXh0ICE9IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQvKiwgb3B0aW9ucyovKSB7XG4gICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIH1cbiAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcbiAgICByZXR1cm4gbWFpbihjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT0gZGVwdGhzWzBdICYmICEoY29udGV4dCA9PT0gY29udGFpbmVyLm51bGxDb250ZXh0ICYmIGRlcHRoc1swXSA9PT0gbnVsbCkpIHtcbiAgICAgIGN1cnJlbnREZXB0aHMgPSBbY29udGV4dF0uY29uY2F0KGRlcHRocyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuKGNvbnRhaW5lcixcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscyxcbiAgICAgICAgb3B0aW9ucy5kYXRhIHx8IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zICYmIFtvcHRpb25zLmJsb2NrUGFyYW1zXS5jb25jYXQoYmxvY2tQYXJhbXMpLFxuICAgICAgICBjdXJyZW50RGVwdGhzKTtcbiAgfVxuXG4gIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBpZiAoIXBhcnRpYWwpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnQHBhcnRpYWwtYmxvY2snKSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuICAgIC8vIFRoaXMgaXMgYSBkeW5hbWljIHBhcnRpYWwgdGhhdCByZXR1cm5lZCBhIHN0cmluZ1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnRpYWw7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG4gIH1cbiAgcmV0dXJuIHBhcnRpYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgLy8gVXNlIHRoZSBjdXJyZW50IGNsb3N1cmUgY29udGV4dCB0byBzYXZlIHRoZSBwYXJ0aWFsLWJsb2NrIGlmIHRoaXMgcGFydGlhbFxuICBjb25zdCBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICBsZXQgcGFydGlhbEJsb2NrO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcbiAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGZ1bmN0aW9uIHBhcnRpYWxCbG9ja1dyYXBwZXIoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcbiAgICAgIC8vIGkuZS4gdGhlIHBhcnQgaW5zaWRlIHRoZSBibG9jayBvZiB0aGUgcGFydGlhbCBjYWxsLlxuICAgICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIGlmIChmbi5wYXJ0aWFscykge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFscyA9IFV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucy5wYXJ0aWFscywgZm4ucGFydGlhbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuICcnOyB9XG5cbmZ1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpIHtcbiAgaWYgKGZuLmRlY29yYXRvcikge1xuICAgIGxldCBwcm9wcyA9IHt9O1xuICAgIHByb2cgPSBmbi5kZWNvcmF0b3IocHJvZywgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGhzICYmIGRlcHRoc1swXSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcbiAgfVxuICByZXR1cm4gcHJvZztcbn1cbiIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuIiwiY29uc3QgZXNjYXBlID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgJ2AnOiAnJiN4NjA7JyxcbiAgJz0nOiAnJiN4M0Q7J1xufTtcblxuY29uc3QgYmFkQ2hhcnMgPSAvWyY8PlwiJ2A9XS9nLFxuICAgICAgcG9zc2libGUgPSAvWyY8PlwiJ2A9XS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChvYmovKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGxldCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtc3R5bGUgKi9cbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4vLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG5leHBvcnQge2lzRnVuY3Rpb259O1xuLyogZXNsaW50LWVuYWJsZSBmdW5jLXN0eWxlICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuXG4vLyBPbGRlciBJRSB2ZXJzaW9ucyBkbyBub3QgZGlyZWN0bHkgc3VwcG9ydCBpbmRleE9mIHNvIHdlIG11c3QgaW1wbGVtZW50IG91ciBvd24sIHNhZGx5LlxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgICBpZiAoc3RyaW5nICYmIHN0cmluZy50b0hUTUwpIHtcbiAgICAgIHJldHVybiBzdHJpbmcudG9IVE1MKCk7XG4gICAgfSBlbHNlIGlmIChzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZyArICcnO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAgIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nO1xuICB9XG5cbiAgaWYgKCFwb3NzaWJsZS50ZXN0KHN0cmluZykpIHsgcmV0dXJuIHN0cmluZzsgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGcmFtZShvYmplY3QpIHtcbiAgbGV0IGZyYW1lID0gZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9ja1BhcmFtcyhwYXJhbXMsIGlkcykge1xuICBwYXJhbXMucGF0aCA9IGlkcztcbiAgcmV0dXJuIHBhcmFtcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn1cbiIsIi8vIENyZWF0ZSBhIHNpbXBsZSBwYXRoIGFsaWFzIHRvIGFsbG93IGJyb3dzZXJpZnkgdG8gcmVzb2x2ZVxuLy8gdGhlIHJ1bnRpbWUgb24gYSBzdXBwb3J0ZWQgcGF0aC5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUnKVsnZGVmYXVsdCddO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFycy9ydW50aW1lXCIpW1wiZGVmYXVsdFwiXTtcbiIsIi8qIGdsb2JhbCBhcGV4ICovXHJcbnZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpXHJcblxyXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdyYXcnLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gIHJldHVybiBvcHRpb25zLmZuKHRoaXMpXHJcbn0pXHJcblxyXG4vLyBSZXF1aXJlIGR5bmFtaWMgdGVtcGxhdGVzXHJcbnZhciBtb2RhbFJlcG9ydFRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbW9kYWwtcmVwb3J0LmhicycpXHJcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdyZXBvcnQnLCByZXF1aXJlKCcuL3RlbXBsYXRlcy9wYXJ0aWFscy9fcmVwb3J0LmhicycpKVxyXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgncm93cycsIHJlcXVpcmUoJy4vdGVtcGxhdGVzL3BhcnRpYWxzL19yb3dzLmhicycpKVxyXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgncGFnaW5hdGlvbicsIHJlcXVpcmUoJy4vdGVtcGxhdGVzL3BhcnRpYWxzL19wYWdpbmF0aW9uLmhicycpKVxyXG5cclxuOyhmdW5jdGlvbiAoJCwgd2luZG93KSB7XHJcbiAgJC53aWRnZXQoJ21oby5tb2RhbExvdicsIHtcclxuICAgIC8vIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBpZDogJycsXHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgaXRlbU5hbWU6ICcnLFxyXG4gICAgICBzZWFyY2hGaWVsZDogJycsXHJcbiAgICAgIHNlYXJjaEJ1dHRvbjogJycsXHJcbiAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnJyxcclxuICAgICAgYWpheElkZW50aWZpZXI6ICcnLFxyXG4gICAgICBzaG93SGVhZGVyczogZmFsc2UsXHJcbiAgICAgIHJldHVybkNvbDogJycsXHJcbiAgICAgIGRpc3BsYXlDb2w6ICcnLFxyXG4gICAgICB2YWxpZGF0aW9uRXJyb3I6ICcnLFxyXG4gICAgICBjYXNjYWRpbmdJdGVtczogJycsXHJcbiAgICAgIG1vZGFsV2lkdGg6IDYwMCxcclxuICAgICAgbm9EYXRhRm91bmQ6ICcnLFxyXG4gICAgICBhbGxvd011bHRpbGluZVJvd3M6IGZhbHNlLFxyXG4gICAgICByb3dDb3VudDogMTUsXHJcbiAgICAgIHBhZ2VJdGVtc1RvU3VibWl0OiAnJyxcclxuICAgICAgbWFya0NsYXNzZXM6ICd1LWhvdCcsXHJcbiAgICAgIGhvdmVyQ2xhc3NlczogJ2hvdmVyIHUtY29sb3ItMScsXHJcbiAgICAgIHByZXZpb3VzTGFiZWw6ICdwcmV2aW91cycsXHJcbiAgICAgIG5leHRMYWJlbDogJ25leHQnXHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXR1cm5WYWx1ZTogJycsXHJcblxyXG4gICAgX2l0ZW0kOiBudWxsLFxyXG4gICAgX3NlYXJjaEJ1dHRvbiQ6IG51bGwsXHJcbiAgICBfY2xlYXJJbnB1dCQ6IG51bGwsXHJcblxyXG4gICAgX3NlYXJjaEZpZWxkJDogbnVsbCxcclxuXHJcbiAgICBfdGVtcGxhdGVEYXRhOiB7fSxcclxuICAgIF9sYXN0U2VhcmNoVGVybTogJycsXHJcblxyXG4gICAgX21vZGFsRGlhbG9nJDogbnVsbCxcclxuXHJcbiAgICBfYWN0aXZlRGVsYXk6IGZhbHNlLFxyXG4gICAgX2Rpc2FibGVDaGFuZ2VFdmVudDogZmFsc2UsXHJcblxyXG4gICAgX2lnJDogbnVsbCxcclxuICAgIF9ncmlkOiBudWxsLFxyXG5cclxuICAgIF90b3BBcGV4OiBudWxsLFxyXG5cclxuICAgIF9yZXNldEZvY3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICBpZiAodGhpcy5fZ3JpZCkge1xyXG4gICAgICAgIHZhciByZWNvcmRJZCA9IHRoaXMuX2dyaWQubW9kZWwuZ2V0UmVjb3JkSWQodGhpcy5fZ3JpZC52aWV3JC5ncmlkKCdnZXRTZWxlY3RlZFJlY29yZHMnKVswXSlcclxuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy5faWckLmludGVyYWN0aXZlR3JpZCgnb3B0aW9uJykuY29uZmlnLmNvbHVtbnMuZmlsdGVyKGZ1bmN0aW9uIChjb2x1bW4pIHtcclxuICAgICAgICAgIHJldHVybiBjb2x1bW4uc3RhdGljSWQgPT09IHNlbGYub3B0aW9ucy5pdGVtTmFtZVxyXG4gICAgICAgIH0pWzBdXHJcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRFZGl0TW9kZShmYWxzZSlcclxuICAgICAgICB0aGlzLl9ncmlkLnZpZXckLmdyaWQoJ2dvdG9DZWxsJywgcmVjb3JkSWQsIGNvbHVtbi5uYW1lKVxyXG4gICAgICAgIHRoaXMuX2dyaWQuZm9jdXMoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2l0ZW0kLmZvY3VzKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDb21iaW5hdGlvbiBvZiBudW1iZXIsIGNoYXIgYW5kIHNwYWNlLCBhcnJvdyBrZXlzXHJcbiAgICBfdmFsaWRTZWFyY2hLZXlzOiBbNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIC8vIG51bWJlcnNcclxuICAgICAgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCA3OSwgODAsIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLCAvLyBjaGFyc1xyXG4gICAgICA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwLCAxMDEsIDEwMiwgMTAzLCAxMDQsIDEwNSwgLy8gbnVtcGFkIG51bWJlcnNcclxuICAgICAgNDAsIC8vIGFycm93IGRvd25cclxuICAgICAgMzIsIC8vIHNwYWNlYmFyXHJcbiAgICAgIDgsIC8vIGJhY2tzcGFjZVxyXG4gICAgICAxMDYsIDEwNywgMTA5LCAxMTAsIDExMSwgMTg2LCAxODcsIDE4OCwgMTg5LCAxOTAsIDE5MSwgMTkyLCAyMTksIDIyMCwgMjIxLCAyMjAgLy8gaW50ZXJwdW5jdGlvblxyXG4gICAgXSxcclxuXHJcbiAgICBfY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgc2VsZi5faXRlbSQgPSAkKCcjJyArIHNlbGYub3B0aW9ucy5pdGVtTmFtZSlcclxuICAgICAgc2VsZi5fcmV0dXJuVmFsdWUgPSBzZWxmLl9pdGVtJC5kYXRhKCdyZXR1cm5WYWx1ZScpLnRvU3RyaW5nKClcclxuICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJCA9ICQoJyMnICsgc2VsZi5vcHRpb25zLnNlYXJjaEJ1dHRvbilcclxuICAgICAgc2VsZi5fY2xlYXJJbnB1dCQgPSBzZWxmLl9pdGVtJC5wYXJlbnQoKS5maW5kKCcuc2VhcmNoLWNsZWFyJylcclxuICAgICAgc2VsZi5fdG9wQXBleCA9IGFwZXgudXRpbC5nZXRUb3BBcGV4KClcclxuXHJcbiAgICAgIHNlbGYuX2FkZENTU1RvVG9wTGV2ZWwoKVxyXG5cclxuICAgICAgLy8gVHJpZ2dlciBldmVudCBvbiBjbGljayBpbnB1dCBkaXNwbGF5IGZpZWxkXHJcbiAgICAgIHNlbGYuX3RyaWdnZXJMT1ZPbkRpc3BsYXkoKVxyXG5cclxuICAgICAgLy8gVHJpZ2dlciBldmVudCBvbiBjbGljayBpbnB1dCBncm91cCBhZGRvbiBidXR0b24gKG1hZ25pZmllciBnbGFzcylcclxuICAgICAgc2VsZi5fdHJpZ2dlckxPVk9uQnV0dG9uKClcclxuXHJcbiAgICAgIC8vIENsZWFyIHRleHQgd2hlbiBjbGVhciBpY29uIGlzIGNsaWNrZWRcclxuICAgICAgc2VsZi5faW5pdENsZWFySW5wdXQoKVxyXG5cclxuICAgICAgLy8gQ2FzY2FkaW5nIExPViBpdGVtIGFjdGlvbnNcclxuICAgICAgc2VsZi5faW5pdENhc2NhZGluZ0xPVnMoKVxyXG5cclxuICAgICAgLy8gSW5pdCBBUEVYIHBhZ2VpdGVtIGZ1bmN0aW9uc1xyXG4gICAgICBzZWxmLl9pbml0QXBleEl0ZW0oKVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25PcGVuRGlhbG9nOiBmdW5jdGlvbiAobW9kYWwsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHNlbGYgPSBvcHRpb25zLndpZGdldFxyXG4gICAgICBzZWxmLl9tb2RhbERpYWxvZyQgPSBzZWxmLl90b3BBcGV4LmpRdWVyeShtb2RhbClcclxuICAgICAgLy8gRm9jdXMgb24gc2VhcmNoIGZpZWxkIGluIExPVlxyXG4gICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSgnIycgKyBzZWxmLm9wdGlvbnMuc2VhcmNoRmllbGQpLmZvY3VzKClcclxuICAgICAgLy8gUmVtb3ZlIHZhbGlkYXRpb24gcmVzdWx0c1xyXG4gICAgICBzZWxmLl9yZW1vdmVWYWxpZGF0aW9uKClcclxuICAgICAgLy8gQWRkIHRleHQgZnJvbSBkaXNwbGF5IGZpZWxkXHJcbiAgICAgIGlmIChvcHRpb25zLmZpbGxTZWFyY2hUZXh0KSB7XHJcbiAgICAgICAgc2VsZi5fdG9wQXBleC5hcGV4Lml0ZW0oc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkKS5zZXRWYWx1ZShzZWxmLl9pdGVtJC52YWwoKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgY2xhc3Mgb24gaG92ZXJcclxuICAgICAgc2VsZi5fb25Sb3dIb3ZlcigpXHJcbiAgICAgIC8vIHNlbGVjdEluaXRpYWxSb3dcclxuICAgICAgc2VsZi5fc2VsZWN0SW5pdGlhbFJvdygpXHJcbiAgICAgIC8vIFNldCBhY3Rpb24gd2hlbiBhIHJvdyBpcyBzZWxlY3RlZFxyXG4gICAgICBzZWxmLl9vblJvd1NlbGVjdGVkKClcclxuICAgICAgLy8gTmF2aWdhdGUgb24gYXJyb3cga2V5cyB0cm91Z2ggTE9WXHJcbiAgICAgIHNlbGYuX2luaXRLZXlib2FyZE5hdmlnYXRpb24oKVxyXG4gICAgICAvLyBTZXQgc2VhcmNoIGFjdGlvblxyXG4gICAgICBzZWxmLl9pbml0U2VhcmNoKClcclxuICAgICAgLy8gU2V0IHBhZ2luYXRpb24gYWN0aW9uc1xyXG4gICAgICBzZWxmLl9pbml0UGFnaW5hdGlvbigpXHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkNsb3NlRGlhbG9nOiBmdW5jdGlvbiAobW9kYWwsIG9wdGlvbnMpIHtcclxuICAgICAgLy8gY2xvc2UgdGFrZXMgcGxhY2Ugd2hlbiBubyByZWNvcmQgaGFzIGJlZW4gc2VsZWN0ZWQsIGluc3RlYWQgdGhlIGNsb3NlIG1vZGFsIChvciBlc2MpIHdhcyBjbGlja2VkLyBwcmVzc2VkXHJcbiAgICAgIC8vIEl0IGNvdWxkIG1lYW4gdHdvIHRoaW5nczoga2VlcCBjdXJyZW50IG9yIHRha2UgdGhlIHVzZXIncyBkaXNwbGF5IHZhbHVlXHJcbiAgICAgIC8vIFdoYXQgYWJvdXQgdHdvIGVxdWFsIGRpc3BsYXkgdmFsdWVzP1xyXG5cclxuICAgICAgLy8gQnV0IG5vIHJlY29yZCBzZWxlY3Rpb24gY291bGQgbWVhbiBjYW5jZWxcclxuICAgICAgLy8gYnV0IG9wZW4gbW9kYWwgYW5kIGZvcmdldCBhYm91dCBpdFxyXG4gICAgICAvLyBpbiB0aGUgZW5kLCB0aGlzIHNob3VsZCBrZWVwIHRoaW5ncyBpbnRhY3QgYXMgdGhleSB3ZXJlXHJcbiAgICAgIG9wdGlvbnMud2lkZ2V0Ll9kZXN0cm95KG1vZGFsKVxyXG4gICAgICBvcHRpb25zLndpZGdldC5fdHJpZ2dlckxPVk9uRGlzcGxheSgpXHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0R3JpZENvbmZpZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLl9pZyQgPSB0aGlzLl9pdGVtJC5jbG9zZXN0KCcuYS1JRycpXHJcblxyXG4gICAgICBpZiAodGhpcy5faWckLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLl9ncmlkID0gdGhpcy5faWckLmludGVyYWN0aXZlR3JpZCgnZ2V0Vmlld3MnKS5ncmlkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHNlbGYgPSBvcHRpb25zLndpZGdldFxyXG5cclxuICAgICAgc2VsZi5faW5pdEdyaWRDb25maWcoKVxyXG5cclxuICAgICAgLy8gQ3JlYXRlIExPViByZWdpb25cclxuICAgICAgdmFyICRtb2RhbFJlZ2lvbiA9IHNlbGYuX3RvcEFwZXgualF1ZXJ5KG1vZGFsUmVwb3J0VGVtcGxhdGUoc2VsZi5fdGVtcGxhdGVEYXRhKSkuYXBwZW5kVG8oJ2JvZHknKVxyXG4gICAgICBcclxuICAgICAgLy8gT3BlbiBuZXcgbW9kYWxcclxuICAgICAgJG1vZGFsUmVnaW9uLmRpYWxvZyh7XHJcbiAgICAgICAgaGVpZ2h0OiAkbW9kYWxSZWdpb24uZmluZCgnLnQtUmVwb3J0LXdyYXAnKS5oZWlnaHQoKSArIDE1MCwgLy8gKyBkaWFsb2cgYnV0dG9uIGhlaWdodFxyXG4gICAgICAgIHdpZHRoOiBzZWxmLm9wdGlvbnMubW9kYWxXaWR0aCxcclxuICAgICAgICBjbG9zZVRleHQ6IGFwZXgubGFuZy5nZXRNZXNzYWdlKCdBUEVYLkRJQUxPRy5DTE9TRScpLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICByZXNpemFibGU6IHRydWUsXHJcbiAgICAgICAgY2xvc2VPbkVzY2FwZTogdHJ1ZSxcclxuICAgICAgICBkaWFsb2dDbGFzczogJ3VpLWRpYWxvZy0tYXBleCAnLFxyXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uIChtb2RhbCkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIG9wZW5lciBiZWNhdXNlIGl0IG1ha2VzIHRoZSBwYWdlIHNjcm9sbCBkb3duIGZvciBJR1xyXG4gICAgICAgICAgc2VsZi5fdG9wQXBleC5qUXVlcnkodGhpcykuZGF0YSgndWlEaWFsb2cnKS5vcGVuZXIgPSBzZWxmLl90b3BBcGV4LmpRdWVyeSgpXHJcbiAgICAgICAgICBzZWxmLl90b3BBcGV4Lm5hdmlnYXRpb24uYmVnaW5GcmVlemVTY3JvbGwoKVxyXG4gICAgICAgICAgc2VsZi5fb25PcGVuRGlhbG9nKHRoaXMsIG9wdGlvbnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5fb25DbG9zZURpYWxvZyh0aGlzLCBvcHRpb25zKVxyXG4gICAgICAgICAgLy8gUHJldmVudCBzY3JvbGxpbmcgZG93biBvbiBtb2RhbCBjbG9zZVxyXG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl90b3BBcGV4Lm5hdmlnYXRpb24uZW5kRnJlZXplU2Nyb2xsKClcclxuICAgICAgICAgIC8vIFN0b3AgZWRpdCBtb2RlIG9mIHBvc3NpYmxlIElHXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25SZWxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgYWZ0ZXIgYSBzZWFyY2hcclxuICAgICAgdmFyIHJlcG9ydEh0bWwgPSBIYW5kbGViYXJzLnBhcnRpYWxzLnJlcG9ydChzZWxmLl90ZW1wbGF0ZURhdGEpXHJcbiAgICAgIHZhciBwYWdpbmF0aW9uSHRtbCA9IEhhbmRsZWJhcnMucGFydGlhbHMucGFnaW5hdGlvbihzZWxmLl90ZW1wbGF0ZURhdGEpXHJcblxyXG4gICAgICAvLyBHZXQgY3VycmVudCBtb2RhbC1sb3YgdGFibGVcclxuICAgICAgdmFyIG1vZGFsTE9WVGFibGUgPSBzZWxmLl9tb2RhbERpYWxvZyQuZmluZCgnLm1vZGFsLWxvdi10YWJsZScpXHJcbiAgICAgIHZhciBwYWdpbmF0aW9uID0gc2VsZi5fbW9kYWxEaWFsb2ckLmZpbmQoJy50LUJ1dHRvblJlZ2lvbi13cmFwJylcclxuXHJcbiAgICAgIC8vIFJlcGxhY2UgcmVwb3J0IHdpdGggbmV3IGRhdGFcclxuICAgICAgJChtb2RhbExPVlRhYmxlKS5yZXBsYWNlV2l0aChyZXBvcnRIdG1sKVxyXG4gICAgICAkKHBhZ2luYXRpb24pLmh0bWwocGFnaW5hdGlvbkh0bWwpXHJcblxyXG4gICAgICAvLyBzZWxlY3RJbml0aWFsUm93IGluIG5ldyBtb2RhbC1sb3YgdGFibGVcclxuICAgICAgc2VsZi5fc2VsZWN0SW5pdGlhbFJvdygpXHJcblxyXG4gICAgICAvLyBNYWtlIHRoZSBlbnRlciBrZXkgZG8gc29tZXRoaW5nIGFnYWluXHJcbiAgICAgIHNlbGYuX2FjdGl2ZURlbGF5ID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgX3VuZXNjYXBlOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiB2YWwgLy8gJCgnPGlucHV0IHZhbHVlPVwiJyArIHZhbCArICdcIi8+JykudmFsKClcclxuICAgIH0sXHJcblxyXG4gICAgX2dldFRlbXBsYXRlRGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgIC8vIENyZWF0ZSByZXR1cm4gT2JqZWN0XHJcbiAgICAgIHZhciB0ZW1wbGF0ZURhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHNlbGYub3B0aW9ucy5pZCxcclxuICAgICAgICBjbGFzc2VzOiAnbW9kYWwtbG92JyxcclxuICAgICAgICB0aXRsZTogc2VsZi5vcHRpb25zLnRpdGxlLFxyXG4gICAgICAgIG1vZGFsU2l6ZTogc2VsZi5vcHRpb25zLm1vZGFsU2l6ZSxcclxuICAgICAgICByZWdpb246IHtcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6ICdzdHlsZT1cImJvdHRvbTogNjZweDtcIidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEZpZWxkOiB7XHJcbiAgICAgICAgICBpZDogc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkLFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHNlbGYub3B0aW9ucy5zZWFyY2hQbGFjZWhvbGRlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwb3J0OiB7XHJcbiAgICAgICAgICBjb2x1bW5zOiB7fSxcclxuICAgICAgICAgIHJvd3M6IHt9LFxyXG4gICAgICAgICAgY29sQ291bnQ6IDAsXHJcbiAgICAgICAgICByb3dDb3VudDogMCxcclxuICAgICAgICAgIHNob3dIZWFkZXJzOiBzZWxmLm9wdGlvbnMuc2hvd0hlYWRlcnMsXHJcbiAgICAgICAgICBub0RhdGFGb3VuZDogc2VsZi5vcHRpb25zLm5vRGF0YUZvdW5kLFxyXG4gICAgICAgICAgY2xhc3NlczogKHNlbGYub3B0aW9ucy5hbGxvd011bHRpbGluZVJvd3MpID8gJ211bHRpbGluZScgOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgcm93Q291bnQ6IDAsXHJcbiAgICAgICAgICBmaXJzdFJvdzogMCxcclxuICAgICAgICAgIGxhc3RSb3c6IDAsXHJcbiAgICAgICAgICBhbGxvd1ByZXY6IGZhbHNlLFxyXG4gICAgICAgICAgYWxsb3dOZXh0OiBmYWxzZSxcclxuICAgICAgICAgIHByZXZpb3VzOiBzZWxmLm9wdGlvbnMucHJldmlvdXNMYWJlbCxcclxuICAgICAgICAgIG5leHQ6IHNlbGYub3B0aW9ucy5uZXh0TGFiZWxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIHJvd3MgZm91bmQ/XHJcbiAgICAgIGlmIChzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3cubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlRGF0YVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZXQgY29sdW1uc1xyXG4gICAgICB2YXIgY29sdW1ucyA9IE9iamVjdC5rZXlzKHNlbGYub3B0aW9ucy5kYXRhU291cmNlLnJvd1swXSlcclxuXHJcbiAgICAgIC8vIFBhZ2luYXRpb25cclxuICAgICAgdGVtcGxhdGVEYXRhLnBhZ2luYXRpb24uZmlyc3RSb3cgPSBzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3dbMF1bJ1JPV05VTSMjIyddXHJcbiAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmxhc3RSb3cgPSBzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3dbc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93Lmxlbmd0aCAtIDFdWydST1dOVU0jIyMnXVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBuZXh0IHJlc3VsdHNldFxyXG4gICAgICB2YXIgbmV4dFJvdyA9IHNlbGYub3B0aW9ucy5kYXRhU291cmNlLnJvd1tzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3cubGVuZ3RoIC0gMV1bJ05FWFRST1cjIyMnXVxyXG5cclxuICAgICAgLy8gQWxsb3cgcHJldmlvdXMgYnV0dG9uP1xyXG4gICAgICBpZiAodGVtcGxhdGVEYXRhLnBhZ2luYXRpb24uZmlyc3RSb3cgPiAxKSB7XHJcbiAgICAgICAgdGVtcGxhdGVEYXRhLnBhZ2luYXRpb24uYWxsb3dQcmV2ID0gdHJ1ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBbGxvdyBuZXh0IGJ1dHRvbj9cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAobmV4dFJvdy50b1N0cmluZygpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmFsbG93TmV4dCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmFsbG93TmV4dCA9IGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBpbnRlcm5hbCBjb2x1bW5zIChST1dOVU0jIyMsIC4uLilcclxuICAgICAgY29sdW1ucy5zcGxpY2UoY29sdW1ucy5pbmRleE9mKCdST1dOVU0jIyMnKSwgMSlcclxuICAgICAgY29sdW1ucy5zcGxpY2UoY29sdW1ucy5pbmRleE9mKCdORVhUUk9XIyMjJyksIDEpXHJcblxyXG4gICAgICAvLyBSZW1vdmUgY29sdW1uIHJldHVybi1pdGVtXHJcbiAgICAgIGNvbHVtbnMuc3BsaWNlKGNvbHVtbnMuaW5kZXhPZihzZWxmLm9wdGlvbnMucmV0dXJuQ29sKSwgMSlcclxuICAgICAgLy8gUmVtb3ZlIGNvbHVtbiByZXR1cm4tZGlzcGxheSBpZiBkaXNwbGF5IGNvbHVtbnMgYXJlIHByb3ZpZGVkXHJcbiAgICAgIGlmIChjb2x1bW5zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb2x1bW5zLnNwbGljZShjb2x1bW5zLmluZGV4T2Yoc2VsZi5vcHRpb25zLmRpc3BsYXlDb2wpLCAxKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0ZW1wbGF0ZURhdGEucmVwb3J0LmNvbENvdW50ID0gY29sdW1ucy5sZW5ndGhcclxuXHJcbiAgICAgIC8vIFJlbmFtZSBjb2x1bW5zIHRvIHN0YW5kYXJkIG5hbWVzIGxpa2UgY29sdW1uMCwgY29sdW1uMSwgLi5cclxuICAgICAgdmFyIGNvbHVtbiA9IHt9XHJcbiAgICAgICQuZWFjaChjb2x1bW5zLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcclxuICAgICAgICBpZiAoY29sdW1ucy5sZW5ndGggPT09IDEgJiYgc2VsZi5vcHRpb25zLml0ZW1MYWJlbCkge1xyXG4gICAgICAgICAgY29sdW1uWydjb2x1bW4nICsga2V5XSA9IHtcclxuICAgICAgICAgICAgbmFtZTogdmFsLFxyXG4gICAgICAgICAgICBsYWJlbDogc2VsZi5vcHRpb25zLml0ZW1MYWJlbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2x1bW5bJ2NvbHVtbicgKyBrZXldID0ge1xyXG4gICAgICAgICAgICBuYW1lOiB2YWxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcGxhdGVEYXRhLnJlcG9ydC5jb2x1bW5zID0gJC5leHRlbmQodGVtcGxhdGVEYXRhLnJlcG9ydC5jb2x1bW5zLCBjb2x1bW4pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvKiBHZXQgcm93c1xyXG5cclxuICAgICAgICBmb3JtYXQgd2lsbCBiZSBsaWtlIHRoaXM6XHJcblxyXG4gICAgICAgIHJvd3MgPSBbe2NvbHVtbjA6IFwiYVwiLCBjb2x1bW4xOiBcImJcIn0sIHtjb2x1bW4wOiBcImNcIiwgY29sdW1uMTogXCJkXCJ9XVxyXG5cclxuICAgICAgKi9cclxuICAgICAgdmFyIHRtcFJvd1xyXG5cclxuICAgICAgdmFyIHJvd3MgPSAkLm1hcChzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3csIGZ1bmN0aW9uIChyb3csIHJvd0tleSkge1xyXG4gICAgICAgIHRtcFJvdyA9IHtcclxuICAgICAgICAgIGNvbHVtbnM6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFkZCBjb2x1bW4gdmFsdWVzIHRvIHJvd1xyXG4gICAgICAgICQuZWFjaCh0ZW1wbGF0ZURhdGEucmVwb3J0LmNvbHVtbnMsIGZ1bmN0aW9uIChjb2xJZCwgY29sKSB7XHJcbiAgICAgICAgICB0bXBSb3cuY29sdW1uc1tjb2xJZF0gPSBzZWxmLl91bmVzY2FwZShyb3dbY29sLm5hbWVdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gYWRkIG1ldGFkYXRhIHRvIHJvd1xyXG4gICAgICAgIHRtcFJvdy5yZXR1cm5WYWwgPSByb3dbc2VsZi5vcHRpb25zLnJldHVybkNvbF1cclxuICAgICAgICB0bXBSb3cuZGlzcGxheVZhbCA9IHJvd1tzZWxmLm9wdGlvbnMuZGlzcGxheUNvbF1cclxuICAgICAgICByZXR1cm4gdG1wUm93XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0ZW1wbGF0ZURhdGEucmVwb3J0LnJvd3MgPSByb3dzXHJcblxyXG4gICAgICB0ZW1wbGF0ZURhdGEucmVwb3J0LnJvd0NvdW50ID0gKHJvd3MubGVuZ3RoID09PSAwID8gZmFsc2UgOiByb3dzLmxlbmd0aClcclxuICAgICAgdGVtcGxhdGVEYXRhLnBhZ2luYXRpb24ucm93Q291bnQgPSB0ZW1wbGF0ZURhdGEucmVwb3J0LnJvd0NvdW50XHJcblxyXG4gICAgICByZXR1cm4gdGVtcGxhdGVEYXRhXHJcbiAgICB9LFxyXG5cclxuICAgIF9kZXN0cm95OiBmdW5jdGlvbiAobW9kYWwpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICQod2luZG93LnRvcC5kb2N1bWVudCkub2ZmKCdrZXlkb3duJylcclxuICAgICAgJCh3aW5kb3cudG9wLmRvY3VtZW50KS5vZmYoJ2tleXVwJywgJyMnICsgc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkKVxyXG4gICAgICBzZWxmLl9pdGVtJC5vZmYoJ2tleXVwJylcclxuICAgICAgc2VsZi5fbW9kYWxEaWFsb2ckLnJlbW92ZSgpXHJcbiAgICAgIHNlbGYuX3RvcEFwZXgubmF2aWdhdGlvbi5lbmRGcmVlemVTY3JvbGwoKVxyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0RGF0YTogZnVuY3Rpb24gKG9wdGlvbnMsIGhhbmRsZXIpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICB2YXIgc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgc2VhcmNoVGVybTogJycsXHJcbiAgICAgICAgZmlyc3RSb3c6IDEsXHJcbiAgICAgICAgZmlsbFNlYXJjaFRleHQ6IHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucylcclxuICAgICAgdmFyIHNlYXJjaFRlcm0gPSAoc2V0dGluZ3Muc2VhcmNoVGVybS5sZW5ndGggPiAwKSA/IHNldHRpbmdzLnNlYXJjaFRlcm0gOiBzZWxmLl90b3BBcGV4Lml0ZW0oc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkKS5nZXRWYWx1ZSgpXHJcbiAgICAgIHZhciBpdGVtcyA9IHNlbGYub3B0aW9ucy5wYWdlSXRlbXNUb1N1Ym1pdFxyXG5cclxuICAgICAgLy8gU3RvcmUgbGFzdCBzZWFyY2hUZXJtXHJcbiAgICAgIHNlbGYuX2xhc3RTZWFyY2hUZXJtID0gc2VhcmNoVGVybVxyXG5cclxuICAgICAgYXBleC5zZXJ2ZXIucGx1Z2luKHNlbGYub3B0aW9ucy5hamF4SWRlbnRpZmllciwge1xyXG4gICAgICAgIHgwMTogJ0dFVF9EQVRBJyxcclxuICAgICAgICB4MDI6IHNlYXJjaFRlcm0sIC8vIHNlYXJjaHRlcm1cclxuICAgICAgICB4MDM6IHNldHRpbmdzLmZpcnN0Um93LCAvLyBmaXJzdCByb3dudW0gdG8gcmV0dXJuXHJcbiAgICAgICAgcGFnZUl0ZW1zOiBpdGVtc1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGFyZ2V0OiBzZWxmLl9pdGVtJCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6ICQucHJveHkob3B0aW9ucy5sb2FkaW5nSW5kaWNhdG9yLCBzZWxmKSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocERhdGEpIHtcclxuICAgICAgICAgIHNlbGYub3B0aW9ucy5kYXRhU291cmNlID0gcERhdGFcclxuICAgICAgICAgIHNlbGYuX3RlbXBsYXRlRGF0YSA9IHNlbGYuX2dldFRlbXBsYXRlRGF0YSgpXHJcbiAgICAgICAgICBoYW5kbGVyKHtcclxuICAgICAgICAgICAgd2lkZ2V0OiBzZWxmLFxyXG4gICAgICAgICAgICBmaWxsU2VhcmNoVGV4dDogc2V0dGluZ3MuZmlsbFNlYXJjaFRleHRcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdFNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgLy8gaWYgdGhlIGxhc3RTZWFyY2hUZXJtIGlzIG5vdCBlcXVhbCB0byB0aGUgY3VycmVudCBzZWFyY2hUZXJtLCB0aGVuIHNlYXJjaCBpbW1lZGlhdGVcclxuICAgICAgaWYgKHNlbGYuX2xhc3RTZWFyY2hUZXJtICE9PSBzZWxmLl90b3BBcGV4Lml0ZW0oc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkKS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgICAgc2VsZi5fZ2V0RGF0YSh7XHJcbiAgICAgICAgICBmaXJzdFJvdzogMSxcclxuICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6IHNlbGYuX21vZGFsTG9hZGluZ0luZGljYXRvclxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX29uUmVsb2FkKClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBY3Rpb24gd2hlbiB1c2VyIGlucHV0cyBzZWFyY2ggdGV4dFxyXG4gICAgICAkKHdpbmRvdy50b3AuZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcjJyArIHNlbGYub3B0aW9ucy5zZWFyY2hGaWVsZCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBmb3IgbmF2aWdhdGlvbiBrZXlzLCBlc2NhcGUgYW5kIGVudGVyXHJcbiAgICAgICAgdmFyIG5hdmlnYXRpb25LZXlzID0gWzM3LCAzOCwgMzksIDQwLCA5LCAzMywgMzQsIDI3LCAxM11cclxuICAgICAgICBpZiAoJC5pbkFycmF5KGV2ZW50LmtleUNvZGUsIG5hdmlnYXRpb25LZXlzKSA+IC0xKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN0b3AgdGhlIGVudGVyIGtleSBmcm9tIHNlbGVjdGluZyBhIHJvd1xyXG4gICAgICAgIHNlbGYuX2FjdGl2ZURlbGF5ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvLyBEb24ndCBzZWFyY2ggb24gYWxsIGtleSBldmVudHMgYnV0IGFkZCBhIGRlbGF5IGZvciBwZXJmb3JtYW5jZVxyXG4gICAgICAgIHZhciBzcmNFbCA9IGV2ZW50LmN1cnJlbnRUYXJnZXRcclxuICAgICAgICBpZiAoc3JjRWwuZGVsYXlUaW1lcikge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHNyY0VsLmRlbGF5VGltZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzcmNFbC5kZWxheVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9nZXREYXRhKHtcclxuICAgICAgICAgICAgZmlyc3RSb3c6IDEsXHJcbiAgICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6IHNlbGYuX21vZGFsTG9hZGluZ0luZGljYXRvclxyXG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLl9vblJlbG9hZCgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDM1MClcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRQYWdpbmF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgcHJldlNlbGVjdG9yID0gJyMnICsgc2VsZi5vcHRpb25zLmlkICsgJyAudC1SZXBvcnQtcGFnaW5hdGlvbkxpbmstLXByZXYnXHJcbiAgICAgIHZhciBuZXh0U2VsZWN0b3IgPSAnIycgKyBzZWxmLm9wdGlvbnMuaWQgKyAnIC50LVJlcG9ydC1wYWdpbmF0aW9uTGluay0tbmV4dCdcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGxpc3RlbmVyc1xyXG4gICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSh3aW5kb3cudG9wLmRvY3VtZW50KS5vZmYoJ2NsaWNrJywgcHJldlNlbGVjdG9yKVxyXG4gICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSh3aW5kb3cudG9wLmRvY3VtZW50KS5vZmYoJ2NsaWNrJywgbmV4dFNlbGVjdG9yKVxyXG5cclxuICAgICAgLy8gUHJldmlvdXMgc2V0XHJcbiAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KHdpbmRvdy50b3AuZG9jdW1lbnQpLm9uKCdjbGljaycsIHByZXZTZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBzZWxmLl9nZXREYXRhKHtcclxuICAgICAgICAgIGZpcnN0Um93OiBzZWxmLl9nZXRGaXJzdFJvd251bVByZXZTZXQoKSxcclxuICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6IHNlbGYuX21vZGFsTG9hZGluZ0luZGljYXRvclxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX29uUmVsb2FkKClcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gTmV4dCBzZXRcclxuICAgICAgc2VsZi5fdG9wQXBleC5qUXVlcnkod2luZG93LnRvcC5kb2N1bWVudCkub24oJ2NsaWNrJywgbmV4dFNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHNlbGYuX2dldERhdGEoe1xyXG4gICAgICAgICAgZmlyc3RSb3c6IHNlbGYuX2dldEZpcnN0Um93bnVtTmV4dFNldCgpLFxyXG4gICAgICAgICAgbG9hZGluZ0luZGljYXRvcjogc2VsZi5fbW9kYWxMb2FkaW5nSW5kaWNhdG9yXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5fb25SZWxvYWQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRGaXJzdFJvd251bVByZXZTZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuX3RlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmZpcnN0Um93IC0gc2VsZi5vcHRpb25zLnJvd0NvdW50XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2dldEZpcnN0Um93bnVtTmV4dFNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gc2VsZi5fdGVtcGxhdGVEYXRhLnBhZ2luYXRpb24ubGFzdFJvdyArIDFcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIDE2XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29wZW5MT1Y6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgbW9kYWwtbG92IHJlZ2lvblxyXG4gICAgICAkKCcjJyArIHNlbGYub3B0aW9ucy5pZCwgZG9jdW1lbnQpLnJlbW92ZSgpXHJcblxyXG4gICAgICBzZWxmLl9nZXREYXRhKHtcclxuICAgICAgICBmaXJzdFJvdzogMSxcclxuICAgICAgICBzZWFyY2hUZXJtOiBvcHRpb25zLnNlYXJjaFRlcm0sXHJcbiAgICAgICAgZmlsbFNlYXJjaFRleHQ6IG9wdGlvbnMuZmlsbFNlYXJjaFRleHQsXHJcbiAgICAgICAgbG9hZGluZ0luZGljYXRvcjogc2VsZi5faXRlbUxvYWRpbmdJbmRpY2F0b3JcclxuICAgICAgfSwgb3B0aW9ucy5hZnRlckRhdGEpXHJcbiAgICB9LFxyXG5cclxuICAgIF9hZGRDU1NUb1RvcExldmVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBDU1MgZmlsZSBpcyBhbHdheXMgcHJlc2VudCB3aGVuIHRoZSBjdXJyZW50IHdpbmRvdyBpcyB0aGUgdG9wIHdpbmRvdywgc28gZG8gbm90aGluZ1xyXG4gICAgICBpZiAod2luZG93ID09PSB3aW5kb3cudG9wKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGNzc1NlbGVjdG9yID0gJ2xpbmtbcmVsPVwic3R5bGVzaGVldFwiXVtocmVmKj1cIm1vZGFsLWxvdlwiXSdcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGZpbGUgZXhpc3RzIGluIHRvcCB3aW5kb3dcclxuICAgICAgaWYgKHNlbGYuX3RvcEFwZXgualF1ZXJ5KGNzc1NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSgnaGVhZCcpLmFwcGVuZCgkKGNzc1NlbGVjdG9yKS5jbG9uZSgpKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF90cmlnZ2VyTE9WT25EaXNwbGF5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBUcmlnZ2VyIGV2ZW50IG9uIGNsaWNrIGlucHV0IGRpc3BsYXkgZmllbGRcclxuICAgICAgc2VsZi5faXRlbSQub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJC5pbkFycmF5KGUua2V5Q29kZSwgc2VsZi5fdmFsaWRTZWFyY2hLZXlzKSA+IC0xICYmICghZS5jdHJsS2V5IHx8IGUua2V5Q29kZSA9PT0gODYpKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLm9mZigna2V5dXAnKVxyXG4gICAgICAgICAgc2VsZi5fb3BlbkxPVih7XHJcbiAgICAgICAgICAgIHNlYXJjaFRlcm06IHNlbGYuX2l0ZW0kLnZhbCgpLFxyXG4gICAgICAgICAgICBmaWxsU2VhcmNoVGV4dDogdHJ1ZSxcclxuICAgICAgICAgICAgYWZ0ZXJEYXRhOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgIHNlbGYuX29uTG9hZChvcHRpb25zKVxyXG4gICAgICAgICAgICAgIC8vIENsZWFyIGlucHV0IGFzIHNvb24gYXMgbW9kYWwgaXMgcmVhZHlcclxuICAgICAgICAgICAgICBzZWxmLl9yZXR1cm5WYWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgc2VsZi5faXRlbSQudmFsKCcnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX3RyaWdnZXJMT1ZPbkJ1dHRvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgLy8gVHJpZ2dlciBldmVudCBvbiBjbGljayBpbnB1dCBncm91cCBhZGRvbiBidXR0b24gKG1hZ25pZmllciBnbGFzcylcclxuICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHNlbGYuX29wZW5MT1Yoe1xyXG4gICAgICAgICAgc2VhcmNoVGVybTogJycsXHJcbiAgICAgICAgICBmaWxsU2VhcmNoVGV4dDogZmFsc2UsXHJcbiAgICAgICAgICBhZnRlckRhdGE6IHNlbGYuX29uTG9hZFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9vblJvd0hvdmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICBzZWxmLl9tb2RhbERpYWxvZyQub24oJ21vdXNlZW50ZXIgbW91c2VsZWF2ZScsICcudC1SZXBvcnQtcmVwb3J0IHRib2R5IHRyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdtYXJrJykpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKHNlbGYub3B0aW9ucy5ob3ZlckNsYXNzZXMpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9zZWxlY3RJbml0aWFsUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBJZiBjdXJyZW50IGl0ZW0gaW4gTE9WIHRoZW4gc2VsZWN0IHRoYXQgcm93XHJcbiAgICAgIC8vIEVsc2Ugc2VsZWN0IGZpcnN0IHJvdyBvZiByZXBvcnRcclxuICAgICAgdmFyICRjdXJSb3cgPSBzZWxmLl9tb2RhbERpYWxvZyQuZmluZCgnLnQtUmVwb3J0LXJlcG9ydCB0cltkYXRhLXJldHVybj1cIicgKyBzZWxmLl9yZXR1cm5WYWx1ZSArICdcIl0nKVxyXG4gICAgICBpZiAoJGN1clJvdy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJGN1clJvdy5hZGRDbGFzcygnbWFyayAnICsgc2VsZi5vcHRpb25zLm1hcmtDbGFzc2VzKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuX21vZGFsRGlhbG9nJC5maW5kKCcudC1SZXBvcnQtcmVwb3J0IHRyW2RhdGEtcmV0dXJuXScpLmZpcnN0KCkuYWRkQ2xhc3MoJ21hcmsgJyArIHNlbGYub3B0aW9ucy5tYXJrQ2xhc3NlcylcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdEtleWJvYXJkTmF2aWdhdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlIChkaXJlY3Rpb24sIGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgdmFyIGN1cnJlbnRSb3cgPSBzZWxmLl9tb2RhbERpYWxvZyQuZmluZCgnLnQtUmVwb3J0LXJlcG9ydCB0ci5tYXJrJylcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICBpZiAoJChjdXJyZW50Um93KS5wcmV2KCkuaXMoJy50LVJlcG9ydC1yZXBvcnQgdHInKSkge1xyXG4gICAgICAgICAgICAgICQoY3VycmVudFJvdykucmVtb3ZlQ2xhc3MoJ21hcmsgJyArIHNlbGYub3B0aW9ucy5tYXJrQ2xhc3NlcykucHJldigpLmFkZENsYXNzKCdtYXJrICcgKyBzZWxmLm9wdGlvbnMubWFya0NsYXNzZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgICAgICBpZiAoJChjdXJyZW50Um93KS5uZXh0KCkuaXMoJy50LVJlcG9ydC1yZXBvcnQgdHInKSkge1xyXG4gICAgICAgICAgICAgICQoY3VycmVudFJvdykucmVtb3ZlQ2xhc3MoJ21hcmsgJyArIHNlbGYub3B0aW9ucy5tYXJrQ2xhc3NlcykubmV4dCgpLmFkZENsYXNzKCdtYXJrICcgKyBzZWxmLm9wdGlvbnMubWFya0NsYXNzZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQod2luZG93LnRvcC5kb2N1bWVudCkub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgICAgICBjYXNlIDM4OiAvLyB1cFxyXG4gICAgICAgICAgICBuYXZpZ2F0ZSgndXAnLCBlKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSA0MDogLy8gZG93blxyXG4gICAgICAgICAgICBuYXZpZ2F0ZSgnZG93bicsIGUpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDk6IC8vIHRhYlxyXG4gICAgICAgICAgICBuYXZpZ2F0ZSgnZG93bicsIGUpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDEzOiAvLyBFTlRFUlxyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2FjdGl2ZURlbGF5KSB7XHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3cgPSBzZWxmLl9tb2RhbERpYWxvZyQuZmluZCgnLnQtUmVwb3J0LXJlcG9ydCB0ci5tYXJrJykuZmlyc3QoKVxyXG4gICAgICAgICAgICAgIHNlbGYuX3JldHVyblNlbGVjdGVkUm93KGN1cnJlbnRSb3cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgMzM6IC8vIFBhZ2UgdXBcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KCcjJyArIHNlbGYub3B0aW9ucy5pZCArICcgLnQtQnV0dG9uUmVnaW9uLWJ1dHRvbnMgLnQtUmVwb3J0LXBhZ2luYXRpb25MaW5rLS1wcmV2JykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAzNDogLy8gUGFnZSBkb3duXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSgnIycgKyBzZWxmLm9wdGlvbnMuaWQgKyAnIC50LUJ1dHRvblJlZ2lvbi1idXR0b25zIC50LVJlcG9ydC1wYWdpbmF0aW9uTGluay0tbmV4dCcpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXR1cm5TZWxlY3RlZFJvdzogZnVuY3Rpb24gKCRyb3cpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAvLyBEbyBub3RoaW5nIGlmIHJvdyBkb2VzIG5vdCBleGlzdFxyXG4gICAgICBpZiAoISRyb3cgfHwgJHJvdy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgYXBleC5pdGVtKHNlbGYub3B0aW9ucy5pdGVtTmFtZSkuc2V0VmFsdWUoc2VsZi5fdW5lc2NhcGUoJHJvdy5kYXRhKCdyZXR1cm4nKS50b1N0cmluZygpKSwgc2VsZi5fdW5lc2NhcGUoJHJvdy5kYXRhKCdkaXNwbGF5JykpKVxyXG5cclxuXHJcbiAgICAgIC8vIFRyaWdnZXIgYSBjdXN0b20gZXZlbnQgYW5kIGFkZCBkYXRhIHRvIGl0OiBhbGwgY29sdW1ucyBvZiB0aGUgcm93XHJcbiAgICAgIHZhciBkYXRhID0ge31cclxuICAgICAgJC5lYWNoKCQoJy50LVJlcG9ydC1yZXBvcnQgdHIubWFyaycpLmZpbmQoJ3RkJyksIGZ1bmN0aW9uIChrZXksIHZhbCkge1xyXG4gICAgICAgIGRhdGFbJCh2YWwpLmF0dHIoJ2hlYWRlcnMnKV0gPSAkKHZhbCkuaHRtbCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBGaW5hbGx5IGhpZGUgdGhlIG1vZGFsXHJcbiAgICAgIHNlbGYuX21vZGFsRGlhbG9nJC5kaWFsb2coJ2Nsb3NlJylcclxuXHJcbiAgICAgIC8vIEFuZCBmb2N1cyBvbiBpbnB1dCBidXQgbm90IGZvciBJRyBjb2x1bW4gaXRlbVxyXG4gICAgICBzZWxmLl9yZXNldEZvY3VzKClcclxuICAgIH0sXHJcblxyXG4gICAgX29uUm93U2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIEFjdGlvbiB3aGVuIHJvdyBpcyBjbGlja2VkXHJcbiAgICAgIHNlbGYuX21vZGFsRGlhbG9nJC5vbignY2xpY2snLCAnLm1vZGFsLWxvdi10YWJsZSAudC1SZXBvcnQtcmVwb3J0IHRib2R5IHRyJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBzZWxmLl9yZXR1cm5TZWxlY3RlZFJvdyhzZWxmLl90b3BBcGV4LmpRdWVyeSh0aGlzKSlcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZVZhbGlkYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gQ2xlYXIgY3VycmVudCBlcnJvcnNcclxuICAgICAgYXBleC5tZXNzYWdlLmNsZWFyRXJyb3JzKHRoaXMub3B0aW9ucy5pdGVtTmFtZSlcclxuICAgIH0sXHJcblxyXG4gICAgX2NsZWFySW5wdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIGFwZXguaXRlbShzZWxmLm9wdGlvbnMuaXRlbU5hbWUpLnNldFZhbHVlKCcnKVxyXG4gICAgICBzZWxmLl9yZXR1cm5WYWx1ZSA9ICcnXHJcbiAgICAgIHNlbGYuX3JlbW92ZVZhbGlkYXRpb24oKVxyXG4gICAgICBzZWxmLl9pdGVtJC5mb2N1cygpXHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0Q2xlYXJJbnB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgIHNlbGYuX2NsZWFySW5wdXQkLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9jbGVhcklucHV0KClcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRDYXNjYWRpbmdMT1ZzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeShzZWxmLm9wdGlvbnMuY2FzY2FkaW5nSXRlbXMpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5fY2xlYXJJbnB1dCgpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9zZXRWYWx1ZUJhc2VkT25EaXNwbGF5OiBmdW5jdGlvbiAocFZhbHVlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgdmFyIHByb21pc2UgPSBhcGV4LnNlcnZlci5wbHVnaW4oc2VsZi5vcHRpb25zLmFqYXhJZGVudGlmaWVyLCB7XHJcbiAgICAgICAgeDAxOiAnR0VUX1ZBTFVFJyxcclxuICAgICAgICB4MDI6IHBWYWx1ZSAvLyByZXR1cm5WYWxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgbG9hZGluZ0luZGljYXRvcjogJC5wcm94eShzZWxmLl9pdGVtTG9hZGluZ0luZGljYXRvciwgc2VsZiksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHBEYXRhKSB7XHJcbiAgICAgICAgICBzZWxmLl9kaXNhYmxlQ2hhbmdlRXZlbnQgPSBmYWxzZVxyXG4gICAgICAgICAgc2VsZi5fcmV0dXJuVmFsdWUgPSBwRGF0YS5yZXR1cm5WYWx1ZVxyXG4gICAgICAgICAgc2VsZi5faXRlbSQudmFsKHBEYXRhLmRpc3BsYXlWYWx1ZSlcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgcHJvbWlzZVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uIChwRGF0YSkge1xyXG4gICAgICAgICAgc2VsZi5fcmV0dXJuVmFsdWUgPSBwRGF0YS5yZXR1cm5WYWx1ZVxyXG4gICAgICAgICAgc2VsZi5faXRlbSQudmFsKHBEYXRhLmRpc3BsYXlWYWx1ZSlcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX2Rpc2FibGVDaGFuZ2VFdmVudCA9IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRBcGV4SXRlbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgLy8gU2V0IGFuZCBnZXQgdmFsdWUgdmlhIGFwZXggZnVuY3Rpb25zXHJcbiAgICAgIGFwZXguaXRlbS5jcmVhdGUoc2VsZi5vcHRpb25zLml0ZW1OYW1lLCB7XHJcbiAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKVxyXG4gICAgICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKVxyXG4gICAgICAgICAgc2VsZi5fY2xlYXJJbnB1dCQuc2hvdygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXHJcbiAgICAgICAgICBzZWxmLl9zZWFyY2hCdXR0b24kLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcclxuICAgICAgICAgIHNlbGYuX2NsZWFySW5wdXQkLmhpZGUoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEaXNhYmxlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHNlbGYuX2l0ZW0kLnByb3AoJ2Rpc2FibGVkJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLnNob3coKVxyXG4gICAgICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJC5zaG93KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLmhpZGUoKVxyXG4gICAgICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJC5oaWRlKClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHBWYWx1ZSwgcERpc3BsYXlWYWx1ZSwgcFN1cHByZXNzQ2hhbmdlRXZlbnQpIHtcclxuICAgICAgICAgIGlmIChwRGlzcGxheVZhbHVlIHx8ICFwVmFsdWUgfHwgcFZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBBc3N1bWluZyBubyBjaGVjayBpcyBuZWVkZWQgdG8gc2VlIGlmIHRoZSB2YWx1ZSBpcyBpbiB0aGUgTE9WXHJcbiAgICAgICAgICAgIHNlbGYuX2l0ZW0kLnZhbChwRGlzcGxheVZhbHVlKVxyXG4gICAgICAgICAgICBzZWxmLl9yZXR1cm5WYWx1ZSA9IHBWYWx1ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5faXRlbSQudmFsKHBEaXNwbGF5VmFsdWUpXHJcbiAgICAgICAgICAgIHNlbGYuX2Rpc2FibGVDaGFuZ2VFdmVudCA9IHRydWVcclxuICAgICAgICAgICAgc2VsZi5fc2V0VmFsdWVCYXNlZE9uRGlzcGxheShwVmFsdWUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gQWx3YXlzIHJldHVybiBhdCBsZWFzdCBhbiBlbXB0eSBzdHJpbmdcclxuICAgICAgICAgIHJldHVybiBzZWxmLl9yZXR1cm5WYWx1ZSB8fCAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5vcHRpb25zLml0ZW1OYW1lKS52YWx1ZSAhPT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5vcHRpb25zLml0ZW1OYW1lKS5kZWZhdWx0VmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGFwZXguaXRlbShzZWxmLm9wdGlvbnMuaXRlbU5hbWUpLmNhbGxiYWNrcy5kaXNwbGF5VmFsdWVGb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuX2l0ZW0kLnZhbCgpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE9ubHkgdHJpZ2dlciB0aGUgY2hhbmdlIGV2ZW50IGFmdGVyIHRoZSBBc3luYyBjYWxsYmFjayBpZiBuZWVkZWRcclxuICAgICAgc2VsZi5faXRlbSRbJ3RyaWdnZXInXSA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnICYmIHNlbGYuX2Rpc2FibGVDaGFuZ2VFdmVudCkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQuZm4udHJpZ2dlci5jYWxsKHNlbGYuX2l0ZW0kLCB0eXBlLCBkYXRhKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9pdGVtTG9hZGluZ0luZGljYXRvcjogZnVuY3Rpb24gKGxvYWRpbmdJbmRpY2F0b3IpIHtcclxuICAgICAgJCgnIycgKyB0aGlzLm9wdGlvbnMuc2VhcmNoQnV0dG9uKS5hZnRlcihsb2FkaW5nSW5kaWNhdG9yKVxyXG4gICAgICByZXR1cm4gbG9hZGluZ0luZGljYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICBfbW9kYWxMb2FkaW5nSW5kaWNhdG9yOiBmdW5jdGlvbiAobG9hZGluZ0luZGljYXRvcikge1xyXG4gICAgICB0aGlzLl9tb2RhbERpYWxvZyQucHJlcGVuZChsb2FkaW5nSW5kaWNhdG9yKVxyXG4gICAgICByZXR1cm4gbG9hZGluZ0luZGljYXRvclxyXG4gICAgfVxyXG4gIH0pXHJcbn0pKGFwZXgualF1ZXJ5LCB3aW5kb3cpXHJcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24sIGFsaWFzNT1jb250YWluZXIubGFtYmRhO1xuXG4gIHJldHVybiBcIjxkaXYgaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgY2xhc3M9XFxcInQtRGlhbG9nUmVnaW9uIGpzLXJlZ2llb25EaWFsb2cgdC1Gb3JtLS1zdHJldGNoSW5wdXRzIHQtRm9ybS0tbGFyZ2UgbW9kYWwtbG92XFxcIiB0aXRsZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidC1EaWFsb2dSZWdpb24tYm9keSBqcy1yZWdpb25EaWFsb2ctYm9keSBuby1wYWRkaW5nXFxcIiBcIlxuICAgICsgKChzdGFjazEgPSBhbGlhczUoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVnaW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5hdHRyaWJ1dGVzIDogc3RhY2sxKSwgZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sIGNvbC0xMlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LVJlcG9ydCB0LVJlcG9ydC0tYWx0Um93c0RlZmF1bHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInQtUmVwb3J0LXdyYXBcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInQtRm9ybS1maWVsZENvbnRhaW5lciB0LUZvcm0tZmllbGRDb250YWluZXItLXN0YWNrZWQgdC1Gb3JtLWZpZWxkQ29udGFpbmVyLS1zdHJldGNoSW5wdXRzIG1hcmdpbi10b3Atc21cXFwiIGlkPVxcXCJcIlxuICAgICsgYWxpYXM0KGFsaWFzNSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zZWFyY2hGaWVsZCA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuaWQgOiBzdGFjazEpLCBkZXB0aDApKVxuICAgICsgXCJfQ09OVEFJTkVSXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInQtRm9ybS1pbnB1dENvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidC1Gb3JtLWl0ZW1XcmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJhcGV4LWl0ZW0tdGV4dCBtb2RhbC1sb3YtaXRlbSBcXFwiIGlkPVxcXCJcIlxuICAgICsgYWxpYXM0KGFsaWFzNSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zZWFyY2hGaWVsZCA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuaWQgOiBzdGFjazEpLCBkZXB0aDApKVxuICAgICsgXCJcXFwiIGF1dG9jb21wbGV0ZT1cXFwib2ZmXFxcIiBwbGFjZWhvbGRlcj1cXFwiXCJcbiAgICArIGFsaWFzNChhbGlhczUoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VhcmNoRmllbGQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLnBsYWNlaG9sZGVyIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJQMTExMF9aQUFMX0ZLX0NPREVfQlVUVE9OXFxcIiBjbGFzcz1cXFwiYS1CdXR0b24gbW9kYWwtbG92LWJ1dHRvbiBhLUJ1dHRvbi0tcG9wdXBMT1ZcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImZhIGZhLXNlYXJjaFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gY29udGFpbmVyLmludm9rZVBhcnRpYWwocGFydGlhbHMucmVwb3J0LGRlcHRoMCx7XCJuYW1lXCI6XCJyZXBvcnRcIixcImRhdGFcIjpkYXRhLFwiaW5kZW50XCI6XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXCJoZWxwZXJzXCI6aGVscGVycyxcInBhcnRpYWxzXCI6cGFydGlhbHMsXCJkZWNvcmF0b3JzXCI6Y29udGFpbmVyLmRlY29yYXRvcnN9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0LURpYWxvZ1JlZ2lvbi1idXR0b25zIGpzLXJlZ2lvbkRpYWxvZy1idXR0b25zXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInQtQnV0dG9uUmVnaW9uIHQtQnV0dG9uUmVnaW9uLS1kaWFsb2dSZWdpb25cXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInQtQnV0dG9uUmVnaW9uLXdyYXBcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGNvbnRhaW5lci5pbnZva2VQYXJ0aWFsKHBhcnRpYWxzLnBhZ2luYXRpb24sZGVwdGgwLHtcIm5hbWVcIjpcInBhZ2luYXRpb25cIixcImRhdGFcIjpkYXRhLFwiaW5kZW50XCI6XCIgICAgICAgICAgICAgICAgXCIsXCJoZWxwZXJzXCI6aGVscGVycyxcInBhcnRpYWxzXCI6cGFydGlhbHMsXCJkZWNvcmF0b3JzXCI6Y29udGFpbmVyLmRlY29yYXRvcnN9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xufSxcInVzZVBhcnRpYWxcIjp0cnVlLFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWNvbnRhaW5lci5sYW1iZGEsIGFsaWFzMz1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJ0LUJ1dHRvblJlZ2lvbi1jb2wgdC1CdXR0b25SZWdpb24tY29sLS1sZWZ0XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidC1CdXR0b25SZWdpb24tYnV0dG9uc1xcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVyc1tcImlmXCJdLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmFsbG93UHJldiA6IHN0YWNrMSkse1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMiwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcInQtQnV0dG9uUmVnaW9uLWNvbCB0LUJ1dHRvblJlZ2lvbi1jb2wtLWNlbnRlclxcXCIgc3R5bGU9XFxcInRleHQtYWxpZ246IGNlbnRlcjtcXFwiPlxcclxcbiAgXCJcbiAgICArIGFsaWFzMyhhbGlhczIoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucGFnaW5hdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuZmlyc3RSb3cgOiBzdGFjazEpLCBkZXB0aDApKVxuICAgICsgXCIgLSBcIlxuICAgICsgYWxpYXMzKGFsaWFzMigoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wYWdpbmF0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5sYXN0Um93IDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxyXFxuPC9kaXY+XFxyXFxuPGRpdiBjbGFzcz1cXFwidC1CdXR0b25SZWdpb24tY29sIHQtQnV0dG9uUmVnaW9uLWNvbC0tcmlnaHRcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0LUJ1dHRvblJlZ2lvbi1idXR0b25zXFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucGFnaW5hdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuYWxsb3dOZXh0IDogc3RhY2sxKSx7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSg0LCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCI7XG59LFwiMlwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCIgICAgICAgIDxhIGhyZWY9XFxcImphdmFzY3JpcHQ6dm9pZCgwKTtcXFwiIGNsYXNzPVxcXCJ0LUJ1dHRvbiB0LUJ1dHRvbi0tc21hbGwgdC1CdXR0b24tLW5vVUkgdC1SZXBvcnQtcGFnaW5hdGlvbkxpbmsgdC1SZXBvcnQtcGFnaW5hdGlvbkxpbmstLXByZXZcXFwiPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYS1JY29uIGljb24tbGVmdC1hcnJvd1xcXCI+PC9zcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLnByZXZpb3VzIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxyXFxuICAgICAgICA8L2E+XFxyXFxuXCI7XG59LFwiNFwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCIgICAgICAgIDxhIGhyZWY9XFxcImphdmFzY3JpcHQ6dm9pZCgwKTtcXFwiIGNsYXNzPVxcXCJ0LUJ1dHRvbiB0LUJ1dHRvbi0tc21hbGwgdC1CdXR0b24tLW5vVUkgdC1SZXBvcnQtcGFnaW5hdGlvbkxpbmsgdC1SZXBvcnQtcGFnaW5hdGlvbkxpbmstLW5leHRcXFwiPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLm5leHQgOiBzdGFjazEpLCBkZXB0aDApKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImEtSWNvbiBpY29uLXJpZ2h0LWFycm93XFxcIj48L3NwYW4+XFxyXFxuICAgICAgICA8L2E+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLnJvd0NvdW50IDogc3RhY2sxKSx7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKTtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgb3B0aW9ucywgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGJ1ZmZlciA9IFxuICBcIiAgICAgICAgICAgIDx0YWJsZSBjZWxscGFkZGluZz1cXFwiMFxcXCIgYm9yZGVyPVxcXCIwXFxcIiBjZWxsc3BhY2luZz1cXFwiMFxcXCIgc3VtbWFyeT1cXFwiXFxcIiBjbGFzcz1cXFwidC1SZXBvcnQtcmVwb3J0IFwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlcG9ydCA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuY2xhc3NlcyA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIlxcXCIgd2lkdGg9XFxcIjEwMCVcXFwiPlxcclxcbiAgICAgICAgICAgICAgPHRib2R5PlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnNbXCJpZlwiXS5jYWxsKGFsaWFzMSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLnNob3dIZWFkZXJzIDogc3RhY2sxKSx7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgyLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKTtcbiAgc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5yZXBvcnQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlcG9ydCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLChvcHRpb25zPXtcIm5hbWVcIjpcInJlcG9ydFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSg4LCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGFsaWFzMSxvcHRpb25zKSA6IGhlbHBlcikpO1xuICBpZiAoIWhlbHBlcnMucmVwb3J0KSB7IHN0YWNrMSA9IGhlbHBlcnMuYmxvY2tIZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLHN0YWNrMSxvcHRpb25zKX1cbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuXCI7XG59LFwiMlwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCIgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmNvbHVtbnMgOiBzdGFjazEpLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMywgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgICAgICAgICAgICAgICAgPC90aGVhZD5cXHJcXG5cIjtcbn0sXCIzXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pO1xuXG4gIHJldHVybiBcIiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcInQtUmVwb3J0LWNvbEhlYWRcXFwiIGlkPVxcXCJcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5rZXkgfHwgKGRhdGEgJiYgZGF0YS5rZXkpKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnNbXCJpZlwiXS5jYWxsKGFsaWFzMSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubGFiZWwgOiBkZXB0aDApLHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDQsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5wcm9ncmFtKDYsIGRhdGEsIDApLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxcclxcblwiO1xufSxcIjRcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxhYmVsIDogZGVwdGgwKSwgZGVwdGgwKSlcbiAgICArIFwiXFxyXFxuXCI7XG59LFwiNlwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYSgoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCksIGRlcHRoMCkpXG4gICAgKyBcIlxcclxcblwiO1xufSxcIjhcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuICgoc3RhY2sxID0gY29udGFpbmVyLmludm9rZVBhcnRpYWwocGFydGlhbHMucm93cyxkZXB0aDAse1wibmFtZVwiOlwicm93c1wiLFwiZGF0YVwiOmRhdGEsXCJpbmRlbnRcIjpcIiAgICAgICAgICAgICAgICAgIFwiLFwiaGVscGVyc1wiOmhlbHBlcnMsXCJwYXJ0aWFsc1wiOnBhcnRpYWxzLFwiZGVjb3JhdG9yc1wiOmNvbnRhaW5lci5kZWNvcmF0b3JzfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKTtcbn0sXCIxMFwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCIgICAgPHNwYW4gY2xhc3M9XFxcIm5vZGF0YWZvdW5kXFxcIj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLm5vRGF0YUZvdW5kIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcInQtUmVwb3J0LXRhYmxlV3JhcCBtb2RhbC1sb3YtdGFibGVcXFwiPlxcclxcbiAgPHRhYmxlIGNlbGxwYWRkaW5nPVxcXCIwXFxcIiBib3JkZXI9XFxcIjBcXFwiIGNlbGxzcGFjaW5nPVxcXCIwXFxcIiBjbGFzcz1cXFwiXFxcIiB3aWR0aD1cXFwiMTAwJVxcXCI+XFxyXFxuICAgIDx0Ym9keT5cXHJcXG4gICAgICA8dHI+XFxyXFxuICAgICAgICA8dGQ+PC90ZD5cXHJcXG4gICAgICA8L3RyPlxcclxcbiAgICAgIDx0cj5cXHJcXG4gICAgICAgIDx0ZD5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVwb3J0IDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5yb3dDb3VudCA6IHN0YWNrMSkse1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgICAgICA8L3RkPlxcclxcbiAgICAgIDwvdHI+XFxyXFxuICAgIDwvdGJvZHk+XFxyXFxuICA8L3RhYmxlPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMudW5sZXNzLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlcG9ydCA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEucm93Q291bnQgOiBzdGFjazEpLHtcIm5hbWVcIjpcInVubGVzc1wiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxMCwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwidXNlUGFydGlhbFwiOnRydWUsXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGFsaWFzMT1jb250YWluZXIubGFtYmRhLCBhbGlhczI9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiICA8dHIgZGF0YS1yZXR1cm49XFxcIlwiXG4gICAgKyBhbGlhczIoYWxpYXMxKChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXR1cm5WYWwgOiBkZXB0aDApLCBkZXB0aDApKVxuICAgICsgXCJcXFwiIGRhdGEtZGlzcGxheT1cXFwiXCJcbiAgICArIGFsaWFzMihhbGlhczEoKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRpc3BsYXlWYWwgOiBkZXB0aDApLCBkZXB0aDApKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJwb2ludGVyXFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jb2x1bW5zIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDIsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgPC90cj5cXHJcXG5cIjtcbn0sXCIyXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiICAgICAgPHRkIGhlYWRlcnM9XFxcIlwiXG4gICAgKyBhbGlhczEoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5rZXkgfHwgKGRhdGEgJiYgZGF0YS5rZXkpKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJrZXlcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwidC1SZXBvcnQtY2VsbFxcXCI+XCJcbiAgICArIGFsaWFzMShjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC90ZD5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJvd3MgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiJdfQ==
