var WaveGeneral =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/waveGeneral/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	
	exports.default = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var ee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _eventEmitter2.default)();
	
	  return init(options, ee);
	};
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _eventEmitter = __webpack_require__(2);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	var _Playlist = __webpack_require__(19);
	
	var _Playlist2 = _interopRequireDefault(_Playlist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var ee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _eventEmitter2.default)();
	
	  if (options.container === undefined) {
	    throw new Error('DOM element container must be given.');
	  }
	
	  window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
	  window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
	  var audioContext = new window.AudioContext();
	
	  var defaults = {
	    ac: audioContext,
	    sampleRate: audioContext.sampleRate,
	    samplesPerPixel: 1500,
	    controls: {
	      show: false,
	      width: 150
	    },
	    colors: {
	      waveOutlineColor: 'white',
	      timeColor: 'grey',
	      fadeColor: 'black'
	    },
	    typeArr: [{ type: 'input', sort: 'form1', title: '标题', option: '' }, { type: 'select', sort: 'form2', title: 'select', option: ['苹果', '香蕉', '橘子'] }],
	    saveFun: function saveFun(info) {
	      console.log(info);
	    },
	    canMove: false,
	    errorInfo: { type: 'checkbox', sort: 'errorInfo', title: 'errorInfo', option: ['错误1', '错误2', '错误3'] },
	    waveHeight: 256,
	    zoomLevels: [400, 750, 1500, 3000, 6000, 11000, 19000]
	  };
	  var config = (0, _lodash2.default)(defaults, options);
	  var zoomIndex = config.zoomLevels.indexOf(config.samplesPerPixel);
	
	  if (zoomIndex === -1) {
	    throw new Error('initial samplesPerPixel must be included in array zoomLevels');
	  }
	  var playlist = new _Playlist2.default();
	  playlist.setSampleName(config.name);
	  playlist.setDataInfo(config.markData);
	  playlist.setDefault(config.markData);
	  playlist.setMarkInfo(config.markInfo);
	  playlist.setDataInfo();
	  playlist.setTypeArr(config.typeArr);
	  playlist.setErrorInfo(config.errorInfo);
	  playlist.setSaveFun(config.saveFun);
	  playlist.setCanMove(config.canMove);
	  playlist.setSampleRate(config.sampleRate);
	  playlist.setSamplesPerPixel(config.samplesPerPixel);
	  playlist.setAudioContext(config.ac);
	  playlist.setEventEmitter(ee);
	  playlist.setUpEventEmitter(); // 初始化音频通用方法
	  playlist.setControlOptions(config.controls); // 宽度以及show设置
	  playlist.setWaveHeight(config.waveHeight);
	  playlist.setColors(config.colors);
	  playlist.setZoomLevels(config.zoomLevels);
	  playlist.setZoomIndex(zoomIndex);
	
	  playlist.isAutomaticScroll = config.isAutomaticScroll;
	  playlist.isContinuousPlay = config.isContinuousPlay;
	  playlist.linkedEndpoints = config.linkedEndpoints;
	
	  playlist.render();
	  return playlist;
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = assign;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d        = __webpack_require__(3)
	  , callable = __webpack_require__(18)
	
	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }
	
	  , on, once, off, emit, methods, descriptors, base;
	
	on = function (type, listener) {
		var data;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];
	
		return this;
	};
	
	once = function (type, listener) {
		var once, self;
	
		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});
	
		once.__eeOnceListener__ = listener;
		return this;
	};
	
	off = function (type, listener) {
		var data, listeners, candidate, i;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];
	
		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}
	
		return this;
	};
	
	emit = function (type) {
		var i, l, listener, listeners, args;
	
		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;
	
		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
	
			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};
	
	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};
	
	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};
	
	base = defineProperties({}, descriptors);
	
	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__(4)
	  , normalizeOpts = __webpack_require__(13)
	  , isCallable    = __webpack_require__(14)
	  , contains      = __webpack_require__(15)
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(5)()
		? Object.assign
		: __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var keys  = __webpack_require__(7)
	  , value = __webpack_require__(12)
	  , max   = Math.max;
	
	module.exports = function (dest, src /*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(8)()
		? Object.keys
		: __webpack_require__(9);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
	 return false;
	}
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var isValue = __webpack_require__(10);
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(isValue(object) ? Object(object) : object);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _undefined = __webpack_require__(11)(); // Support ES3 engines
	
	module.exports = function (val) {
	 return (val !== _undefined) && (val !== null);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	// eslint-disable-next-line no-empty-function
	module.exports = function () {};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var isValue = __webpack_require__(10);
	
	module.exports = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var isValue = __webpack_require__(10);
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	// eslint-disable-next-line no-unused-vars
	module.exports = function (opts1 /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	// Deprecated
	
	"use strict";
	
	module.exports = function (obj) {
	 return typeof obj === "function";
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(16)()
		? String.prototype.contains
		: __webpack_require__(17);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	
	var str = "razdwatrzy";
	
	module.exports = function () {
		if (typeof str.contains !== "function") return false;
		return (str.contains("dwa") === true) && (str.contains("foo") === false);
	};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lodash = __webpack_require__(20);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _createElement = __webpack_require__(21);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _TimeScale = __webpack_require__(34);
	
	var _TimeScale2 = _interopRequireDefault(_TimeScale);
	
	var _Track = __webpack_require__(49);
	
	var _Track2 = _interopRequireDefault(_Track);
	
	var _Playout = __webpack_require__(52);
	
	var _Playout2 = _interopRequireDefault(_Playout);
	
	var _PlayedHook = __webpack_require__(53);
	
	var _PlayedHook2 = _interopRequireDefault(_PlayedHook);
	
	var _FragHook = __webpack_require__(54);
	
	var _FragHook2 = _interopRequireDefault(_FragHook);
	
	var _FormHook = __webpack_require__(55);
	
	var _FormHook2 = _interopRequireDefault(_FormHook);
	
	var _FragController = __webpack_require__(56);
	
	var _FragController2 = _interopRequireDefault(_FragController);
	
	var _FormController = __webpack_require__(57);
	
	var _FormController2 = _interopRequireDefault(_FormController);
	
	var _OtherController = __webpack_require__(58);
	
	var _OtherController2 = _interopRequireDefault(_OtherController);
	
	var _LoaderFactory = __webpack_require__(59);
	
	var _LoaderFactory2 = _interopRequireDefault(_LoaderFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	
	    this.defaults = _lodash2.default;
	    this.duration = 0;
	    this.scrollLeft = 0;
	    this.tracks = [];
	    this.timer = null;
	    this.cycle = true;
	    this.allTime = 0;
	    this.loadFirst = true;
	
	    this.startTime = 0;
	    this.stopTime = 0;
	    this.pauseTime = 0;
	    this.lastPlay = 0;
	    this.formInfo = [];
	
	    this.fragDom = document.getElementById('waveFrag');
	    this.canvasDom = document.getElementById('waveCanvse');
	  }
	  // 设置初始值
	
	
	  _createClass(_class, [{
	    key: 'setDefault',
	    value: function setDefault(info) {
	      this.markData = info || this.markData;
	    }
	    // 设置项目名称ID
	
	  }, {
	    key: 'setSampleName',
	    value: function setSampleName(name) {
	      this.name = name;
	    }
	    // 设置初始值
	
	  }, {
	    key: 'setDataInfo',
	    value: function setDataInfo(info) {
	      if (info) {
	        this.formInfo = info;
	        return;
	      }
	      // if (localStorage[this.name] && localStorage[this.name] !== '[]') {
	      //   this.formInfo = JSON.parse(localStorage[this.name]);
	      // }
	    }
	  }, {
	    key: 'setTypeArr',
	    value: function setTypeArr(typeArr) {
	      this.typeArr = typeArr;
	    }
	  }, {
	    key: 'setErrorInfo',
	    value: function setErrorInfo(errorInfo) {
	      this.errorInfo = errorInfo;
	    }
	  }, {
	    key: 'setSaveFun',
	    value: function setSaveFun(saveFun) {
	      this.saveFun = saveFun;
	    }
	  }, {
	    key: 'setCanMove',
	    value: function setCanMove(canmove) {
	      this.canMove = canmove;
	    }
	  }, {
	    key: 'setMarkInfo',
	    value: function setMarkInfo(markInfo) {
	      this.markInfo = markInfo;
	    }
	    // 设置循环
	
	  }, {
	    key: 'setCycle',
	    value: function setCycle(bol) {
	      this.cycle = bol;
	    }
	    // 音频码率
	
	  }, {
	    key: 'setSampleRate',
	    value: function setSampleRate(sampleRate) {
	      this.sampleRate = sampleRate;
	    }
	    // 音频初始缩放比例
	
	  }, {
	    key: 'setSamplesPerPixel',
	    value: function setSamplesPerPixel(samplesPerPixel) {
	      this.samplesPerPixel = samplesPerPixel;
	    }
	    // 音频AudioContext初始化
	
	  }, {
	    key: 'setAudioContext',
	    value: function setAudioContext(ac) {
	      this.ac = ac;
	    }
	    // 初始化事件模块
	
	  }, {
	    key: 'setEventEmitter',
	    value: function setEventEmitter(ee) {
	      this.ee = ee;
	    }
	    // 设置wave高度
	
	  }, {
	    key: 'setWaveHeight',
	    value: function setWaveHeight(height) {
	      this.waveHeight = height;
	    }
	    // 设置曲线的颜色
	
	  }, {
	    key: 'setColors',
	    value: function setColors(colors) {
	      this.colors = colors;
	    }
	    // 设置缩放的区间
	
	  }, {
	    key: 'setZoomLevels',
	    value: function setZoomLevels(levels) {
	      this.zoomLevels = levels;
	    }
	    // 设置缩放index
	
	  }, {
	    key: 'setZoomIndex',
	    value: function setZoomIndex(index) {
	      this.zoomIndex = index;
	    }
	    // 设置缩放比例
	
	  }, {
	    key: 'setZoom',
	    value: function setZoom(zoomIndex) {
	      var _this = this;
	
	      var zoom = this.zoomLevels[zoomIndex];
	      this.samplesPerPixel = zoom;
	      this.tracks.forEach(function (track) {
	        track.calculatePeaks(zoom, _this.sampleRate);
	      });
	    }
	    // 设置show
	
	  }, {
	    key: 'setControlOptions',
	    value: function setControlOptions(controlOptions) {
	      this.controls = controlOptions;
	    }
	    // 保存数据
	
	  }, {
	    key: 'saveLocalStorage',
	    value: function saveLocalStorage() {
	      localStorage.setItem(this.name, JSON.stringify(this.formInfo));
	      return this.formInfo;
	    }
	    // 工具类
	
	  }, {
	    key: 'adjustDuration',
	    value: function adjustDuration() {
	      this.duration = this.tracks.reduce(function (duration, track) {
	        return Math.max(duration, track.getEndTime());
	      }, 0);
	      this.allTime += this.tracks[this.tracks.length - 1].duration;
	    }
	    // 添加新片段
	
	  }, {
	    key: 'setFragHook',
	    value: function setFragHook(frag) {
	      this.formInfo = frag;
	      this.formController.setForminfo(this.formInfo);
	      this.fragController.setForminfo(this.formInfo);
	      this.fragHook.renderAdd(frag[frag.length - 1], frag.length - 1);
	      this.formHook.renderAdd(this.formInfo);
	    }
	  }, {
	    key: 'changeFragHook',
	    value: function changeFragHook(frag, index) {
	      this.formInfo.splice(index, 1, frag);
	      this.formHook.render();
	    }
	  }, {
	    key: 'clearInfo',
	    value: function clearInfo() {
	      this.formInfo = [];
	      this.formController.setForminfo(this.formInfo);
	      this.fragController.setForminfo(this.formInfo);
	      this.render();
	    }
	  }, {
	    key: 'deleteFragHook',
	    value: function deleteFragHook(index) {
	      this.formInfo.splice(index, 1);
	      this.formController.setForminfo(this.formInfo);
	      this.fragController.setForminfo(this.formInfo);
	      this.fragController.setSelected();
	      this.fragHook.render();
	      this.formHook.render();
	    }
	
	    // 控制模块
	
	  }, {
	    key: 'setUpEventEmitter',
	    value: function setUpEventEmitter() {
	      var _this2 = this;
	
	      var ee = this.ee;
	      this.fragController = new _FragController2.default(ee, this.fragDom, this.formInfo, this.samplesPerPixel, this.sampleRate, this.canMove);
	      this.fragController.bindEvent();
	      this.formController = new _FormController2.default(ee, this.formInfo, this.markInfo);
	      this.formController.bindEvent();
	      this.otherController = new _OtherController2.default(ee);
	      this.otherController.bindEvent();
	      ee.on('play', function (startTime, endTime) {
	        _this2.play(startTime, endTime);
	      });
	      ee.on('pause', function () {
	        _this2.pause();
	      });
	      ee.on('playFrag', function (index) {
	        _this2.playFrag(index);
	      });
	      ee.on('changeFrag', function (frag, index) {
	        _this2.changeFragHook(frag, index);
	      });
	      ee.on('addFrag', function (frag) {
	        _this2.setFragHook(frag);
	      });
	      ee.on('selectdFrag', function (index) {
	        _this2.formController.setClassName(index);
	      });
	      ee.on('deleteFrag', function (index) {
	        _this2.deleteFragHook(index);
	      });
	      ee.on('zoom', function (index) {
	        _this2.zoom(index);
	      });
	      ee.on('save', function (formData) {
	        _this2.formInfo = formData;
	        _this2.saveLocalStorage();
	        _this2.saveFun(_this2.formInfo);
	      });
	      ee.on('saveFun', function (formInfo) {
	        _this2.saveFun(formInfo);
	      });
	      ee.on('loadFirst', function () {
	        var self = _this2;
	        if (_this2.loadFirst) {
	          setTimeout(function () {
	            return self.play();
	          }, 1000);
	          _this2.loadFirst = false;
	        }
	      });
	      ee.on('clear', function () {
	        _this2.clearInfo();
	      });
	      ee.on('demo', function () {
	        console.log(111);
	      });
	      document.getElementById('wrap').onmousewheel = function (e) {
	        var zoomIndex = e.deltaY === 100 ? 1 : -1;
	        e.preventDefault();
	        ee.emit('zoom', zoomIndex);
	      };
	      document.getElementById('container').onscroll = function (e) {
	        document.getElementById('formInfo').style.left = '-' + e.path[0].scrollLeft + 'px';
	      };
	      document.onkeydown = function (e) {
	        switch (e.keyCode) {
	          case 32:
	            _this2.isPlaying() ? _this2.pause() : _this2.play();
	            e.preventDefault();
	            break;
	          case 82:
	            _this2.ee.emit('rightEvent', e);
	            break;
	          // case 8:
	          //   const index = document.getElementsByClassName('fragSelected')[0].getAttribute('name');
	          //   this.deleteFragHook(index);
	          default:
	            break;
	        }
	      };
	    }
	  }, {
	    key: 'playFrag',
	    value: function playFrag(index) {
	      var start = this.formInfo[index].start;
	      var end = this.formInfo[index].end - start;
	      if (this.isPlaying()) {
	        this.pause();
	      } else {
	        this.play(start, end);
	      }
	    }
	    // 是否播放
	
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      var isplay = false;
	      this.tracks.forEach(function (track) {
	        if (track.isPlaying()) {
	          isplay = true;
	        }
	      });
	      return isplay;
	    }
	    // 获取间隔时间TODO
	
	  }, {
	    key: 'getElapsedTime',
	    value: function getElapsedTime() {
	      return this.ac.currentTime - this.lastPlay;
	    }
	    // 停止
	
	  }, {
	    key: 'playbackReset',
	    value: function playbackReset() {
	      var _this3 = this;
	
	      this.tracks.forEach(function (track) {
	        track.scheduleStop(track, _this3.lastPlay);
	      });
	
	      return Promise.all(this.playoutPromises);
	    }
	    // 启动动画
	
	  }, {
	    key: 'startAnimation',
	    value: function startAnimation() {
	      var _this4 = this;
	
	      this.stopAnimation();
	      this.timer = requestAnimationFrame(function (step) {
	        _this4.stepStart = step;
	        _this4.animationRequest(step);
	      });
	    }
	  }, {
	    key: 'animationRequest',
	    value: function animationRequest(step) {
	      var _this5 = this;
	
	      var stepStart = (step - this.stepStart) / 1000;
	      this.lastPlay = this.startTime ? this.startTime + stepStart : this.pauseTime + stepStart;
	      if (this.lastPlay >= this.startTime + this.endTime) {
	        if (this.cycle) {
	          this.play(this.startTime, this.endTime);
	          return;
	        }
	        this.stopAnimation();
	        this.pauseTime = this.lastPlay;
	      } else {
	        this.renderPlayed(this.lastPlay);
	        this.timer = requestAnimationFrame(function (steps) {
	          _this5.animationRequest(steps);
	        });
	        if (this.lastPlay > this.allTime) {
	          this.stop();
	        }
	      }
	    }
	    // 停止动画
	
	  }, {
	    key: 'stopAnimation',
	    value: function stopAnimation() {
	      window.cancelAnimationFrame(this.timer);
	    }
	    // demo
	
	  }, {
	    key: 'demo',
	    value: function demo() {
	      this.ee.emit('demo');
	    }
	
	    // 播放
	
	  }, {
	    key: 'play',
	    value: function play(startTime, endTime) {
	      var _this6 = this;
	
	      var start = startTime || this.pauseTime;
	      var end = endTime || this.allTime;
	      this.startTime = startTime;
	      this.endTime = end;
	      if (this.isPlaying()) {
	        return this.restartPlayFrom(start, end);
	      }
	      this.startAnimation();
	      var playoutPromises = [];
	      var currentTime = this.ac.currentTime;
	      this.tracks.forEach(function (track) {
	        playoutPromises.push(track.schedulePlay(currentTime, start, end, {
	          shouldPlay: true,
	          masterGain: _this6.masterGain
	        }, track));
	      });
	      this.playoutPromises = playoutPromises;
	
	      document.getElementById('play').style.display = 'none';
	      return Promise.all(this.playoutPromises);
	    }
	    // 暂停
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (!this.isPlaying()) {
	        return;
	        // return Promise.all(this.playoutPromises);
	      }
	      this.stopAnimation();
	      this.pauseTime = this.lastPlay;
	      document.getElementById('play').style.display = 'block';
	      return this.playbackReset();
	    }
	    // 停止
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.stopAnimation();
	      this.pauseTime = 0;
	      this.renderPlayed(this.pauseTime);
	      document.getElementById('play').style.display = 'block';
	      return this.playbackReset();
	    }
	    // 重新播放
	
	  }, {
	    key: 'restartPlayFrom',
	    value: function restartPlayFrom(start, end) {
	      var _this7 = this;
	
	      this.stopAnimation();
	      this.tracks.forEach(function (editor) {
	        editor.scheduleStop(editor, _this7.lastPlay);
	      });
	
	      return Promise.all(this.playoutPromises).then(this.play.bind(this, start, end));
	    }
	    // 缩放大小
	
	  }, {
	    key: 'zoom',
	    value: function zoom(zoomStyle) {
	      var index = this.zoomIndex + zoomStyle;
	      if (index < this.zoomLevels.length && index >= 0 && this.zoomBol) {
	        this.zoomIndex = index;
	        this.zoomBol = false;
	      } else {
	        return;
	      }
	      this.setZoom(this.zoomIndex);
	      this.fragController.setSamples(this.samplesPerPixel, this.sampleRate);
	      this.renderPlayed(this.pauseTime);
	      this.render();
	    }
	
	    // 加载音频并初始化显示
	
	  }, {
	    key: 'load',
	    value: function load(trackList) {
	      var _this8 = this;
	
	      if (!trackList || trackList.length === 0) {
	        this.zoomBol = true;
	        return;
	      }
	      var promiseTrack = [trackList[0]];
	      trackList.shift();
	      var loadPromises = promiseTrack.map(function (trackInfo) {
	        var loader = _LoaderFactory2.default.createLoader(trackInfo.src, _this8.ac, _this8.ee);
	        return loader.load();
	      });
	      return Promise.all(loadPromises).then(function (audioBuffers) {
	        var tracks = audioBuffers.map(function (audioBuffer, index) {
	          var info = promiseTrack[index];
	          var name = info.name || 'Untitled';
	          var cueIn = info.cuein || 0;
	          var cueOut = info.cueout || audioBuffer.duration;
	          var selection = info.selected;
	          var peaks = info.peaks || { type: 'WebAudio', mono: _this8.mono };
	          var waveOutlineColor = info.waveOutlineColor || undefined;
	          var playout = new _Playout2.default(_this8.ac, audioBuffer);
	          var track = new _Track2.default(_this8.fragDom);
	          track.src = info.src;
	          track.setBuffer(audioBuffer);
	          track.setName(name);
	          track.setCues(cueIn, cueOut);
	          track.setWaveOutlineColor(waveOutlineColor);
	          track.startTime = _this8.allTime;
	
	          if (selection !== undefined) {
	            _this8.setActiveTrack(track);
	            _this8.setTimeSelection(selection.start, selection.end);
	          }
	          if (peaks !== undefined) {
	            track.setPeakData(peaks);
	          }
	
	          track.setPlayout(playout);
	
	          track.calculatePeaks(_this8.samplesPerPixel, _this8.sampleRate);
	          return track;
	        });
	        _this8.tracks = _this8.tracks.concat(tracks);
	        _this8.adjustDuration();
	        _this8.render(trackList);
	      });
	    }
	    // 时间刻度记载
	
	  }, {
	    key: 'renderTimeScale',
	    value: function renderTimeScale() {
	      this.fragController.setAllTime(this.allTime);
	      var timeScaleArr = [];
	      var surplusTime = this.allTime;
	      while (surplusTime >= 60) {
	        surplusTime -= 60;
	        timeScaleArr.push(this.renderTime(60, timeScaleArr.length));
	      }
	      timeScaleArr.push(this.renderTime(surplusTime, timeScaleArr.length));
	      return timeScaleArr;
	    }
	  }, {
	    key: 'renderTime',
	    value: function renderTime(time, length) {
	      var controlWidth = this.controls.show ? this.controls.width : 0;
	      var timeScale = new _TimeScale2.default(time, 60 * length, this.samplesPerPixel, this.sampleRate, controlWidth);
	      return timeScale.render();
	    }
	    // 波形图绘制
	
	  }, {
	    key: 'renderTrackSection',
	    value: function renderTrackSection() {
	      var _this9 = this;
	
	      var trackElements = this.tracks.map(function (track) {
	        return track.render(_this9.samplesPerPixel, _this9.sampleRate);
	      });
	      return trackElements;
	    }
	    // 播放过音频控制
	
	  }, {
	    key: 'renderPlayed',
	    value: function renderPlayed(seconds) {
	      var played = new _PlayedHook2.default(seconds, this.samplesPerPixel, this.sampleRate, this.allTime);
	      return played.render();
	    }
	    // 加载片段框
	
	  }, {
	    key: 'renderFrag',
	    value: function renderFrag() {
	      this.fragHook = new _FragHook2.default(this.fragDom, this.formInfo, this.samplesPerPixel, this.sampleRate, this.ee);
	      this.fragHook.render();
	      this.formHook = new _FormHook2.default(this.typeArr, this.errorInfo, this.formInfo, this.samplesPerPixel, this.sampleRate, this.ee, this.markInfo);
	      this.formHook.render();
	    }
	    // 加载页面
	
	  }, {
	    key: 'render',
	    value: function render(trackList) {
	      var timeTree = this.renderTimeScale();
	      document.getElementById('timescale').innerHTML = '';
	      timeTree.forEach(function (item) {
	        var timeNode = (0, _createElement2.default)(item);
	        document.getElementById('timescale').appendChild(timeNode);
	      });
	      var canvasTree = this.renderTrackSection();
	      this.canvasDom.innerHTML = '';
	      if (canvasTree.length !== 0) {
	        for (var i = 0; i < canvasTree.length; i++) {
	          var canvasNode = (0, _createElement2.default)(canvasTree[i][0]);
	          this.canvasDom.appendChild(canvasNode);
	        }
	      }
	      this.renderFrag();
	      this.load(trackList);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
	 * @example
	 *
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	module.exports = defaults;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var createElement = __webpack_require__(22)
	
	module.exports = createElement


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(23)
	
	var applyProperties = __webpack_require__(25)
	
	var isVNode = __webpack_require__(28)
	var isVText = __webpack_require__(30)
	var isWidget = __webpack_require__(31)
	var handleThunk = __webpack_require__(32)
	
	module.exports = createElement
	
	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null
	
	    vnode = handleThunk(vnode).a
	
	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }
	
	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)
	
	    var props = vnode.properties
	    applyProperties(node, props)
	
	    var children = vnode.children
	
	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }
	
	    return node
	}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(24);
	
	var doccy;
	
	if (typeof document !== 'undefined') {
	    doccy = document;
	} else {
	    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
	
	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	}
	
	module.exports = doccy;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26)
	var isHook = __webpack_require__(27)
	
	module.exports = applyProperties
	
	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]
	
	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}
	
	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]
	
	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}
	
	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined
	
	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]
	
	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }
	
	        return
	    }
	
	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }
	
	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }
	
	    var replacer = propName === "style" ? "" : undefined
	
	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}
	
	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = isHook
	
	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var version = __webpack_require__(29)
	
	module.exports = isVirtualNode
	
	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = "2"


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var version = __webpack_require__(29)
	
	module.exports = isVirtualText
	
	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = isWidget
	
	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(28)
	var isVText = __webpack_require__(30)
	var isWidget = __webpack_require__(31)
	var isThunk = __webpack_require__(33)
	
	module.exports = handleThunk
	
	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b
	
	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }
	
	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }
	
	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}
	
	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode
	
	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }
	
	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }
	
	    return renderedThunk
	}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = isThunk
	
	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _h = __webpack_require__(35);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _conversions = __webpack_require__(47);
	
	var _TimeScaleHook = __webpack_require__(48);
	
	var _TimeScaleHook2 = _interopRequireDefault(_TimeScaleHook);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TimeScale = function () {
	  function TimeScale(duration, offset, samplesPerPixel, sampleRate) {
	    _classCallCheck(this, TimeScale);
	
	    this.duration = duration;
	    this.offset = offset;
	    this.samplesPerPixel = samplesPerPixel;
	    this.sampleRate = sampleRate;
	    this.marginLeft = 0;
	    this.timeinfo = {
	      20000: {
	        marker: 30000,
	        bigStep: 10000,
	        smallStep: 5000,
	        secondStep: 5
	      },
	      12000: {
	        marker: 15000,
	        bigStep: 5000,
	        smallStep: 1000,
	        secondStep: 1
	      },
	      10000: {
	        marker: 10000,
	        bigStep: 5000,
	        smallStep: 1000,
	        secondStep: 1
	      },
	      5000: {
	        marker: 5000,
	        bigStep: 1000,
	        smallStep: 500,
	        secondStep: 1 / 2
	      },
	      2500: {
	        marker: 2000,
	        bigStep: 1000,
	        smallStep: 500,
	        secondStep: 1 / 2
	      },
	      1500: {
	        marker: 2000,
	        bigStep: 1000,
	        smallStep: 200,
	        secondStep: 1 / 5
	      },
	      700: {
	        marker: 1000,
	        bigStep: 500,
	        smallStep: 100,
	        secondStep: 1 / 10
	      },
	      300: {
	        marker: 1000,
	        bigStep: 500,
	        smallStep: 100,
	        secondStep: 1 / 10
	      }
	    };
	  }
	
	  _createClass(TimeScale, [{
	    key: 'getScaleInfo',
	    value: function getScaleInfo(resolution) {
	      var keys = Object.keys(this.timeinfo).map(function (item) {
	        return parseInt(item, 10);
	      });
	
	      // make sure keys are numerically sorted.
	      keys = keys.sort(function (a, b) {
	        return a - b;
	      });
	
	      for (var i = 0; i < keys.length; i += 1) {
	        if (resolution <= keys[i]) {
	          return this.timeinfo[keys[i]];
	        }
	      }
	
	      return this.timeinfo[keys[0]];
	    }
	
	    /*
	      Return time in format mm:ss
	    */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var widthX = (0, _conversions.secondsToPixels)(this.duration, this.samplesPerPixel, this.sampleRate);
	      var pixPerSec = this.sampleRate / this.samplesPerPixel;
	      var pixOffset = (0, _conversions.secondsToPixels)(this.offset, this.samplesPerPixel, this.sampleRate);
	      var scaleInfo = this.getScaleInfo(this.samplesPerPixel);
	      var canvasInfo = {};
	      var timeMarkers = [];
	      var end = widthX + pixOffset;
	      var counter = 0;
	
	      for (var i = 0; i < end; i += pixPerSec * scaleInfo.secondStep) {
	        var pixIndex = Math.floor(i);
	        var pix = pixIndex - pixOffset;
	
	        if (pixIndex >= pixOffset) {
	          // put a timestamp every 30 seconds.
	          if (scaleInfo.marker && counter % scaleInfo.marker === 0) {
	            timeMarkers.push((0, _h2.default)('div.time', {
	              attributes: {
	                style: 'position: absolute; left: ' + pix + 'px;'
	              }
	            }, [TimeScale.formatTime(counter)]));
	
	            canvasInfo[pix] = 10;
	          } else if (scaleInfo.bigStep && counter % scaleInfo.bigStep === 0) {
	            canvasInfo[pix] = 5;
	          } else if (scaleInfo.smallStep && counter % scaleInfo.smallStep === 0) {
	            canvasInfo[pix] = 2;
	          }
	        }
	
	        counter += 1000 * scaleInfo.secondStep;
	      }
	      return (0, _h2.default)('div.playlist-time-scale', {
	        attributes: {
	          style: 'position: relative; left: 0; right: 0; margin-left: ' + pixOffset + 'px;'
	        }
	      }, [timeMarkers, (0, _h2.default)('canvas', {
	        attributes: {
	          width: widthX,
	          height: 30,
	          style: 'position: absolute; left: 0; right: 0; top: 0; bottom: 0;'
	        },
	        hook: new _TimeScaleHook2.default(canvasInfo, this.offset, this.samplesPerPixel, this.duration)
	      })]);
	    }
	  }], [{
	    key: 'formatTime',
	    value: function formatTime(milliseconds) {
	      var seconds = milliseconds / 1000;
	      var s = seconds % 60;
	      var m = (seconds - s) / 60;
	
	      if (s < 10) {
	        s = '0' + s;
	      }
	
	      return m + ':' + s;
	    }
	  }]);
	
	  return TimeScale;
	}();
	
	exports.default = TimeScale;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var h = __webpack_require__(36)
	
	module.exports = h


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArray = __webpack_require__(37);
	
	var VNode = __webpack_require__(38);
	var VText = __webpack_require__(39);
	var isVNode = __webpack_require__(28);
	var isVText = __webpack_require__(30);
	var isWidget = __webpack_require__(31);
	var isHook = __webpack_require__(27);
	var isVThunk = __webpack_require__(33);
	
	var parseTag = __webpack_require__(40);
	var softSetHook = __webpack_require__(42);
	var evHook = __webpack_require__(43);
	
	module.exports = h;
	
	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;
	
	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }
	
	    props = props || properties || {};
	    tag = parseTag(tagName, props);
	
	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }
	
	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }
	
	    // fix cursor bug
	    if (tag === 'INPUT' &&
	        !namespace &&
	        props.hasOwnProperty('value') &&
	        props.value !== undefined &&
	        !isHook(props.value)
	    ) {
	        props.value = softSetHook(props.value);
	    }
	
	    transformProperties(props);
	
	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }
	
	
	    return new VNode(tag, props, childNodes, key, namespace);
	}
	
	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}
	
	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];
	
	            if (isHook(value)) {
	                continue;
	            }
	
	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}
	
	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}
	
	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}
	
	function UnexpectedVirtualElement(data) {
	    var err = new Error();
	
	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' +
	        'Expected a VNode / Vthunk / VWidget / string but:\n' +
	        'got:\n' +
	        errorString(data.foreignObject) +
	        '.\n' +
	        'The parent vnode is:\n' +
	        errorString(data.parentVnode)
	        '\n' +
	        'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;
	
	    return err;
	}
	
	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString
	
	module.exports = nativeIsArray || isArray
	
	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var version = __webpack_require__(29)
	var isVNode = __webpack_require__(28)
	var isWidget = __webpack_require__(31)
	var isThunk = __webpack_require__(33)
	var isVHook = __webpack_require__(27)
	
	module.exports = VirtualNode
	
	var noProperties = {}
	var noChildren = []
	
	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null
	
	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks
	
	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }
	
	                hooks[propName] = property
	            }
	        }
	    }
	
	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0
	
	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }
	
	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }
	
	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }
	
	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}
	
	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var version = __webpack_require__(29)
	
	module.exports = VirtualText
	
	function VirtualText(text) {
	    this.text = String(text)
	}
	
	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var split = __webpack_require__(41);
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	module.exports = parseTag;
	
	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }
	
	    var noId = !(props.hasOwnProperty('id'));
	
	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;
	
	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }
	
	    var classes, part, type, i;
	
	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];
	
	        if (!part) {
	            continue;
	        }
	
	        type = part.charAt(0);
	
	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }
	
	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }
	
	        props.className = classes.join(' ');
	    }
	
	    return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = SoftSetHook;
	
	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }
	
	    this.value = value;
	}
	
	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var EvStore = __webpack_require__(44);
	
	module.exports = EvHook;
	
	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }
	
	    this.value = value;
	}
	
	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = this.value;
	};
	
	EvHook.prototype.unhook = function(node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = undefined;
	};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var OneVersionConstraint = __webpack_require__(45);
	
	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);
	
	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;
	
	module.exports = EvStore;
	
	function EvStore(elem) {
	    var hash = elem[hashKey];
	
	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }
	
	    return hash;
	}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Individual = __webpack_require__(46);
	
	module.exports = OneVersion;
	
	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';
	
	    var versionValue = Individual(enforceKey, version);
	
	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }
	
	    return Individual(key, defaultValue);
	}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*global window, global*/
	
	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};
	
	module.exports = Individual;
	
	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }
	
	    root[key] = value;
	
	    return value;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.samplesToSeconds = samplesToSeconds;
	exports.secondsToSamples = secondsToSamples;
	exports.samplesToPixels = samplesToPixels;
	exports.pixelsToSamples = pixelsToSamples;
	exports.pixelsToSeconds = pixelsToSeconds;
	exports.secondsToPixels = secondsToPixels;
	function samplesToSeconds(samples, sampleRate) {
	  return samples / sampleRate;
	}
	
	function secondsToSamples(seconds, sampleRate) {
	  return Math.ceil(seconds * sampleRate);
	}
	
	function samplesToPixels(samples, resolution) {
	  return Math.floor(samples / resolution);
	}
	
	function pixelsToSamples(pixels, resolution) {
	  return Math.floor(pixels * resolution);
	}
	
	function pixelsToSeconds(pixels, resolution, sampleRate) {
	  return pixels * resolution / sampleRate <= 0 ? 0 : pixels * resolution / sampleRate;
	}
	
	function secondsToPixels(seconds, resolution, sampleRate) {
	  return Math.ceil(seconds * sampleRate / resolution);
	}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	* virtual-dom hook for rendering the time scale canvas.
	*/
	var _class = function () {
	  function _class(tickInfo, offset, samplesPerPixel, duration) {
	    _classCallCheck(this, _class);
	
	    this.tickInfo = tickInfo;
	    this.offset = offset;
	    this.samplesPerPixel = samplesPerPixel;
	    this.duration = duration;
	  }
	
	  _createClass(_class, [{
	    key: 'hook',
	    value: function hook(canvas, prop, prev) {
	      var _this = this;
	
	      // canvas is up to date
	      if (prev !== undefined && prev.offset === this.offset && prev.duration === this.duration && prev.samplesPerPixel === this.samplesPerPixel) {
	        return;
	      }
	      var width = canvas.width;
	      var height = canvas.height;
	      var ctx = canvas.getContext('2d');
	
	      ctx.clearRect(0, 0, width, height);
	      Object.keys(this.tickInfo).forEach(function (x) {
	        var scaleHeight = _this.tickInfo[x];
	        var scaleY = height - scaleHeight;
	        ctx.fillRect(x, scaleY, 1, scaleHeight);
	      });
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _h = __webpack_require__(35);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _webaudioPeaks = __webpack_require__(50);
	
	var _webaudioPeaks2 = _interopRequireDefault(_webaudioPeaks);
	
	var _conversions = __webpack_require__(47);
	
	var _CanvasHook = __webpack_require__(51);
	
	var _CanvasHook2 = _interopRequireDefault(_CanvasHook);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_CANVAS_WIDTH = 3000;
	
	var _class = function () {
	  function _class(fragDom) {
	    _classCallCheck(this, _class);
	
	    this.startTime = 0;
	    this.endTime = 0;
	    this.fragDom = fragDom;
	    this.peakData = {
	      type: 'WebAudio',
	      mono: true
	    };
	  }
	  // 设置音频流
	
	
	  _createClass(_class, [{
	    key: 'setBuffer',
	    value: function setBuffer(buffer) {
	      this.buffer = buffer;
	    }
	    // 设置名称
	
	  }, {
	    key: 'setName',
	    value: function setName(name) {
	      this.name = name;
	    }
	    // 设置颜色配置
	
	  }, {
	    key: 'setWaveOutlineColor',
	    value: function setWaveOutlineColor(color) {
	      this.waveOutlineColor = color;
	    }
	    // 设置peakData
	
	  }, {
	    key: 'setPeakData',
	    value: function setPeakData(data) {
	      this.peakData = data;
	    }
	    // 设置playout
	
	  }, {
	    key: 'setPlayout',
	    value: function setPlayout(playout) {
	      this.playout = playout;
	    }
	    // 设置开始结束时间
	
	  }, {
	    key: 'setStartTime',
	    value: function setStartTime(start) {
	      this.startTime = start;
	      this.endTime = start + this.duration;
	    }
	    // 设置区时间
	
	  }, {
	    key: 'setCues',
	    value: function setCues(cueIn, cueOut) {
	      if (cueOut < cueIn) {
	        throw new Error('cue out cannot be less than cue in');
	      }
	      this.cueIn = cueIn;
	      this.cueOut = cueOut;
	      this.duration = this.cueOut - this.cueIn;
	      this.endTime = this.startTime + this.duration;
	    }
	    // 设置peaks
	
	  }, {
	    key: 'setPeaks',
	    value: function setPeaks(peaks) {
	      this.peaks = peaks;
	    }
	    // 获取结束时间
	
	  }, {
	    key: 'getEndTime',
	    value: function getEndTime() {
	      return this.endTime;
	    }
	    // 是否播放
	
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return this.playout.isPlaying();
	    }
	    // 播放
	
	  }, {
	    key: 'schedulePlay',
	    value: function schedulePlay(now, startTime, endTime, config, track) {
	      var defaultOptions = {
	        shouldPlay: true,
	        masterGain: 1,
	        isOffline: false
	      };
	
	      var options = (0, _lodash2.default)({}, defaultOptions, config);
	      var playoutSystem = options.isOffline ? this.offlinePlayout : this.playout;
	      var sourcePromise = playoutSystem.setUpSource();
	      playoutSystem.setVolumeGainLevel(1);
	      playoutSystem.setShouldPlay(options.shouldPlay);
	      playoutSystem.setMasterGainLevel(1);
	      playoutSystem.play(now, startTime, endTime, track);
	      return sourcePromise;
	    }
	    // 停止
	
	  }, {
	    key: 'scheduleStop',
	    value: function scheduleStop(track, now) {
	      var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	      this.playout.stop(track, now, when);
	    }
	
	    // 设置peaks
	
	  }, {
	    key: 'calculatePeaks',
	    value: function calculatePeaks(samplesPerPixel, sampleRate) {
	      this.sampleRate = sampleRate;
	      var cueIn = (0, _conversions.secondsToSamples)(this.cueIn, sampleRate);
	      var cueOut = (0, _conversions.secondsToSamples)(this.cueOut, sampleRate);
	      this.setPeaks((0, _webaudioPeaks2.default)(this.buffer, samplesPerPixel, this.peakData.mono, cueIn, cueOut));
	    }
	
	    // 构造canvas声音波形
	
	  }, {
	    key: 'render',
	    value: function render(samplesPerPixel, sampleRate) {
	      var _this = this;
	
	      var canvasWidth = this.peaks.length;
	      var canvasLeft = (0, _conversions.secondsToPixels)(this.startTime, samplesPerPixel, sampleRate);
	      var fragDomWid = (0, _conversions.secondsToPixels)(this.startTime + this.endTime, samplesPerPixel, sampleRate);
	      var canvasHeight = 300;
	      this.fragDom.style.width = fragDomWid + 'px';
	      var channels = Object.keys(this.peaks.data).map(function (channelNum) {
	        var channelChildren = [];
	        var offset = 0;
	        var totalWidth = canvasWidth;
	        var peaks = _this.peaks.data[channelNum];
	        while (totalWidth > 0) {
	          var currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
	          var canvasColor = '#373B4D';
	
	          channelChildren.push((0, _h2.default)('canvas', {
	            attributes: {
	              width: currentWidth,
	              height: canvasHeight,
	              style: 'float: left; position: relative; margin: 0; padding: 0; z-index: 3;'
	            },
	            hook: new _CanvasHook2.default(peaks, offset, _this.peaks.bits, canvasColor)
	          }));
	          totalWidth -= currentWidth;
	          offset += MAX_CANVAS_WIDTH;
	        }
	
	        return (0, _h2.default)('div.channel.channel-' + channelNum, {
	          attributes: {
	            style: 'height: ' + canvasHeight + 'px;left: ' + canvasLeft + 'px; width: ' + canvasWidth + 'px; top: ' + channelNum * canvasHeight + 'px; position: absolute; margin: 0; padding: 0; z-index: 1;border-top: 20px #373B4D solid;border-bottom: 20px #373B4D solid;'
	          }
	        }, channelChildren);
	      });
	      return channels;
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';
	
	//http://jsperf.com/typed-array-min-max/2
	//plain for loop for finding min/max is way faster than anything else.
	/**
	* @param {TypedArray} array - Subarray of audio to calculate peaks from.
	*/
	function findMinMax(array) {
	    var min = Infinity;
	    var max = -Infinity;
	    var i = 0;
	    var len = array.length;
	    var curr;
	
	    for(; i < len; i++) {
	        curr = array[i];
	        if (min > curr) {
	            min = curr;
	        }
	        if (max < curr) {
	            max = curr;
	        }
	    }
	
	    return {
	        min: min,
	        max: max
	    };
	}
	
	/**
	* @param {Number} n - peak to convert from float to Int8, Int16 etc.
	* @param {Number} bits - convert to #bits two's complement signed integer
	*/
	function convert(n, bits) {
	    var max = Math.pow(2, bits-1);
	    var v = n < 0 ? n * max : n * max - 1;
	    return Math.max(-max, Math.min(max-1, v));
	}
	
	/**
	* @param {TypedArray} channel - Audio track frames to calculate peaks from.
	* @param {Number} samplesPerPixel - Audio frames per peak
	*/
	function extractPeaks(channel, samplesPerPixel, bits) {
	    var i;
	    var chanLength = channel.length;
	    var numPeaks = Math.ceil(chanLength / samplesPerPixel);
	    var start;
	    var end;
	    var segment;
	    var max; 
	    var min;
	    var extrema;
	
	    //create interleaved array of min,max
	    var peaks = new (eval("Int"+bits+"Array"))(numPeaks*2);
	
	    for (i = 0; i < numPeaks; i++) {
	
	        start = i * samplesPerPixel;
	        end = (i + 1) * samplesPerPixel > chanLength ? chanLength : (i + 1) * samplesPerPixel;
	
	        segment = channel.subarray(start, end);
	        extrema = findMinMax(segment);
	        min = convert(extrema.min, bits);
	        max = convert(extrema.max, bits);
	
	        peaks[i*2] = min;
	        peaks[i*2+1] = max;
	    }
	
	    return peaks;
	}
	
	function makeMono(channelPeaks, bits) {
	    var numChan = channelPeaks.length;
	    var weight = 1 / numChan;
	    var numPeaks = channelPeaks[0].length / 2;
	    var c = 0;
	    var i = 0;
	    var min;
	    var max;
	    var peaks = new (eval("Int"+bits+"Array"))(numPeaks*2);
	
	    for (i = 0; i < numPeaks; i++) {
	        min = 0;
	        max = 0;
	
	        for (c = 0; c < numChan; c++) {
	            min += weight * channelPeaks[c][i*2];
	            max += weight * channelPeaks[c][i*2+1];
	        }
	
	        peaks[i*2] = min;
	        peaks[i*2+1] = max;
	    }
	
	    //return in array so channel number counts still work.
	    return [peaks];
	}
	
	/**
	* @param {AudioBuffer,TypedArray} source - Source of audio samples for peak calculations.
	* @param {Number} samplesPerPixel - Number of audio samples per peak.
	* @param {Number} cueIn - index in channel to start peak calculations from.
	* @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
	*/
	module.exports = function(source, samplesPerPixel, isMono, cueIn, cueOut, bits) {
	    samplesPerPixel = samplesPerPixel || 10000;
	    bits = bits || 8;
	    
	    if (isMono === null || isMono === undefined) {
	        isMono = true;
	    }
	
	    if ([8, 16, 32].indexOf(bits) < 0) {
	        throw new Error("Invalid number of bits specified for peaks.");
	    }
	
	    var numChan = source.numberOfChannels;
	    var peaks = [];
	    var c;
	    var numPeaks;
	    var channel;
	    var slice;
	
	    if (typeof source.subarray === "undefined") {
	        for (c = 0; c < numChan; c++) {
	            channel = source.getChannelData(c);
	            cueIn = cueIn || 0;
	            cueOut = cueOut || channel.length;
	            slice = channel.subarray(cueIn, cueOut);
	            peaks.push(extractPeaks(slice, samplesPerPixel, bits));
	        }
	    }
	    else {
	        cueIn = cueIn || 0;
	        cueOut = cueOut || source.length;
	        peaks.push(extractPeaks(source.subarray(cueIn, cueOut), samplesPerPixel, bits));
	    }
	
	    if (isMono && peaks.length > 1) {
	        peaks = makeMono(peaks, bits);
	    }
	
	    numPeaks = peaks[0].length / 2;
	
	    return {
	        length: numPeaks,
	        data: peaks,
	        bits: bits
	    };
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasHook = function () {
	  function CanvasHook(peaks, offset, bits, color) {
	    _classCallCheck(this, CanvasHook);
	
	    this.peaks = peaks;
	    this.offset = offset;
	    this.color = color;
	    this.bits = bits;
	  }
	
	  _createClass(CanvasHook, [{
	    key: 'hook',
	    value: function hook(canvas, prop, prev) {
	      // canvas is up to date
	      if (prev !== undefined && prev.peaks === this.peaks) {
	        return;
	      }
	
	      var len = canvas.width;
	      var cc = canvas.getContext('2d');
	      var h2 = canvas.height / 2;
	      var maxValue = Math.pow(2, this.bits - 1);
	      cc.clearRect(0, 0, canvas.width, canvas.height);
	      cc.fillStyle = this.color;
	      for (var i = 0; i < len; i += 1) {
	        var minPeak = this.peaks[(i + this.offset) * 2] / maxValue;
	        var maxPeak = this.peaks[(i + this.offset) * 2 + 1] / maxValue;
	        CanvasHook.drawFrame(cc, h2, i, minPeak, maxPeak);
	      }
	    }
	  }], [{
	    key: 'drawFrame',
	    value: function drawFrame(cc, h2, x, minPeak, maxPeak) {
	      var min = Math.abs(minPeak * h2);
	      var max = Math.abs(maxPeak * h2);
	      // draw max
	      cc.fillRect(x, 0, 1, h2 - max);
	      // draw min
	      cc.fillRect(x, h2 + min, 1, h2 - min);
	    }
	  }]);
	
	  return CanvasHook;
	}();
	
	exports.default = CanvasHook;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	  function _class(ac, buffer) {
	    _classCallCheck(this, _class);
	
	    this.ac = ac;
	    this.gain = 1;
	    this.buffer = buffer;
	    this.destination = this.ac.destination;
	    this.bol = false;
	  }
	
	  _createClass(_class, [{
	    key: "isPlaying",
	    value: function isPlaying() {
	      return this.source !== undefined;
	    }
	  }, {
	    key: "getDuration",
	    value: function getDuration() {
	      return this.buffer.duration;
	    }
	  }, {
	    key: "setAudioContext",
	    value: function setAudioContext(audioContext) {
	      this.ac = audioContext;
	      this.destination = this.ac.destination;
	    }
	  }, {
	    key: "setUpSource",
	    value: function setUpSource() {
	      var _this = this;
	
	      this.source = this.ac.createBufferSource();
	      this.source.buffer = this.buffer;
	
	      var sourcePromise = new Promise(function (resolve) {
	        // keep track of the buffer state.
	        _this.source.onended = function () {
	          _this.source.disconnect();
	          _this.fadeGain.disconnect();
	          _this.volumeGain.disconnect();
	          _this.shouldPlayGain.disconnect();
	          _this.masterGain.disconnect();
	
	          _this.source = undefined;
	          _this.fadeGain = undefined;
	          _this.volumeGain = undefined;
	          _this.shouldPlayGain = undefined;
	          _this.masterGain = undefined;
	
	          resolve();
	        };
	      });
	
	      this.fadeGain = this.ac.createGain();
	      // used for track volume slider
	      this.volumeGain = this.ac.createGain();
	      // used for solo/mute
	      this.shouldPlayGain = this.ac.createGain();
	      this.masterGain = this.ac.createGain();
	
	      this.source.connect(this.fadeGain);
	      this.fadeGain.connect(this.volumeGain);
	      this.volumeGain.connect(this.shouldPlayGain);
	      this.shouldPlayGain.connect(this.masterGain);
	      this.masterGain.connect(this.destination);
	
	      return sourcePromise;
	    }
	  }, {
	    key: "setVolumeGainLevel",
	    value: function setVolumeGainLevel(level) {
	      if (this.volumeGain) {
	        this.volumeGain.gain.value = level;
	      }
	    }
	  }, {
	    key: "setShouldPlay",
	    value: function setShouldPlay(bool) {
	      if (this.shouldPlayGain) {
	        this.shouldPlayGain.gain.value = bool ? 1 : 0;
	      }
	    }
	  }, {
	    key: "setMasterGainLevel",
	    value: function setMasterGainLevel(level) {
	      if (this.masterGain) {
	        this.masterGain.gain.value = level;
	      }
	    }
	
	    // whens:延时 offset 片段内部偏移量 duration 持续时间
	    // when：当前时间轴 start：开始时间 duration：持续时间 track：音频信息
	
	  }, {
	    key: "play",
	    value: function play(when, start, duration, track) {
	      var onseTime = track.startTime;
	      var playTime = when + onseTime;
	      var offset = start - onseTime <= 0 ? 0 : start - onseTime;
	      var whens = playTime - start <= 0 ? 0 : playTime - start;
	      this.source.start(whens, offset, duration);
	    }
	  }, {
	    key: "stop",
	    value: function stop(track, now) {
	      var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	
	      if (this.source) {
	        this.source.stop(when);
	      }
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _conversions = __webpack_require__(47);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlayedHook = function () {
	  function PlayedHook(seconds, samplesPerPixel, sampleRate, duration) {
	    _classCallCheck(this, PlayedHook);
	
	    this.seconds = seconds;
	    this.samplesPerPixel = samplesPerPixel;
	    this.sampleRate = sampleRate;
	    this.duration = duration;
	
	    this.oDiv0 = document.getElementById('container');
	    this.oDiv1 = document.getElementById('waveBack');
	    this.oDiv2 = document.getElementById('wavePointer');
	    this.oDiv3 = document.getElementById('played');
	  }
	
	  _createClass(PlayedHook, [{
	    key: 'render',
	    value: function render() {
	      var widthX = (0, _conversions.secondsToPixels)(this.seconds, this.samplesPerPixel, this.sampleRate);
	      var allWidth = (0, _conversions.secondsToPixels)(this.duration, this.samplesPerPixel, this.sampleRate);
	      var playedWid = widthX / allWidth;
	      this.oDiv0.scrollLeft = '' + (widthX - 400);
	      this.oDiv1.style.width = widthX + 'px';
	      this.oDiv2.style.left = widthX + 'px';
	      this.oDiv3.style.width = playedWid * 100 + '%';
	    }
	  }]);
	
	  return PlayedHook;
	}();
	
	exports.default = PlayedHook;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _conversions = __webpack_require__(47);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FragHook = function () {
	  function FragHook(fragDom, formArr, samplesPerPixel, sampleRate) {
	    _classCallCheck(this, FragHook);
	
	    this.formArr = formArr;
	    this.samplesPerPixel = samplesPerPixel;
	    this.sampleRate = sampleRate;
	    this.fragDom = fragDom;
	    this.smallNav = document.getElementById('navList');
	  }
	
	  _createClass(FragHook, [{
	    key: 'creatDom',
	    value: function creatDom(frag, index) {
	      var start = Math.min(frag.start, frag.end);
	      var end = Math.max(frag.start, frag.end);
	      var left = (0, _conversions.secondsToPixels)(start, this.samplesPerPixel, this.sampleRate);
	      var width = (0, _conversions.secondsToPixels)(end, this.samplesPerPixel, this.sampleRate) - left;
	      var state = '';
	      if (frag.extend.qualityState === '0') {
	        state = 'fragGreen';
	      } else if (frag.extend.qualityState === '1') {
	        state = 'fragRed';
	      }
	      var dom = '<div class="frag ' + state + '" style=\'left:' + left + 'px;width:' + width + 'px\' name=' + index + '></div>';
	      return dom;
	    }
	  }, {
	    key: 'creatNav',
	    value: function creatNav(frag, index) {
	      var className = 'btn';
	      if (frag.extend.qualityState === '0') {
	        className += ' green';
	      } else if (frag.extend.qualityState === '1') {
	        className += ' red';
	      }
	      if (frag.extend.change) {
	        className += ' yellow';
	      }
	      var dom = '<li class="' + className + '" name="' + index + '">' + index + '</li>';
	      return dom;
	    }
	  }, {
	    key: 'renderAdd',
	    value: function renderAdd(frag, index) {
	      var dom = this.creatDom(frag, index);
	      var nav = this.creatNav(frag, index);
	      this.fragDom.innerHTML += dom;
	      this.smallNav.innerHTML += nav;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var domAll = '';
	      var domNav = '';
	      this.formArr.forEach(function (item, index) {
	        domAll += _this.creatDom(item, index);
	        domNav += _this.creatNav(item, index);
	      });
	      this.fragDom.innerHTML = domAll;
	      this.smallNav.innerHTML = domNav;
	    }
	  }]);
	
	  return FragHook;
	}();
	
	exports.default = FragHook;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _conversions = __webpack_require__(47);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FromHook = function () {
	  function FromHook(typeArr, errorInfo, formInfo, samplesPerPixel, sampleRate, ee) {
	    var markInfo = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
	
	    _classCallCheck(this, FromHook);
	
	    this.typeArr = typeArr;
	    this.errorInfo = errorInfo;
	    this.formInfo = formInfo;
	    this.markInfo = markInfo;
	    this.samplesPerPixel = samplesPerPixel;
	    this.sampleRate = sampleRate;
	    this.ee = ee;
	
	    this.formDom = document.getElementById('formInfo');
	  }
	
	  _createClass(FromHook, [{
	    key: 'renderInput',
	    value: function renderInput(item, typeInfo, state) {
	      var checkValue = item.extend[typeInfo.sort] || '';
	      var inputDom = '<div class="form-content" style="display:' + state + '"><p>' + typeInfo.title + ':</p><input type="text" value="' + checkValue + '" class="formValue" name="' + typeInfo.sort + '"></div>';
	      return inputDom;
	    }
	  }, {
	    key: 'renderCheckbox',
	    value: function renderCheckbox(item, typeInfo, index, state) {
	      var listDom = '';
	      var checkValue = item.extend[typeInfo.sort] || [];
	      if (typeof checkValue === 'string') {
	        checkValue = checkValue.split(',');
	      }
	      typeInfo.option.forEach(function (name, indexT) {
	        var checked = '';
	        checkValue.forEach(function (check) {
	          if (check === '' + indexT) {
	            checked = 'checked';
	          }
	        });
	        listDom += '<li>\n                    <input type="checkbox" name="checkbox-' + index + '" value=\'' + indexT + '\' ' + checked + '>\n                    <label>' + name + '</label>\n                  </li>\n                ';
	      });
	      var checkboxDom = '<div class="form-content" style="display:' + state + '"><p>' + typeInfo.title + ':</p> \n                          <ul class="cd-form-list formValue" name="' + typeInfo.sort + '" type="checkbox">\n                            ' + listDom + '\n                          </ul>\n                        </div>';
	      return checkboxDom;
	    }
	  }, {
	    key: 'renderRadio',
	    value: function renderRadio(item, typeInfo, index) {
	      var listDom = '';
	      var checkValue = item.extend[typeInfo.sort] || '';
	      typeInfo.option.forEach(function (name, indexT) {
	        var checked = checkValue === '' + indexT ? 'checked' : '';
	        listDom += '<li>\n                    <input type="radio" name="radio-' + index + '" value="' + indexT + '" ' + checked + '>\n                    <label>' + name + '</label>\n                  </li>\n                ';
	      });
	      var radioDom = '<div class="form-content" name="' + typeInfo.sort + '"><p>' + typeInfo.title + ':</p>\n                          <ul class="cd-form-list formValue" type="radio" name="' + typeInfo.sort + '">\n                            ' + listDom + '\n                          </ul>\n                        </div>';
	      return radioDom;
	    }
	  }, {
	    key: 'renderSelect',
	    value: function renderSelect(item, typeInfo) {
	      var listDom = '';
	      var checkValue = item.extend[typeInfo.sort] || '';
	      typeInfo.option.forEach(function (name, indexT) {
	        var checked = checkValue === '' + indexT ? 'selected' : '';
	        listDom += '<option value=' + indexT + ' ' + checked + '>' + name + '</option>';
	      });
	      var selectDom = '<div class="form-content"><p>' + typeInfo.title + ':</p>\n                          <p class="cd-select icon">\n                            <select class="formValue" name="' + typeInfo.sort + '">\n                             ' + listDom + '\n                            </select>\n                         </p>\n                      </div>';
	      return selectDom;
	    }
	  }, {
	    key: 'qualityRender',
	    value: function qualityRender(formItem, errorInfo, index) {
	      var state = formItem.extend.qualityState == '0' ? 'none' : 'block';
	      var qualityType = { type: 'radio', sort: 'qualityState', title: '质检状态', option: ['合格', '不合格'] };
	      var errorType = { type: 'input', sort: 'errorsMessage', title: '错误信息' };
	      var qualityState = this.renderRadio(formItem, qualityType, 'qualityState' + index);
	      var errorsState = this.renderCheckbox(formItem, errorInfo, 'errorsState' + index, state);
	      var errorsMessage = this.renderInput(formItem, errorType, state);
	      var operationCase = this.markInfo.operationCase;
	      if (operationCase !== 4 && operationCase !== 32 && operationCase !== 128 && operationCase !== 256) {
	        var checkValue = formItem.extend.errorInfo || '';
	        var errorValue = '';
	        if (typeof checkValue === 'string') {
	          checkValue = checkValue.split(',');
	        }
	        checkValue.forEach(function (item) {
	          if (errorInfo.option[item]) {
	            errorValue += errorInfo.option[item] + ',';
	          }
	        });
	        var errorMes = formItem.extend.errorsMessage || '';
	        qualityState = '<div><p>\u8D28\u68C0\u72B6\u6001:</p><span>' + (qualityType.option[formItem.extend.qualityState] || '') + '</span></div>';
	        errorsState = '<div><p>\u9519\u8BEF\u7C7B\u578B:</p><span>' + errorValue + '</span></div>';
	        errorsMessage = '<div><p>\u9519\u8BEF\u4FE1\u606F:</p><span>' + errorMes + '</span></div>';
	      }
	      var qualityDom = '<div class="quality-content">\n                          ' + qualityState + '\n                          ' + errorsState + '\n                          ' + errorsMessage + '\n                        </div>';
	      return qualityDom;
	    }
	  }, {
	    key: 'creatDom',
	    value: function creatDom(formItem, index) {
	      var _this = this;
	
	      var left = (0, _conversions.secondsToPixels)(formItem.start, this.samplesPerPixel, this.sampleRate);
	      var formContent = '';
	      var qualityDom = this.qualityRender(formItem, this.errorInfo, index);
	      this.typeArr.forEach(function (typeItem) {
	        switch (typeItem.type) {
	          case 'input':
	            formContent += _this.renderInput(formItem, typeItem);
	            break;
	          case 'checkbox':
	            formContent += _this.renderCheckbox(formItem, typeItem, index);
	            break;
	          case 'radio':
	            formContent += _this.renderRadio(formItem, typeItem, index);
	            break;
	          case 'select':
	            formContent += _this.renderSelect(formItem, typeItem);
	            break;
	          default:
	            break;
	        }
	      });
	      return '<div class="form-group" style="left:' + left + 'px" name="' + index + '">\n            <div class="form-title"><h1>' + index + '</h1><h2 name="close">X</h2></div>\n            ' + formContent + '\n            ' + qualityDom + '\n            </div>';
	    }
	  }, {
	    key: 'renderAdd',
	    value: function renderAdd(form) {
	      this.formInfo = form;
	      this.render();
	      // let formContent = '';
	      // this.formInfo.forEach((formItem, index) => {
	      //   formContent += this.creatDom(formItem, index);
	      // });
	      // formContent += this.creatDom(form, indexs);
	      // this.formDom.innerHTML = formContent;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      this.ee.emit('saveFun', this.formInfo);
	      var formContent = '';
	      this.formInfo.forEach(function (formItem, index) {
	        formContent += _this2.creatDom(formItem, index);
	      });
	      this.formDom.innerHTML = '';
	      this.formDom.innerHTML = formContent;
	    }
	  }]);
	
	  return FromHook;
	}();
	
	exports.default = FromHook;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _conversions = __webpack_require__(47);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FragController = function () {
	  function FragController(ee, fragId, formInfo, samplesPerPixel, sampleRate, canmove) {
	    _classCallCheck(this, FragController);
	
	    this.ee = ee;
	    this.fragId = fragId;
	    this.formInfo = formInfo;
	    this.samplesPerPixel = samplesPerPixel;
	    this.sampleRate = sampleRate;
	    this.shortFrag = document.getElementById('shortFrag');
	    this.mouseE;
	    this.canMove = canmove;
	    this.moveEditbefore = false;
	    this.moveEditing = false;
	
	    this.downPoint = null;
	    this.creatDom = false;
	    this.selected = false;
	    this.hitPoint = false;
	    this.changeFrag = null;
	  }
	
	  _createClass(FragController, [{
	    key: 'setSamples',
	    value: function setSamples(samplesPerPixel, sampleRate) {
	      this.samplesPerPixel = samplesPerPixel;
	      this.sampleRate = sampleRate;
	    }
	  }, {
	    key: 'setAllTime',
	    value: function setAllTime(allTime) {
	      this.allTime = allTime;
	    }
	  }, {
	    key: 'setForminfo',
	    value: function setForminfo(formInfo) {
	      this.formInfo = formInfo;
	    }
	  }, {
	    key: 'setSelected',
	    value: function setSelected(selected) {
	      this.selected = selected;
	    }
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent() {
	      var _this = this;
	
	      // oncontextmenu
	      this.fragId.addEventListener('contextmenu', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        _this.rightEvent(e);
	      });
	      this.ee.on('rightEvent', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        _this.rightEvent(_this.mouseE);
	      });
	      this.fragId.addEventListener('mousedown', function (e) {
	        // 选中状态
	        // e.stopPropagation();
	        // e.preventDefault();
	        _this.moveEditbefore = _this.moveEdit(e);
	        if (e.which === 1) {
	          if (_this.selected) {
	            _this.downRightEvent(e);
	            return;
	          } else if (_this.moveEditbefore[0]) {
	            _this.moveEditing = true;
	            return;
	          }
	          _this.downEvent(e);
	        }
	      });
	      this.fragId.addEventListener('mousemove', function (e) {
	        _this.mouseE = e;
	        // 选中状态
	        e.stopPropagation();
	        e.preventDefault();
	        _this.moveEdit(e);
	        if (_this.selected) {
	          _this.moveRightEvent(e);
	          return;
	        } else if (_this.moveEditing) {
	          _this.editMoveEvent(e);
	          return;
	        }
	        if (_this.downPoint) {
	          _this.moveEvent(e);
	        }
	      });
	      this.fragId.addEventListener('mouseup', function (e) {
	        // 选中状态
	        e.stopPropagation();
	        e.preventDefault();
	        if (e.which === 3) {
	          return;
	        }
	        if (_this.selected) {
	          _this.upRightEvent();
	          return;
	        } else if (_this.moveEditing) {
	          _this.upRightEvent();
	          _this.moveEditing = false;
	          _this.moveEditbefore = false;
	          return;
	        }
	        if (_this.creatDom) {
	          _this.upEventCreat(e);
	        } else {
	          _this.upEventPlay(e);
	        }
	        _this.shortFrag.style.display = 'none';
	        _this.downPoint = null;
	        _this.creatDom = false;
	      });
	      this.fragId.addEventListener('mouseleave', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        if (e.which === 3) {
	          return;
	        }
	        // if (this.selected) {
	        //   this.upRightEvent();
	        //   return;
	        // }
	        if (_this.creatDom) {
	          _this.upEventCreat(e);
	        }
	        if (_this.moveEditing) {
	          _this.upRightEvent();
	          _this.moveEditing = false;
	          _this.moveEditbefore = false;
	          return;
	        }
	        _this.shortFrag.style.display = 'none';
	        _this.downPoint = null;
	        _this.creatDom = false;
	      });
	    }
	  }, {
	    key: 'getAttrName',
	    value: function getAttrName(e) {
	      var name = e.target.getAttribute('name');
	      return name;
	    }
	  }, {
	    key: 'setClassName',
	    value: function setClassName(e) {
	      this.clearClassName();
	      e.target.className = e.target.className + ' fragSelected';
	    }
	  }, {
	    key: 'clearClassName',
	    value: function clearClassName() {
	      var frag = document.getElementsByClassName('frag');
	      for (var i = 0; i < frag.length; i++) {
	        frag[i].className = frag[i].className.replace('fragSelected');
	      }
	    }
	  }, {
	    key: 'getMouseLeft',
	    value: function getMouseLeft(e) {
	      var canvasLeft = this.fragId.getBoundingClientRect().left;
	      var mouseLeft = e.clientX;
	      var playWidth = mouseLeft - parseFloat(canvasLeft);
	      return playWidth;
	    }
	  }, {
	    key: 'getHitPoint',
	    value: function getHitPoint(e) {
	      var canvasLeft = this.fragId.getBoundingClientRect().left;
	      var selected = this.formInfo[this.selected];
	      var mouseLeft = (0, _conversions.pixelsToSeconds)(e.clientX - parseFloat(canvasLeft), this.samplesPerPixel, this.sampleRate);
	      var pointSlected = false;
	      if (selected.end - 0.1 < mouseLeft && selected.end + 0.1 > mouseLeft) {
	        pointSlected = 'end';
	      } else if (selected.start - 0.1 < mouseLeft && selected.start + 0.1 > mouseLeft) {
	        pointSlected = 'start';
	      }
	      return pointSlected;
	    }
	  }, {
	    key: 'setShortFrag',
	    value: function setShortFrag(playWidth) {
	      var left = Math.min(playWidth, this.downPoint);
	      var right = Math.max(playWidth, this.downPoint);
	      var width = right - left;
	      this.shortFrag.style.display = 'block';
	      this.shortFrag.style.left = left + 'px';
	      this.shortFrag.style.width = width + 'px';
	    }
	  }, {
	    key: 'pointStart',
	    value: function pointStart(Point, out) {
	      var _this2 = this;
	
	      var setUp = true;
	      var points = (0, _conversions.pixelsToSeconds)(Point, this.samplesPerPixel, this.sampleRate);
	      this.formInfo.forEach(function (item, index) {
	        if (points > item.start && points < item.end && parseInt(out) !== index) {
	          setUp = false;
	        }
	        if (points <= 0 || points > _this2.allTime) {
	          setUp = false;
	        }
	      });
	      return setUp;
	    }
	  }, {
	    key: 'pointEnd',
	    value: function pointEnd(Point) {
	      var point1 = (0, _conversions.pixelsToSeconds)(this.downPoint, this.samplesPerPixel, this.sampleRate);
	      var point2 = (0, _conversions.pixelsToSeconds)(Point, this.samplesPerPixel, this.sampleRate);
	      this.formInfo.forEach(function (item) {
	        if (point1 < point2 && point1 < item.start && point2 >= item.start) {
	          point2 = item.start;
	        } else if (point1 > point2 && point1 > item.end && point2 <= item.end) {
	          point2 = item.end;
	        }
	      });
	      if (point2 > this.allTime) {
	        point2 = this.allTime;
	      }
	      return (0, _conversions.secondsToPixels)(point2, this.samplesPerPixel, this.sampleRate);
	    }
	  }, {
	    key: 'downEvent',
	    value: function downEvent(e) {
	      var playWidth = this.getMouseLeft(e);
	      if (this.pointStart(playWidth)) {
	        this.downPoint = playWidth;
	      }
	    }
	  }, {
	    key: 'moveEvent',
	    value: function moveEvent(e) {
	      var upPoint = this.pointEnd(this.getMouseLeft(e));
	      var moveWidth = upPoint - this.downPoint;
	      if (moveWidth > 5 || moveWidth < -5) {
	        this.setShortFrag(upPoint);
	        this.creatDom = true;
	      }
	    }
	  }, {
	    key: 'moveEdit',
	    value: function moveEdit(e) {
	      var fragList = document.getElementsByClassName('frag');
	      var canvasLeft = this.fragId.getBoundingClientRect().left;
	      var mouseLeft = (0, _conversions.pixelsToSeconds)(e.clientX - parseFloat(canvasLeft), this.samplesPerPixel, this.sampleRate);
	      var pointSlected = false;
	      var index = void 0;
	      for (var i = 0; i < fragList.length; i++) {
	        var name = parseInt(fragList[i].getAttribute('name'));
	        if (this.formInfo[name].end - 0.1 < mouseLeft && this.formInfo[name].end > mouseLeft) {
	          index = name;
	          pointSlected = 'end';
	        } else if (this.formInfo[name].start < mouseLeft && this.formInfo[name].start + 0.1 > mouseLeft) {
	          index = name;
	          pointSlected = 'start';
	        }
	      }
	      if (pointSlected) {
	        document.body.style.cursor = 'w-resize';
	      } else {
	        document.body.style.cursor = 'default';
	      }
	      return [pointSlected, index];
	    }
	  }, {
	    key: 'upEventPlay',
	    value: function upEventPlay(e) {
	      var name = this.getAttrName(e);
	      this.downPoint = null;
	      if (name === 'waveFrag') {
	        var upPoint = this.getMouseLeft(e);
	        var start = (0, _conversions.pixelsToSeconds)(upPoint, this.samplesPerPixel, this.sampleRate);
	        this.ee.emit('play', start);
	      } else {
	        this.ee.emit('selectdFrag', name);
	        this.ee.emit('playFrag', name);
	      }
	    }
	  }, {
	    key: 'upEventCreat',
	    value: function upEventCreat(e) {
	      var upPoint = this.pointEnd(this.getMouseLeft(e));
	      var start = Math.min(upPoint, this.downPoint);
	      var end = (0, _conversions.pixelsToSeconds)(Math.max(upPoint, this.downPoint), this.samplesPerPixel, this.sampleRate);
	      var endTime = end >= this.allTime ? this.allTime : end;
	      var frag = {
	        start: (0, _conversions.pixelsToSeconds)(start, this.samplesPerPixel, this.sampleRate),
	        end: endTime,
	        title: '',
	        extend: {}
	      };
	      this.formInfo.push(this.checkedFrag(frag, -1));
	      this.ee.emit('addFrag', this.formInfo);
	    }
	  }, {
	    key: 'rightEvent',
	    value: function rightEvent(e) {
	      var name = this.getAttrName(e);
	      if (name !== 'waveFrag') {
	        this.selected = name;
	        this.setClassName(e);
	        this.ee.emit('selectdFrag', name);
	        this.ee.emit('pause');
	      }
	    }
	  }, {
	    key: 'downRightEvent',
	    value: function downRightEvent(e) {
	      var name = this.getAttrName(e);
	      this.hitPoint = this.getHitPoint(e);
	      this.movePoint = e.clientX;
	      if (name === this.selected || this.hitPoint) {
	        // this.selected = name;
	        // console.log(this.hitPoint);
	      } else {
	        this.selected = null;
	        this.clearClassName();
	      }
	    }
	  }, {
	    key: 'editMoveEvent',
	    value: function editMoveEvent(e) {
	      var index = this.moveEditbefore[1];
	      var selectedDom = document.getElementsByClassName('frag')[index];
	      if (!selectedDom) {
	        return;
	      }
	      var left = void 0;
	      var width = void 0;
	      if (this.moveEditbefore[0] === 'end') {
	        left = window.parseFloat(selectedDom.style.left);
	        width = window.parseFloat(selectedDom.style.width) + e.movementX;
	      } else if (this.moveEditbefore[0] === 'start') {
	        left = window.parseFloat(selectedDom.style.left) + e.movementX;
	        width = window.parseFloat(selectedDom.style.width) - e.movementX;
	      }
	      if (this.pointStart(left, index) && this.pointStart(left + width, index)) {
	        selectedDom.style.left = left + 'px';
	        selectedDom.style.width = width + 'px';
	      }
	      var starts = (0, _conversions.pixelsToSeconds)(left, this.samplesPerPixel, this.sampleRate);
	      var ends = (0, _conversions.pixelsToSeconds)(left + width, this.samplesPerPixel, this.sampleRate);
	      // const newPoint = e.target.getAttribute('name');
	      // if (index !== newPoint && newPoint !== 'waveFrag') {
	      //   this.upRightEvent();
	      //   return;
	      // }
	      this.changeFrag = { start: starts, end: ends, title: this.formInfo[index].title, extend: this.formInfo[index].extend };
	    }
	  }, {
	    key: 'moveRightEvent',
	    value: function moveRightEvent(e) {
	      var selectedDom = document.getElementsByClassName('fragSelected')[0];
	      if (!selectedDom) {
	        return;
	      }
	      var left = void 0;
	      var width = void 0;
	      if (this.getHitPoint(e)) {
	        document.body.style.cursor = 'w-resize';
	      } else {
	        document.body.style.cursor = 'move';
	      }
	      if (this.movePoint) {
	        if (this.hitPoint) {
	          if (this.hitPoint === 'end') {
	            left = window.parseFloat(selectedDom.style.left);
	            width = window.parseFloat(selectedDom.style.width) + e.movementX;
	          } else if (this.hitPoint === 'start') {
	            left = window.parseFloat(selectedDom.style.left) + e.movementX;
	            width = window.parseFloat(selectedDom.style.width) - e.movementX;
	          }
	        } else if (!this.canMove) {
	          left = window.parseFloat(selectedDom.style.left) + e.movementX;
	          width = window.parseFloat(selectedDom.style.width);
	        }
	      }
	      if (this.pointStart(left, this.selected) && this.pointStart(left + width, this.selected)) {
	        selectedDom.style.left = left + 'px';
	        selectedDom.style.width = width + 'px';
	      }
	      var starts = (0, _conversions.pixelsToSeconds)(left, this.samplesPerPixel, this.sampleRate);
	      var ends = (0, _conversions.pixelsToSeconds)(left + width, this.samplesPerPixel, this.sampleRate);
	      var index = selectedDom.getAttribute('name');
	      var newPoint = e.target.getAttribute('name');
	      if (index !== newPoint && newPoint !== 'waveFrag') {
	        this.upRightEvent();
	        return;
	      }
	      this.changeFrag = { start: starts, end: ends, title: this.formInfo[index].title, extend: this.formInfo[index].extend };
	    }
	  }, {
	    key: 'upRightEvent',
	    value: function upRightEvent() {
	      if (this.changeFrag && !isNaN(this.changeFrag.start)) {
	        var selected = this.selected || this.moveEditbefore[1];
	        var frag = this.checkedFrag(this.changeFrag, selected);
	        this.ee.emit('changeFrag', frag, selected);
	        this.formInfo[selected] = this.changeFrag;
	      }
	      this.movePoint = false;
	      this.hitPoint = false;
	    }
	  }, {
	    key: 'checkedFrag',
	    value: function checkedFrag(frag, name) {
	      this.formInfo.forEach(function (item, index) {
	        var itemStart = item.start;
	        var itemEnd = item.end;
	        if (frag.start > itemStart && frag.start < itemEnd && index !== parseInt(name)) {
	          frag.start = itemEnd;
	        }
	        if (frag.end > itemStart && frag.end < itemEnd && index !== parseInt(name)) {
	          frag.end = itemStart;
	        }
	      });
	      return frag;
	    }
	  }]);
	
	  return FragController;
	}();
	
	exports.default = FragController;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FormController = function () {
	  function FormController(ee, formInfo, markInfo) {
	    _classCallCheck(this, FormController);
	
	    this.formInfo = formInfo;
	    this.markInfo = markInfo;
	    this.ee = ee;
	    this.formDom = document.getElementById('formInfo');
	    this.selected = 0;
	    this.smallNav = document.getElementById('navList');
	  }
	
	  _createClass(FormController, [{
	    key: 'setForminfo',
	    value: function setForminfo(formInfo) {
	      this.formInfo = formInfo;
	    }
	  }, {
	    key: 'getIndex',
	    value: function getIndex(target) {
	      if (target.className === 'form-group' || target.className === 'form-group form-selected') {
	        return target;
	      } else {
	        return this.getIndex(target.offsetParent);
	      }
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue(formDom) {
	      if (!formDom) {
	        return;
	      }
	      var type = formDom.type;
	      var values = '';
	      var name = formDom.getAttribute('name');
	      switch (type) {
	        case 'text':
	          values = formDom.value;
	          break;
	        case 'select-one':
	          values = formDom.options[formDom.selectedIndex].value;
	          break;
	        case 'checkbox':
	          var checkboxList = formDom.getElementsByTagName('input');
	          for (var i = 0; i < checkboxList.length; i++) {
	            if (checkboxList[i].checked) {
	              values += checkboxList[i].value + ',';
	            }
	          }
	          break;
	        case 'radio':
	          var radioList = formDom.getElementsByTagName('input');
	          for (var x in radioList) {
	            if (radioList[x].checked) {
	              values = radioList[x].value;
	            }
	          }
	          break;
	        default:
	          break;
	      }
	      return [name, values];
	    }
	  }, {
	    key: 'setClassName',
	    value: function setClassName(index) {
	      var _this = this;
	
	      this.clearClassName();
	      document.getElementById('wrap').getElementsByClassName('form-group')[index].className = 'form-group form-selected';
	      this.formDom.getElementsByClassName('form-selected')[0].onmouseleave = function () {
	        _this.addFormInfo();
	        _this.ee.emit('save', _this.formInfo);
	      };
	    }
	  }, {
	    key: 'addFormInfo',
	    value: function addFormInfo() {
	      var formSlected = this.formDom.getElementsByClassName('form-selected')[0];
	      if (!formSlected) {
	        return;
	      }
	      var name = formSlected.getAttribute('name');
	      var listDom = formSlected.getElementsByClassName('form-content');
	      this.formInfo[name].extend.formValue = [];
	      var operationCase = this.markInfo.operationCase;
	      // const operationCase = 32;
	      if (operationCase !== 4 && operationCase !== 32 && operationCase !== 128 && operationCase !== 256) {
	        var state = formSlected.getElementsByClassName('quality-content')[0].getElementsByTagName('span')[0].innerHTML;
	        if (state === '不合格' || state === '合格') {
	          this.formInfo[name].extend.change = true;
	        }
	      } else {
	        this.formInfo[name].extend.change = false;
	      }
	      for (var i = 0; i < listDom.length; i++) {
	        var formValue = this.getValue(listDom[i].getElementsByClassName('formValue')[0]);
	        this.formInfo[name].extend[formValue[0]] = formValue[1];
	      }
	    }
	  }, {
	    key: 'clearClassName',
	    value: function clearClassName() {
	      var frag = document.getElementsByClassName('form-group');
	      for (var i = 0; i < frag.length; i++) {
	        frag[i].className = 'form-group';
	      }
	    }
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent() {
	      var _this2 = this;
	
	      this.formDom.addEventListener('click', function (e) {
	        var name = e.target.getAttribute('name') || '';
	        var group = _this2.getIndex(e.target);
	        var index = group.getAttribute('name');
	        _this2.setClassName(index);
	        if (name === 'close' && _this2.selected === index) {
	          _this2.ee.emit('deleteFrag', index);
	        }
	        if (name.indexOf('qualityState') >= 0) {
	          var errorsState = document.getElementsByClassName('quality-content')[index].getElementsByClassName('form-content')[1];
	          var errorsState2 = document.getElementsByClassName('quality-content')[index].getElementsByClassName('form-content')[2];
	          var fragDom = document.getElementsByClassName('frag');
	          if (e.target.getAttribute('value') === '0') {
	            errorsState.style.display = 'none';
	            errorsState2.style.display = 'none';
	            fragDom[index].className = 'frag fragGreen';
	            _this2.smallNav.getElementsByTagName('li')[index].className = 'btn green';
	          } else if (e.target.getAttribute('value') === '1') {
	            errorsState.style.display = 'block';
	            errorsState2.style.display = 'block';
	            fragDom[index].className = 'frag fragRed';
	            _this2.smallNav.getElementsByTagName('li')[index].className = 'btn red';
	            for (var i = 0; i < errorsState.getElementsByTagName('input').length; i++) {
	              errorsState.getElementsByTagName('input')[i].checked = false;
	            }
	          }
	        }
	        _this2.selected = index;
	      });
	      this.formDom.onkeydown = function (e) {
	        switch (e.keyCode) {
	          case 32:
	            e.stopPropagation();
	            break;
	          default:
	            break;
	        }
	      };
	      // this.formDom.addEventListener('mouseleave', (e) => {
	      //   console.log(e.target);
	      //   // console.log(111)
	      //   this.addFormInfo();
	      //   this.ee.emit('save', this.formInfo);
	      // });
	      this.smallNav.addEventListener('click', function (e) {
	        var name = e.target.getAttribute('name') || '';
	        _this2.ee.emit('selectdFrag', name);
	        _this2.ee.emit('playFrag', name);
	      });
	    }
	  }]);
	
	  return FormController;
	}();
	
	exports.default = FormController;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OtherController = function () {
	  function OtherController(ee) {
	    _classCallCheck(this, OtherController);
	
	    this.ee = ee;
	    this.smallNav = document.getElementById('smallNav');
	    this.navList = document.getElementById('navList');
	  }
	
	  _createClass(OtherController, [{
	    key: 'bindEvent',
	    value: function bindEvent() {
	      var _this = this;
	
	      var next = this.smallNav.getElementsByClassName('btn')[0];
	      var pre = this.smallNav.getElementsByClassName('btn')[1];
	      pre.addEventListener('click', function (e) {
	        e.stopPropagation();
	        _this.navList.style.left = parseInt(_this.navList.style.left || 0) - 95 + '%';
	      });
	      next.addEventListener('click', function (e) {
	        e.stopPropagation();
	        var left = parseInt(_this.navList.style.left) || 0;
	        if (left >= -95) {
	          _this.navList.style.left = '0%';
	        } else {
	          _this.navList.style.left = left + 95 + '%';
	        }
	      });
	    }
	  }]);
	
	  return OtherController;
	}();
	
	exports.default = OtherController;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _XHRLoader = __webpack_require__(60);
	
	var _XHRLoader2 = _interopRequireDefault(_XHRLoader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	  }
	
	  _createClass(_class, null, [{
	    key: 'createLoader',
	    value: function createLoader(src, audioContext, ee) {
	      if (typeof src === 'string') {
	        return new _XHRLoader2.default(src, audioContext, ee);
	      }
	
	      throw new Error('Unsupported src type');
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Loader2 = __webpack_require__(61);
	
	var _Loader3 = _interopRequireDefault(_Loader2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _class = function (_Loader) {
	  _inherits(_class, _Loader);
	
	  function _class() {
	    _classCallCheck(this, _class);
	
	    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	  }
	
	  _createClass(_class, [{
	    key: 'load',
	
	
	    /**
	     * XHR加载
	     */
	    value: function load() {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', _this2.src, true);
	        xhr.responseType = 'arraybuffer';
	        xhr.send();
	
	        xhr.addEventListener('progress', function (e) {
	          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileProgress', _this2).call(_this2, e);
	        });
	
	        xhr.addEventListener('load', function (e) {
	          var decoderPromise = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileLoad', _this2).call(_this2, e);
	
	          decoderPromise.then(function (audioBuffer) {
	            resolve(audioBuffer);
	          });
	        });
	
	        xhr.addEventListener('error', function () {
	          reject(Error('Track ' + _this2.src + ' failed to load'));
	        });
	      });
	    }
	  }]);

	  return _class;
	}(_Loader3.default);

	exports.default = _class;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STATE_FINISHED = exports.STATE_DECODING = exports.STATE_LOADING = exports.STATE_UNINITIALIZED = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventEmitter = __webpack_require__(2);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STATE_UNINITIALIZED = exports.STATE_UNINITIALIZED = 0;
	var STATE_LOADING = exports.STATE_LOADING = 1;
	var STATE_DECODING = exports.STATE_DECODING = 2;
	var STATE_FINISHED = exports.STATE_FINISHED = 3;
	
	var _class = function () {
	  function _class(src, audioContext) {
	    var ee = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _eventEmitter2.default)();
	
	    _classCallCheck(this, _class);
	
	    this.src = src;
	    this.ac = audioContext;
	    this.audioRequestState = STATE_UNINITIALIZED;
	    this.ee = ee;
	  }
	
	  _createClass(_class, [{
	    key: 'setStateChange',
	    value: function setStateChange(state) {
	      this.audioRequestState = state;
	      this.ee.emit('audiorequeststatechange', this.audioRequestState, this.src);
	    }
	  }, {
	    key: 'fileProgress',
	    value: function fileProgress(e) {
	      var percentComplete = 0;
	
	      if (this.audioRequestState === STATE_UNINITIALIZED) {
	        this.setStateChange(STATE_LOADING);
	      }
	
	      if (e.lengthComputable) {
	        percentComplete = e.loaded / e.total * 100;
	      }
	      this.ee.emit('loadprogress', percentComplete, this.src);
	    }
	  }, {
	    key: 'fileLoad',
	    value: function fileLoad(e) {
	      var _this = this;
	
	      var audioData = e.target.response || e.target.result;
	      this.ee.emit('loadFirst');
	      this.setStateChange(STATE_DECODING);
	
	      return new Promise(function (resolve, reject) {
	        _this.ac.decodeAudioData(audioData, function (audioBuffer) {
	          _this.audioBuffer = audioBuffer;
	          _this.setStateChange(STATE_FINISHED);
	
	          resolve(audioBuffer);
	        }, function (err) {
	          reject(err);
	        });
	      });
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=waveGeneral.var.js.map