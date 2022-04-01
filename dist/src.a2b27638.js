// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@supabase/supabase-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = '1.33.2';
exports.version = version;
},{}],"node_modules/@supabase/supabase-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORAGE_KEY = exports.DEFAULT_HEADERS = void 0;

var _version = require("./version");

// constants.ts
const DEFAULT_HEADERS = {
  'X-Client-Info': `supabase-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const STORAGE_KEY = 'supabase.auth.token';
exports.STORAGE_KEY = STORAGE_KEY;
},{"./version":"node_modules/@supabase/supabase-js/dist/module/lib/version.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowser = void 0;
exports.stripTrailingSlash = stripTrailingSlash;
exports.uuid = uuid;

// helpers.ts
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function stripTrailingSlash(url) {
  return url.replace(/\/$/, '');
}

const isBrowser = () => typeof window !== 'undefined';

exports.isBrowser = isBrowser;
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.remove = remove;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const _getErrorMessage = err => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);

const handleError = (error, reject) => {
  if (typeof error.json !== 'function') {
    return reject(error);
  }

  error.json().then(err => {
    return reject({
      message: _getErrorMessage(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};

const _getRequestParams = (method, options, body) => {
  const params = {
    method,
    headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
  };

  if (method === 'GET') {
    return params;
  }

  params.headers = Object.assign({
    'Content-Type': 'text/plain;charset=UTF-8'
  }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return params;
};

function _handleRequest(fetcher, method, url, options, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, body)).then(result => {
        if (!result.ok) throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson) return resolve;
        return result.json();
      }).then(data => resolve(data)).catch(error => handleError(error, reject));
    });
  });
}

function get(fetcher, url, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'GET', url, options);
  });
}

function post(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'POST', url, options, body);
  });
}

function put(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'PUT', url, options, body);
  });
}

function remove(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'DELETE', url, options, body);
  });
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// generated by genversion
const version = '1.22.11';
exports.version = version;
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORAGE_KEY = exports.GOTRUE_URL = exports.EXPIRY_MARGIN = exports.DEFAULT_HEADERS = exports.COOKIE_OPTIONS = exports.AUDIENCE = void 0;

var _version = require("./version");

const GOTRUE_URL = 'http://localhost:9999';
exports.GOTRUE_URL = GOTRUE_URL;
const AUDIENCE = '';
exports.AUDIENCE = AUDIENCE;
const DEFAULT_HEADERS = {
  'X-Client-Info': `gotrue-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const EXPIRY_MARGIN = 60 * 1000;
exports.EXPIRY_MARGIN = EXPIRY_MARGIN;
const STORAGE_KEY = 'supabase.auth.token';
exports.STORAGE_KEY = STORAGE_KEY;
const COOKIE_OPTIONS = {
  name: 'sb',
  lifetime: 60 * 60 * 8,
  domain: '',
  path: '/',
  sameSite: 'lax'
};
exports.COOKIE_OPTIONS = COOKIE_OPTIONS;
},{"./version":"node_modules/@supabase/gotrue-js/dist/module/lib/version.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/cookies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCookie = deleteCookie;
exports.getCookieString = getCookieString;
exports.setCookie = setCookie;
exports.setCookies = setCookies;

/**
 * Serialize data into a cookie header.
 */
function serialize(name, val, options) {
  const opt = options || {};
  const enc = encodeURIComponent;
  /* eslint-disable-next-line no-control-regex */

  const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  const value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  let str = name + '=' + value;

  if (null != opt.maxAge) {
    const maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid');
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case 'lax':
        str += '; SameSite=Lax';
        break;

      case 'strict':
        str += '; SameSite=Strict';
        break;

      case 'none':
        str += '; SameSite=None';
        break;

      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}
/**
 * Based on the environment and the request we know if a secure cookie can be set.
 */


function isSecureEnvironment(req) {
  if (!req || !req.headers || !req.headers.host) {
    throw new Error('The "host" request header is not available');
  }

  const host = req.headers.host.indexOf(':') > -1 && req.headers.host.split(':')[0] || req.headers.host;

  if (['localhost', '127.0.0.1'].indexOf(host) > -1 || host.endsWith('.local')) {
    return false;
  }

  return true;
}
/**
 * Serialize a cookie to a string.
 */


function serializeCookie(cookie, secure) {
  var _a, _b, _c;

  return serialize(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    expires: new Date(Date.now() + cookie.maxAge * 1000),
    httpOnly: true,
    secure,
    path: (_a = cookie.path) !== null && _a !== void 0 ? _a : '/',
    domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : '',
    sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : 'lax'
  });
}
/**
 * Get Cookie Header strings.
 */


function getCookieString(req, res, cookies) {
  const strCookies = cookies.map(c => serializeCookie(c, isSecureEnvironment(req)));
  const previousCookies = res.getHeader('Set-Cookie');

  if (previousCookies) {
    if (previousCookies instanceof Array) {
      Array.prototype.push.apply(strCookies, previousCookies);
    } else if (typeof previousCookies === 'string') {
      strCookies.push(previousCookies);
    }
  }

  return strCookies;
}
/**
 * Set one or more cookies.
 */


function setCookies(req, res, cookies) {
  res.setHeader('Set-Cookie', getCookieString(req, res, cookies));
}
/**
 * Set one or more cookies.
 */


function setCookie(req, res, cookie) {
  setCookies(req, res, [cookie]);
}

function deleteCookie(req, res, name) {
  setCookie(req, res, {
    name,
    value: '',
    maxAge: -1
  });
}
},{}],"node_modules/cross-fetch/dist/browser-ponyfill.js":[function(require,module,exports) {

var global = typeof self !== 'undefined' ? self : this;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException
}
F.prototype = global;
return new F();
})();
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers
exports.Request = ctx.Request
exports.Response = ctx.Response
module.exports = exports

},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expiresAt = expiresAt;
exports.getParameterByName = getParameterByName;
exports.resolveFetch = exports.isBrowser = void 0;
exports.uuid = uuid;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1000);
  return timeNow + expiresIn;
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

const isBrowser = () => typeof window !== 'undefined';

exports.isBrowser = isBrowser;

function getParameterByName(name, url) {
  var _a;

  if (!url) url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || ''; // eslint-disable-next-line no-useless-escape

  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const resolveFetch = customFetch => {
  let _fetch;

  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = _crossFetch.default;
  } else {
    _fetch = fetch;
  }

  return (...args) => _fetch(...args);
};

exports.resolveFetch = resolveFetch;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetch = require("./lib/fetch");

var _constants = require("./lib/constants");

var _cookies = require("./lib/cookies");

var _helpers = require("./lib/helpers");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class GoTrueApi {
  constructor({
    url = '',
    headers = {},
    cookieOptions,
    fetch
  }) {
    this.url = url;
    this.headers = headers;
    this.cookieOptions = Object.assign(Object.assign({}, _constants.COOKIE_OPTIONS), cookieOptions);
    this.fetch = (0, _helpers.resolveFetch)(fetch);
  }
  /**
   * Create a temporary object with all configured headers and
   * adds the Authorization token to be used on request methods
   * @param jwt A valid, logged-in JWT.
   */


  _createRequestHeaders(jwt) {
    const headers = Object.assign({}, this.headers);
    headers['Authorization'] = `Bearer ${jwt}`;
    return headers;
  }

  cookieName() {
    var _a;

    return (_a = this.cookieOptions.name) !== null && _a !== void 0 ? _a : '';
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param provider One of the providers supported by GoTrue.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param scopes A space-separated list of scopes granted to the OAuth application.
   */


  getUrlForProvider(provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];

    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }

    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }

    return `${this.url}/authorize?${urlParams.join('&')}`;
  }
  /**
   * Creates a new user using their email address.
   * @param email The email address of the user.
   * @param password The password of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param data Optional user metadata.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */


  signUpWithEmail(email, password, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = '';

        if (options.redirectTo) {
          queryString = '?redirect_to=' + encodeURIComponent(options.redirectTo);
        }

        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/signup${queryString}`, {
          email,
          password,
          data: options.data,
          gotrue_meta_security: {
            hcaptcha_token: options.captchaToken
          }
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Logs in an existing user using their email address.
   * @param email The email address of the user.
   * @param password The password of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  signInWithEmail(email, password, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = '?grant_type=password';

        if (options.redirectTo) {
          queryString += '&redirect_to=' + encodeURIComponent(options.redirectTo);
        }

        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/token${queryString}`, {
          email,
          password
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Signs up a new user using their phone number and a password.
   * @param phone The phone number of the user.
   * @param password The password of the user.
   * @param data Optional user metadata.
   */


  signUpWithPhone(phone, password, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/signup`, {
          phone,
          password,
          data: options.data,
          gotrue_meta_security: {
            hcaptcha_token: options.captchaToken
          }
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Logs in an existing user using their phone number and password.
   * @param phone The phone number of the user.
   * @param password The password of the user.
   */


  signInWithPhone(phone, password) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const queryString = '?grant_type=password';
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/token${queryString}`, {
          phone,
          password
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Logs in an OpenID Connect user using their id_token.
   * @param id_token The IDToken of the user.
   * @param nonce The nonce of the user. The nonce is a random value generated by the developer (= yourself) before the initial grant is started. You should check the OpenID Connect specification for details. https://openid.net/developers/specs/
   * @param provider The provider of the user.
   * @param client_id The clientID of the user.
   * @param issuer The issuer of the user.
   */


  signInWithOpenIDConnect({
    id_token,
    nonce,
    client_id,
    issuer,
    provider
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const queryString = '?grant_type=id_token';
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/token${queryString}`, {
          id_token,
          nonce,
          client_id,
          issuer,
          provider
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Sends a magic login link to an email address.
   * @param email The email address of the user.
   * @param shouldCreateUser A boolean flag to indicate whether to automatically create a user on magiclink / otp sign-ins if the user doesn't exist. Defaults to true.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  sendMagicLinkEmail(email, options = {}) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = '';

        if (options.redirectTo) {
          queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
        }

        const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/otp${queryString}`, {
          email,
          create_user: shouldCreateUser,
          gotrue_meta_security: {
            hcaptcha_token: options.captchaToken
          }
        }, {
          headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Sends a mobile OTP via SMS. Will register the account if it doesn't already exist
   * @param phone The user's phone number WITH international prefix
   * @param shouldCreateUser A boolean flag to indicate whether to automatically create a user on magiclink / otp sign-ins if the user doesn't exist. Defaults to true.
   */


  sendMobileOTP(phone, options = {}) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
        const headers = Object.assign({}, this.headers);
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/otp`, {
          phone,
          create_user: shouldCreateUser,
          gotrue_meta_security: {
            hcaptcha_token: options.captchaToken
          }
        }, {
          headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   */


  signOut(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield (0, _fetch.post)(this.fetch, `${this.url}/logout`, {}, {
          headers: this._createRequestHeaders(jwt),
          noResolveJson: true
        });
        return {
          error: null
        };
      } catch (e) {
        return {
          error: e
        };
      }
    });
  }
  /**
   * @deprecated Use `verifyOTP` instead!
   * @param phone The user's phone number WITH international prefix
   * @param token token that user was sent to their mobile phone
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  verifyMobileOTP(phone, token, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/verify`, {
          phone,
          token,
          type: 'sms',
          redirect_to: options.redirectTo
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Send User supplied Email / Mobile OTP to be verified
   * @param email The user's email address
   * @param phone The user's phone number WITH international prefix
   * @param token token that user was sent to their mobile phone
   * @param type verification type that the otp is generated for
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  verifyOTP({
    email,
    phone,
    token,
    type = 'sms'
  }, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/verify`, {
          email,
          phone,
          token,
          type,
          redirect_to: options.redirectTo
        }, {
          headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param data Optional user metadata
   */


  inviteUserByEmail(email, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = '';

        if (options.redirectTo) {
          queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
        }

        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/invite${queryString}`, {
          email,
          data: options.data
        }, {
          headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Sends a reset request to an email address.
   * @param email The email address of the user.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  resetPasswordForEmail(email, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = '';

        if (options.redirectTo) {
          queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
        }

        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/recover${queryString}`, {
          email,
          gotrue_meta_security: {
            hcaptcha_token: options.captchaToken
          }
        }, {
          headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */


  refreshAccessToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/token?grant_type=refresh_token`, {
          refresh_token: refreshToken
        }, {
          headers: this.headers
        });
        const session = Object.assign({}, data);
        if (session.expires_in) session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Set/delete the auth cookie based on the AuthChangeEvent.
   * Works for Next.js & Express (requires cookie-parser middleware).
   * @param req The request object.
   * @param res The response object.
   */


  setAuthCookie(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }

    const {
      event,
      session
    } = req.body;
    if (!event) throw new Error('Auth event missing!');

    if (event === 'SIGNED_IN') {
      if (!session) throw new Error('Auth session missing!');
      (0, _cookies.setCookies)(req, res, [{
        key: 'access-token',
        value: session.access_token
      }, {
        key: 'refresh-token',
        value: session.refresh_token
      }].map(token => {
        var _a;

        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        };
      }));
    }

    if (event === 'SIGNED_OUT') {
      (0, _cookies.setCookies)(req, res, ['access-token', 'refresh-token'].map(key => ({
        name: `${this.cookieName()}-${key}`,
        value: '',
        maxAge: -1
      })));
    }

    res.status(200).json({});
  }
  /**
   * Deletes the Auth Cookies and redirects to the
   * @param req The request object.
   * @param res The response object.
   * @param options Optionally specify a `redirectTo` URL in the options.
   */


  deleteAuthCookie(req, res, {
    redirectTo = '/'
  }) {
    (0, _cookies.setCookies)(req, res, ['access-token', 'refresh-token'].map(key => ({
      name: `${this.cookieName()}-${key}`,
      value: '',
      maxAge: -1
    })));
    return res.redirect(307, redirectTo);
  }
  /**
   * Helper method to generate the Auth Cookie string for you in case you can't use `setAuthCookie`.
   * @param req The request object.
   * @param res The response object.
   * @returns The Cookie string that needs to be set as the value for the `Set-Cookie` header.
   */


  getAuthCookieString(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }

    const {
      event,
      session
    } = req.body;
    if (!event) throw new Error('Auth event missing!');

    if (event === 'SIGNED_IN') {
      if (!session) throw new Error('Auth session missing!');
      return (0, _cookies.getCookieString)(req, res, [{
        key: 'access-token',
        value: session.access_token
      }, {
        key: 'refresh-token',
        value: session.refresh_token
      }].map(token => {
        var _a;

        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        };
      }));
    }

    if (event === 'SIGNED_OUT') {
      return (0, _cookies.getCookieString)(req, res, ['access-token', 'refresh-token'].map(key => ({
        name: `${this.cookieName()}-${key}`,
        value: '',
        maxAge: -1
      })));
    }

    return res.getHeader('Set-Cookie');
  }
  /**
   * Generates links to be sent via email or other.
   * @param type The link type ("signup" or "magiclink" or "recovery" or "invite").
   * @param email The user's email.
   * @param password User password. For signup only.
   * @param data Optional user metadata. For signup only.
   * @param redirectTo The link type ("signup" or "magiclink" or "recovery" or "invite").
   */


  generateLink(type, email, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/admin/generate_link`, {
          type,
          email,
          password: options.password,
          data: options.data,
          redirect_to: options.redirectTo
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  } // User Admin API

  /**
   * Creates a new user.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   *
   * @param attributes The data you want to create the user with.
   */


  createUser(attributes) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/admin/users`, attributes, {
          headers: this.headers
        });
        return {
          user: data,
          data,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */


  listUsers() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/admin/users`, {
          headers: this.headers
        });
        return {
          data: data.users,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */


  getUserById(uid) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/admin/users/${uid}`, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Get user by reading the cookie from the request.
   * Works for Next.js & Express (requires cookie-parser middleware).
   */


  getUserByCookie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!req.cookies) {
          throw new Error('Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!');
        }

        const access_token = req.cookies[`${this.cookieName()}-access-token`];
        const refresh_token = req.cookies[`${this.cookieName()}-refresh-token`];

        if (!access_token) {
          throw new Error('No cookie found!');
        }

        const {
          user,
          error: getUserError
        } = yield this.getUser(access_token);

        if (getUserError) {
          if (!refresh_token) throw new Error('No refresh_token cookie found!');
          if (!res) throw new Error('You need to pass the res object to automatically refresh the session!');
          const {
            data,
            error
          } = yield this.refreshAccessToken(refresh_token);

          if (error) {
            throw error;
          } else if (data) {
            (0, _cookies.setCookies)(req, res, [{
              key: 'access-token',
              value: data.access_token
            }, {
              key: 'refresh-token',
              value: data.refresh_token
            }].map(token => {
              var _a;

              return {
                name: `${this.cookieName()}-${token.key}`,
                value: token.value,
                domain: this.cookieOptions.domain,
                maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
                path: this.cookieOptions.path,
                sameSite: this.cookieOptions.sameSite
              };
            }));
            return {
              token: data.access_token,
              user: data.user,
              data: data.user,
              error: null
            };
          }
        }

        return {
          token: access_token,
          user: user,
          data: user,
          error: null
        };
      } catch (e) {
        return {
          token: null,
          user: null,
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */


  updateUserById(uid, attributes) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this; //

        const data = yield (0, _fetch.put)(this.fetch, `${this.url}/admin/users/${uid}`, attributes, {
          headers: this.headers
        });
        return {
          user: data,
          data,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   *
   * @param uid The user uid you want to remove.
   */


  deleteUser(uid) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/admin/users/${uid}`, {}, {
          headers: this.headers
        });
        return {
          user: data,
          data,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Gets the current user details.
   *
   * This method is called by the GoTrueClient `update` where
   * the jwt is set to this.currentSession.access_token
   * and therefore, acts like getting the currently authenticated used
   *
   * @param jwt A valid, logged-in JWT. Typically, the access_token for the currentSession
   */


  getUser(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/user`, {
          headers: this._createRequestHeaders(jwt)
        });
        return {
          user: data,
          data,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Updates the user data.
   * @param jwt A valid, logged-in JWT.
   * @param attributes The data you want to update.
   */


  updateUser(jwt, attributes) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.put)(this.fetch, `${this.url}/user`, attributes, {
          headers: this._createRequestHeaders(jwt)
        });
        return {
          user: data,
          data,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          data: null,
          error: e
        };
      }
    });
  }

}

exports.default = GoTrueApi;
},{"./lib/fetch":"node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js","./lib/constants":"node_modules/@supabase/gotrue-js/dist/module/lib/constants.js","./lib/cookies":"node_modules/@supabase/gotrue-js/dist/module/lib/cookies.js","./lib/helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfillGlobalThis = polyfillGlobalThis;

/**
 * https://mathiasbynens.be/notes/globalthis
 */
function polyfillGlobalThis() {
  if (typeof globalThis === 'object') return;

  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // @ts-expect-error 'Allow access to magic'

    __magic__.globalThis = __magic__; // @ts-expect-error 'Allow access to magic'

    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== 'undefined') {
      // @ts-expect-error 'Allow access to globals'
      self.globalThis = self;
    }
  }
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GoTrueApi = _interopRequireDefault(require("./GoTrueApi"));

var _helpers = require("./lib/helpers");

var _constants = require("./lib/constants");

var _polyfills = require("./lib/polyfills");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

(0, _polyfills.polyfillGlobalThis)(); // Make "globalThis" available

const DEFAULT_OPTIONS = {
  url: _constants.GOTRUE_URL,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: _constants.DEFAULT_HEADERS
};

class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   * @param options.url The URL of the GoTrue server.
   * @param options.headers Any additional headers to send to the GoTrue server.
   * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.localStorage Provide your own local storage implementation to use instead of the browser's local storage.
   * @param options.multiTab Set to "false" if you want to disable multi-tab/window events.
   * @param options.cookieOptions
   * @param options.fetch A custom fetch implementation.
   */
  constructor(options) {
    this.stateChangeEmitters = new Map();
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.currentUser = null;
    this.currentSession = null;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.persistSession = settings.persistSession;
    this.multiTab = settings.multiTab;
    this.localStorage = settings.localStorage || globalThis.localStorage;
    this.api = new _GoTrueApi.default({
      url: settings.url,
      headers: settings.headers,
      cookieOptions: settings.cookieOptions,
      fetch: settings.fetch
    });

    this._recoverSession();

    this._recoverAndRefresh();

    this._listenForMultiTabEvents();

    if (settings.detectSessionInUrl && (0, _helpers.isBrowser)() && !!(0, _helpers.getParameterByName)('access_token')) {
      // Handle the OAuth redirect
      this.getSessionFromUrl({
        storeSession: true
      }).then(({
        error
      }) => {
        if (error) {
          console.error('Error getting session from URL.', error);
        }
      });
    }
  }
  /**
   * Creates a new user.
   * @type UserCredentials
   * @param email The user's email address.
   * @param password The user's password.
   * @param phone The user's phone number.
   * @param redirectTo The redirect URL attached to the signup confirmation link. Does not redirect the user if it's a mobile signup.
   * @param data Optional user metadata.
   */


  signUp({
    email,
    password,
    phone
  }, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this._removeSession();

        const {
          data,
          error
        } = phone && password ? yield this.api.signUpWithPhone(phone, password, {
          data: options.data,
          captchaToken: options.captchaToken
        }) : yield this.api.signUpWithEmail(email, password, {
          redirectTo: options.redirectTo,
          data: options.data,
          captchaToken: options.captchaToken
        });

        if (error) {
          throw error;
        }

        if (!data) {
          throw 'An error occurred on sign up.';
        }

        let session = null;
        let user = null;

        if (data.access_token) {
          session = data;
          user = session.user;

          this._saveSession(session);

          this._notifyAllSubscribers('SIGNED_IN');
        }

        if (data.id) {
          user = data;
        }

        return {
          user,
          session,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          session: null,
          error: e
        };
      }
    });
  }
  /**
   * Log in an existing user, or login via a third-party provider.
   * @type UserCredentials
   * @param email The user's email address.
   * @param phone The user's phone number.
   * @param password The user's password.
   * @param refreshToken A valid refresh token that was returned on login.
   * @param provider One of the providers supported by GoTrue.
   * @param redirectTo A URL to send the user to after they are confirmed (OAuth logins only).
   * @param shouldCreateUser A boolean flag to indicate whether to automatically create a user on magiclink / otp sign-ins if the user doesn't exist. Defaults to true.
   * @param scopes A space-separated list of scopes granted to the OAuth application.
   */


  signIn({
    email,
    phone,
    password,
    refreshToken,
    provider,
    oidc
  }, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this._removeSession();

        if (email && !password) {
          const {
            error
          } = yield this.api.sendMagicLinkEmail(email, {
            redirectTo: options.redirectTo,
            shouldCreateUser: options.shouldCreateUser,
            captchaToken: options.captchaToken
          });
          return {
            user: null,
            session: null,
            error
          };
        }

        if (email && password) {
          return this._handleEmailSignIn(email, password, {
            redirectTo: options.redirectTo
          });
        }

        if (phone && !password) {
          const {
            error
          } = yield this.api.sendMobileOTP(phone, {
            shouldCreateUser: options.shouldCreateUser,
            captchaToken: options.captchaToken
          });
          return {
            user: null,
            session: null,
            error
          };
        }

        if (phone && password) {
          return this._handlePhoneSignIn(phone, password);
        }

        if (refreshToken) {
          // currentSession and currentUser will be updated to latest on _callRefreshToken using the passed refreshToken
          const {
            error
          } = yield this._callRefreshToken(refreshToken);
          if (error) throw error;
          return {
            user: this.currentUser,
            session: this.currentSession,
            error: null
          };
        }

        if (provider) {
          return this._handleProviderSignIn(provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes
          });
        }

        if (oidc) {
          return this._handleOpenIDConnectSignIn(oidc);
        }

        throw new Error(`You must provide either an email, phone number, a third-party provider or OpenID Connect.`);
      } catch (e) {
        return {
          user: null,
          session: null,
          error: e
        };
      }
    });
  }
  /**
   * Log in a user given a User supplied OTP received via mobile.
   * @param email The user's email address.
   * @param phone The user's phone number.
   * @param token The user's password.
   * @param type The user's verification type.
   * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
   */


  verifyOTP(params, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this._removeSession();

        const {
          data,
          error
        } = yield this.api.verifyOTP(params, options);

        if (error) {
          throw error;
        }

        if (!data) {
          throw 'An error occurred on token verification.';
        }

        let session = null;
        let user = null;

        if (data.access_token) {
          session = data;
          user = session.user;

          this._saveSession(session);

          this._notifyAllSubscribers('SIGNED_IN');
        }

        if (data.id) {
          user = data;
        }

        return {
          user,
          session,
          error: null
        };
      } catch (e) {
        return {
          user: null,
          session: null,
          error: e
        };
      }
    });
  }
  /**
   * Inside a browser context, `user()` will return the user data, if there is a logged in user.
   *
   * For server-side management, you can get a user through `auth.api.getUserByCookie()`
   */


  user() {
    return this.currentUser;
  }
  /**
   * Returns the session data, if there is an active session.
   */


  session() {
    return this.currentSession;
  }
  /**
   * Force refreshes the session including the user data in case it was updated in a different session.
   */


  refreshSession() {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token)) throw new Error('Not logged in.'); // currentSession and currentUser will be updated to latest on _callRefreshToken

        const {
          error
        } = yield this._callRefreshToken();
        if (error) throw error;
        return {
          data: this.currentSession,
          user: this.currentUser,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          user: null,
          error: e
        };
      }
    });
  }
  /**
   * Updates user data, if there is a logged in user.
   */


  update(attributes) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token)) throw new Error('Not logged in.');
        const {
          user,
          error
        } = yield this.api.updateUser(this.currentSession.access_token, attributes);
        if (error) throw error;
        if (!user) throw Error('Invalid user data.');
        const session = Object.assign(Object.assign({}, this.currentSession), {
          user
        });

        this._saveSession(session);

        this._notifyAllSubscribers('USER_UPDATED');

        return {
          data: user,
          user,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          user: null,
          error: e
        };
      }
    });
  }
  /**
   * Sets the session data from refresh_token and returns current Session and Error
   * @param refresh_token a JWT token
   */


  setSession(refresh_token) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error('No current session.');
        }

        const {
          data,
          error
        } = yield this.api.refreshAccessToken(refresh_token);

        if (error) {
          return {
            session: null,
            error: error
          };
        }

        this._saveSession(data);

        this._notifyAllSubscribers('SIGNED_IN');

        return {
          session: data,
          error: null
        };
      } catch (e) {
        return {
          error: e,
          session: null
        };
      }
    });
  }
  /**
   * Overrides the JWT on the current client. The JWT will then be sent in all subsequent network requests.
   * @param access_token a jwt access token
   */


  setAuth(access_token) {
    this.currentSession = Object.assign(Object.assign({}, this.currentSession), {
      access_token,
      token_type: 'bearer',
      user: this.user()
    });
    return this.currentSession;
  }
  /**
   * Gets the session data from a URL string
   * @param options.storeSession Optionally store the session in the browser
   */


  getSessionFromUrl(options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!(0, _helpers.isBrowser)()) throw new Error('No browser detected.');
        const error_description = (0, _helpers.getParameterByName)('error_description');
        if (error_description) throw new Error(error_description);
        const provider_token = (0, _helpers.getParameterByName)('provider_token');
        const access_token = (0, _helpers.getParameterByName)('access_token');
        if (!access_token) throw new Error('No access_token detected.');
        const expires_in = (0, _helpers.getParameterByName)('expires_in');
        if (!expires_in) throw new Error('No expires_in detected.');
        const refresh_token = (0, _helpers.getParameterByName)('refresh_token');
        if (!refresh_token) throw new Error('No refresh_token detected.');
        const token_type = (0, _helpers.getParameterByName)('token_type');
        if (!token_type) throw new Error('No token_type detected.');
        const timeNow = Math.round(Date.now() / 1000);
        const expires_at = timeNow + parseInt(expires_in);
        const {
          user,
          error
        } = yield this.api.getUser(access_token);
        if (error) throw error;
        const session = {
          provider_token,
          access_token,
          expires_in: parseInt(expires_in),
          expires_at,
          refresh_token,
          token_type,
          user: user
        };

        if (options === null || options === void 0 ? void 0 : options.storeSession) {
          this._saveSession(session);

          const recoveryMode = (0, _helpers.getParameterByName)('type');

          this._notifyAllSubscribers('SIGNED_IN');

          if (recoveryMode === 'recovery') {
            this._notifyAllSubscribers('PASSWORD_RECOVERY');
          }
        } // Remove tokens from URL


        window.location.hash = '';
        return {
          data: session,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session
   * and log them out - removing all items from localstorage and then trigger a "SIGNED_OUT" event.
   *
   * For server-side management, you can disable sessions by passing a JWT through to `auth.api.signOut(JWT: string)`
   */


  signOut() {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;

      this._removeSession();

      this._notifyAllSubscribers('SIGNED_OUT');

      if (accessToken) {
        const {
          error
        } = yield this.api.signOut(accessToken);
        if (error) return {
          error
        };
      }

      return {
        error: null
      };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */


  onAuthStateChange(callback) {
    try {
      const id = (0, _helpers.uuid)();
      const subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.stateChangeEmitters.delete(id);
        }
      };
      this.stateChangeEmitters.set(id, subscription);
      return {
        data: subscription,
        error: null
      };
    } catch (e) {
      return {
        data: null,
        error: e
      };
    }
  }

  _handleEmailSignIn(email, password, options = {}) {
    var _a, _b;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          data,
          error
        } = yield this.api.signInWithEmail(email, password, {
          redirectTo: options.redirectTo
        });
        if (error || !data) return {
          data: null,
          user: null,
          session: null,
          error
        };

        if (((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) || ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.email_confirmed_at)) {
          this._saveSession(data);

          this._notifyAllSubscribers('SIGNED_IN');
        }

        return {
          data,
          user: data.user,
          session: data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          user: null,
          session: null,
          error: e
        };
      }
    });
  }

  _handlePhoneSignIn(phone, password) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          data,
          error
        } = yield this.api.signInWithPhone(phone, password);
        if (error || !data) return {
          data: null,
          user: null,
          session: null,
          error
        };

        if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.phone_confirmed_at) {
          this._saveSession(data);

          this._notifyAllSubscribers('SIGNED_IN');
        }

        return {
          data,
          user: data.user,
          session: data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          user: null,
          session: null,
          error: e
        };
      }
    });
  }

  _handleProviderSignIn(provider, options = {}) {
    const url = this.api.getUrlForProvider(provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes
    });

    try {
      // try to open on the browser
      if ((0, _helpers.isBrowser)()) {
        window.location.href = url;
      }

      return {
        provider,
        url,
        data: null,
        session: null,
        user: null,
        error: null
      };
    } catch (e) {
      // fallback to returning the URL
      if (url) return {
        provider,
        url,
        data: null,
        session: null,
        user: null,
        error: null
      };
      return {
        data: null,
        user: null,
        session: null,
        error: e
      };
    }
  }

  _handleOpenIDConnectSignIn({
    id_token,
    nonce,
    client_id,
    issuer,
    provider
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      if (id_token && nonce && (client_id && issuer || provider)) {
        try {
          const {
            data,
            error
          } = yield this.api.signInWithOpenIDConnect({
            id_token,
            nonce,
            client_id,
            issuer,
            provider
          });
          if (error || !data) return {
            user: null,
            session: null,
            error
          };

          this._saveSession(data);

          this._notifyAllSubscribers('SIGNED_IN');

          return {
            user: data.user,
            session: data,
            error: null
          };
        } catch (e) {
          return {
            user: null,
            session: null,
            error: e
          };
        }
      }

      throw new Error(`You must provide a OpenID Connect provider with your id token and nonce.`);
    });
  }
  /**
   * Attempts to get the session from LocalStorage
   * Note: this should never be async (even for React Native), as we need it to return immediately in the constructor.
   */


  _recoverSession() {
    var _a;

    try {
      const json = (0, _helpers.isBrowser)() && ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(_constants.STORAGE_KEY));

      if (!json || typeof json !== 'string') {
        return null;
      }

      const data = JSON.parse(json);
      const {
        currentSession,
        expiresAt
      } = data;
      const timeNow = Math.round(Date.now() / 1000);

      if (expiresAt >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
        this._saveSession(currentSession);

        this._notifyAllSubscribers('SIGNED_IN');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  /**
   * Recovers the session from LocalStorage and refreshes
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */


  _recoverAndRefresh() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const json = (0, _helpers.isBrowser)() && (yield this.localStorage.getItem(_constants.STORAGE_KEY));

        if (!json) {
          return null;
        }

        const data = JSON.parse(json);
        const {
          currentSession,
          expiresAt
        } = data;
        const timeNow = Math.round(Date.now() / 1000);

        if (expiresAt < timeNow) {
          if (this.autoRefreshToken && currentSession.refresh_token) {
            const {
              error
            } = yield this._callRefreshToken(currentSession.refresh_token);

            if (error) {
              console.log(error.message);
              yield this._removeSession();
            }
          } else {
            this._removeSession();
          }
        } else if (!currentSession) {
          console.log('Current session is missing data.');

          this._removeSession();
        } else {
          // should be handled on _recoverSession method already
          // But we still need the code here to accommodate for AsyncStorage e.g. in React native
          this._saveSession(currentSession);

          this._notifyAllSubscribers('SIGNED_IN');
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    });
  }

  _callRefreshToken(refresh_token) {
    var _a;

    if (refresh_token === void 0) {
      refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
    }

    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error('No current session.');
        }

        const {
          data,
          error
        } = yield this.api.refreshAccessToken(refresh_token);
        if (error) throw error;
        if (!data) throw Error('Invalid session data.');

        this._saveSession(data);

        this._notifyAllSubscribers('TOKEN_REFRESHED');

        this._notifyAllSubscribers('SIGNED_IN');

        return {
          data,
          error: null
        };
      } catch (e) {
        return {
          data: null,
          error: e
        };
      }
    });
  }

  _notifyAllSubscribers(event) {
    this.stateChangeEmitters.forEach(x => x.callback(event, this.currentSession));
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */


  _saveSession(session) {
    this.currentSession = session;
    this.currentUser = session.user;
    const expiresAt = session.expires_at;

    if (expiresAt) {
      const timeNow = Math.round(Date.now() / 1000);
      const expiresIn = expiresAt - timeNow;
      const refreshDurationBeforeExpires = expiresIn > 60 ? 60 : 0.5;

      this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1000);
    } // Do we need any extra check before persist session
    // access_token or user ?


    if (this.persistSession && session.expires_at) {
      this._persistSession(this.currentSession);
    }
  }

  _persistSession(currentSession) {
    const data = {
      currentSession,
      expiresAt: currentSession.expires_at
    };
    (0, _helpers.isBrowser)() && this.localStorage.setItem(_constants.STORAGE_KEY, JSON.stringify(data));
  }

  _removeSession() {
    return __awaiter(this, void 0, void 0, function* () {
      this.currentSession = null;
      this.currentUser = null;
      if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
      (0, _helpers.isBrowser)() && (yield this.localStorage.removeItem(_constants.STORAGE_KEY));
    });
  }
  /**
   * Clear and re-create refresh token timer
   * @param value time intervals in milliseconds
   */


  _startAutoRefreshToken(value) {
    if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
    if (value <= 0 || !this.autoRefreshToken) return;
    this.refreshTokenTimer = setTimeout(() => this._callRefreshToken(), value);
    if (typeof this.refreshTokenTimer.unref === 'function') this.refreshTokenTimer.unref();
  }
  /**
   * Listens for changes to LocalStorage and updates the current session.
   */


  _listenForMultiTabEvents() {
    if (!this.multiTab || !(0, _helpers.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      // console.debug('Auth multi-tab support is disabled.')
      return false;
    }

    try {
      window === null || window === void 0 ? void 0 : window.addEventListener('storage', e => {
        var _a;

        if (e.key === _constants.STORAGE_KEY) {
          const newSession = JSON.parse(String(e.newValue));

          if ((_a = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a === void 0 ? void 0 : _a.access_token) {
            this._recoverAndRefresh();

            this._notifyAllSubscribers('SIGNED_IN');
          } else {
            this._removeSession();

            this._notifyAllSubscribers('SIGNED_OUT');
          }
        }
      });
    } catch (error) {
      console.error('_listenForMultiTabEvents', error);
    }
  }

}

exports.default = GoTrueClient;
},{"./GoTrueApi":"node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js","./lib/helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js","./lib/constants":"node_modules/@supabase/gotrue-js/dist/module/lib/constants.js","./lib/polyfills":"node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"node_modules/@supabase/gotrue-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GoTrueApi: true,
  GoTrueClient: true
};
Object.defineProperty(exports, "GoTrueApi", {
  enumerable: true,
  get: function () {
    return _GoTrueApi.default;
  }
});
Object.defineProperty(exports, "GoTrueClient", {
  enumerable: true,
  get: function () {
    return _GoTrueClient.default;
  }
});

var _GoTrueApi = _interopRequireDefault(require("./GoTrueApi"));

var _GoTrueClient = _interopRequireDefault(require("./GoTrueClient"));

var _types = require("./lib/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./GoTrueApi":"node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js","./GoTrueClient":"node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js","./lib/types":"node_modules/@supabase/gotrue-js/dist/module/lib/types.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupabaseAuthClient = void 0;

var _gotrueJs = require("@supabase/gotrue-js");

class SupabaseAuthClient extends _gotrueJs.GoTrueClient {
  constructor(options) {
    super(options);
  }

}

exports.SupabaseAuthClient = SupabaseAuthClient;
},{"@supabase/gotrue-js":"node_modules/@supabase/gotrue-js/dist/module/index.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostgrestBuilder = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class PostgrestBuilder {
  constructor(builder) {
    Object.assign(this, builder);

    let _fetch;

    if (builder.fetch) {
      _fetch = builder.fetch;
    } else if (typeof fetch === 'undefined') {
      _fetch = _crossFetch.default;
    } else {
      _fetch = fetch;
    }

    this.fetch = (...args) => _fetch(...args);

    this.shouldThrowOnError = builder.shouldThrowOnError || false;
  }
  /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */


  throwOnError(throwOnError) {
    if (throwOnError === null || throwOnError === undefined) {
      throwOnError = true;
    }

    this.shouldThrowOnError = throwOnError;
    return this;
  }

  then(onfulfilled, onrejected) {
    // https://postgrest.org/en/stable/api.html#switching-schemas
    if (typeof this.schema === 'undefined') {// skip
    } else if (['GET', 'HEAD'].includes(this.method)) {
      this.headers['Accept-Profile'] = this.schema;
    } else {
      this.headers['Content-Profile'] = this.schema;
    }

    if (this.method !== 'GET' && this.method !== 'HEAD') {
      this.headers['Content-Type'] = 'application/json';
    }

    let res = this.fetch(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(res => __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c;

      let error = null;
      let data = null;
      let count = null;

      if (res.ok) {
        const isReturnMinimal = (_a = this.headers['Prefer']) === null || _a === void 0 ? void 0 : _a.split(',').includes('return=minimal');

        if (this.method !== 'HEAD' && !isReturnMinimal) {
          const text = yield res.text();

          if (!text) {// discard `text`
          } else if (this.headers['Accept'] === 'text/csv') {
            data = text;
          } else {
            data = JSON.parse(text);
          }
        }

        const countHeader = (_b = this.headers['Prefer']) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
        const contentRange = (_c = res.headers.get('content-range')) === null || _c === void 0 ? void 0 : _c.split('/');

        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
      } else {
        const body = yield res.text();

        try {
          error = JSON.parse(body);
        } catch (_d) {
          error = {
            message: body
          };
        }

        if (error && this.shouldThrowOnError) {
          throw error;
        }
      }

      const postgrestResponse = {
        error,
        data,
        count,
        status: res.status,
        statusText: res.statusText,
        body: data
      };
      return postgrestResponse;
    }));

    if (!this.shouldThrowOnError) {
      res = res.catch(fetchError => ({
        error: {
          message: `FetchError: ${fetchError.message}`,
          details: '',
          hint: '',
          code: fetchError.code || ''
        },
        data: null,
        body: null,
        count: null,
        status: 400,
        statusText: 'Bad Request'
      }));
    }

    return res.then(onfulfilled, onrejected);
  }

}

exports.PostgrestBuilder = PostgrestBuilder;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestTransformBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("./types");

/**
 * Post-filters (transforms)
 */
class PostgrestTransformBuilder extends _types.PostgrestBuilder {
  /**
   * Performs vertical filtering with SELECT.
   *
   * @param columns  The columns to retrieve, separated by commas.
   */
  select(columns = '*') {
    // Remove whitespaces except when quoted
    let quoted = false;
    const cleanedColumns = columns.split('').map(c => {
      if (/\s/.test(c) && !quoted) {
        return '';
      }

      if (c === '"') {
        quoted = !quoted;
      }

      return c;
    }).join('');
    this.url.searchParams.set('select', cleanedColumns);
    return this;
  }
  /**
   * Orders the result with the specified `column`.
   *
   * @param column  The column to order on.
   * @param ascending  If `true`, the result will be in ascending order.
   * @param nullsFirst  If `true`, `null`s appear first.
   * @param foreignTable  The foreign table to use (if `column` is a foreign column).
   */


  order(column, {
    ascending = true,
    nullsFirst = false,
    foreignTable
  } = {}) {
    const key = typeof foreignTable === 'undefined' ? 'order' : `${foreignTable}.order`;
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ''}${column}.${ascending ? 'asc' : 'desc'}.${nullsFirst ? 'nullsfirst' : 'nullslast'}`);
    return this;
  }
  /**
   * Limits the result with the specified `count`.
   *
   * @param count  The maximum no. of rows to limit to.
   * @param foreignTable  The foreign table to use (for foreign columns).
   */


  limit(count, {
    foreignTable
  } = {}) {
    const key = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
    this.url.searchParams.set(key, `${count}`);
    return this;
  }
  /**
   * Limits the result to rows within the specified range, inclusive.
   *
   * @param from  The starting index from which to limit the result, inclusive.
   * @param to  The last index to which to limit the result, inclusive.
   * @param foreignTable  The foreign table to use (for foreign columns).
   */


  range(from, to, {
    foreignTable
  } = {}) {
    const keyOffset = typeof foreignTable === 'undefined' ? 'offset' : `${foreignTable}.offset`;
    const keyLimit = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`); // Range is inclusive, so add 1

    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  /**
   * Sets the AbortSignal for the fetch request.
   */


  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  /**
   * Retrieves only one row from the result. Result must be one row (e.g. using
   * `limit`), otherwise this will result in an error.
   */


  single() {
    this.headers['Accept'] = 'application/vnd.pgrst.object+json';
    return this;
  }
  /**
   * Retrieves at most one row from the result. Result must be at most one row
   * (e.g. using `eq` on a UNIQUE column), otherwise this will result in an
   * error.
   */


  maybeSingle() {
    this.headers['Accept'] = 'application/vnd.pgrst.object+json';

    const _this = new PostgrestTransformBuilder(this);

    _this.then = (onfulfilled, onrejected) => this.then(res => {
      var _a, _b;

      if ((_b = (_a = res.error) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.includes('Results contain 0 rows')) {
        return onfulfilled({
          error: null,
          data: null,
          count: res.count,
          status: 200,
          statusText: 'OK',
          body: null
        });
      }

      return onfulfilled(res);
    }, onrejected);

    return _this;
  }
  /**
   * Set the response type to CSV.
   */


  csv() {
    this.headers['Accept'] = 'text/csv';
    return this;
  }

}

exports.default = PostgrestTransformBuilder;
},{"./types":"node_modules/@supabase/postgrest-js/dist/module/lib/types.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PostgrestTransformBuilder = _interopRequireDefault(require("./PostgrestTransformBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgrestFilterBuilder extends _PostgrestTransformBuilder.default {
  constructor() {
    super(...arguments);
    /** @deprecated Use `contains()` instead. */

    this.cs = this.contains;
    /** @deprecated Use `containedBy()` instead. */

    this.cd = this.containedBy;
    /** @deprecated Use `rangeLt()` instead. */

    this.sl = this.rangeLt;
    /** @deprecated Use `rangeGt()` instead. */

    this.sr = this.rangeGt;
    /** @deprecated Use `rangeGte()` instead. */

    this.nxl = this.rangeGte;
    /** @deprecated Use `rangeLte()` instead. */

    this.nxr = this.rangeLte;
    /** @deprecated Use `rangeAdjacent()` instead. */

    this.adj = this.rangeAdjacent;
    /** @deprecated Use `overlaps()` instead. */

    this.ov = this.overlaps;
  }
  /**
   * Finds all rows which doesn't satisfy the filter.
   *
   * @param column  The column to filter on.
   * @param operator  The operator to filter with.
   * @param value  The value to filter with.
   */


  not(column, operator, value) {
    this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
    return this;
  }
  /**
   * Finds all rows satisfying at least one of the filters.
   *
   * @param filters  The filters to use, separated by commas.
   * @param foreignTable  The foreign table to use (if `column` is a foreign column).
   */


  or(filters, {
    foreignTable
  } = {}) {
    const key = typeof foreignTable === 'undefined' ? 'or' : `${foreignTable}.or`;
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` exactly matches the
   * specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  eq(column, value) {
    this.url.searchParams.append(`${column}`, `eq.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` doesn't match the
   * specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  neq(column, value) {
    this.url.searchParams.append(`${column}`, `neq.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` is greater than the
   * specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  gt(column, value) {
    this.url.searchParams.append(`${column}`, `gt.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` is greater than or
   * equal to the specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  gte(column, value) {
    this.url.searchParams.append(`${column}`, `gte.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` is less than the
   * specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  lt(column, value) {
    this.url.searchParams.append(`${column}`, `lt.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` is less than or equal
   * to the specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  lte(column, value) {
    this.url.searchParams.append(`${column}`, `lte.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value in the stated `column` matches the supplied
   * `pattern` (case sensitive).
   *
   * @param column  The column to filter on.
   * @param pattern  The pattern to filter with.
   */


  like(column, pattern) {
    this.url.searchParams.append(`${column}`, `like.${pattern}`);
    return this;
  }
  /**
   * Finds all rows whose value in the stated `column` matches the supplied
   * `pattern` (case insensitive).
   *
   * @param column  The column to filter on.
   * @param pattern  The pattern to filter with.
   */


  ilike(column, pattern) {
    this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
    return this;
  }
  /**
   * A check for exact equality (null, true, false), finds all rows whose
   * value on the stated `column` exactly match the specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  is(column, value) {
    this.url.searchParams.append(`${column}`, `is.${value}`);
    return this;
  }
  /**
   * Finds all rows whose value on the stated `column` is found on the
   * specified `values`.
   *
   * @param column  The column to filter on.
   * @param values  The values to filter with.
   */


  in(column, values) {
    const cleanedValues = values.map(s => {
      // handle postgrest reserved characters
      // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
      if (typeof s === 'string' && new RegExp('[,()]').test(s)) return `"${s}"`;else return `${s}`;
    }).join(',');
    this.url.searchParams.append(`${column}`, `in.(${cleanedValues})`);
    return this;
  }
  /**
   * Finds all rows whose json, array, or range value on the stated `column`
   * contains the values specified in `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  contains(column, value) {
    if (typeof value === 'string') {
      // range types can be inclusive '[', ']' or exclusive '(', ')' so just
      // keep it simple and accept a string
      this.url.searchParams.append(`${column}`, `cs.${value}`);
    } else if (Array.isArray(value)) {
      // array
      this.url.searchParams.append(`${column}`, `cs.{${value.join(',')}}`);
    } else {
      // json
      this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
    }

    return this;
  }
  /**
   * Finds all rows whose json, array, or range value on the stated `column` is
   * contained by the specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  containedBy(column, value) {
    if (typeof value === 'string') {
      // range
      this.url.searchParams.append(`${column}`, `cd.${value}`);
    } else if (Array.isArray(value)) {
      // array
      this.url.searchParams.append(`${column}`, `cd.{${value.join(',')}}`);
    } else {
      // json
      this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
    }

    return this;
  }
  /**
   * Finds all rows whose range value on the stated `column` is strictly to the
   * left of the specified `range`.
   *
   * @param column  The column to filter on.
   * @param range  The range to filter with.
   */


  rangeLt(column, range) {
    this.url.searchParams.append(`${column}`, `sl.${range}`);
    return this;
  }
  /**
   * Finds all rows whose range value on the stated `column` is strictly to
   * the right of the specified `range`.
   *
   * @param column  The column to filter on.
   * @param range  The range to filter with.
   */


  rangeGt(column, range) {
    this.url.searchParams.append(`${column}`, `sr.${range}`);
    return this;
  }
  /**
   * Finds all rows whose range value on the stated `column` does not extend
   * to the left of the specified `range`.
   *
   * @param column  The column to filter on.
   * @param range  The range to filter with.
   */


  rangeGte(column, range) {
    this.url.searchParams.append(`${column}`, `nxl.${range}`);
    return this;
  }
  /**
   * Finds all rows whose range value on the stated `column` does not extend
   * to the right of the specified `range`.
   *
   * @param column  The column to filter on.
   * @param range  The range to filter with.
   */


  rangeLte(column, range) {
    this.url.searchParams.append(`${column}`, `nxr.${range}`);
    return this;
  }
  /**
   * Finds all rows whose range value on the stated `column` is adjacent to
   * the specified `range`.
   *
   * @param column  The column to filter on.
   * @param range  The range to filter with.
   */


  rangeAdjacent(column, range) {
    this.url.searchParams.append(`${column}`, `adj.${range}`);
    return this;
  }
  /**
   * Finds all rows whose array or range value on the stated `column` overlaps
   * (has a value in common) with the specified `value`.
   *
   * @param column  The column to filter on.
   * @param value  The value to filter with.
   */


  overlaps(column, value) {
    if (typeof value === 'string') {
      // range
      this.url.searchParams.append(`${column}`, `ov.${value}`);
    } else {
      // array
      this.url.searchParams.append(`${column}`, `ov.{${value.join(',')}}`);
    }

    return this;
  }
  /**
   * Finds all rows whose text or tsvector value on the stated `column` matches
   * the tsquery in `query`.
   *
   * @param column  The column to filter on.
   * @param query  The Postgres tsquery string to filter with.
   * @param config  The text search configuration to use.
   * @param type  The type of tsquery conversion to use on `query`.
   */


  textSearch(column, query, {
    config,
    type = null
  } = {}) {
    let typePart = '';

    if (type === 'plain') {
      typePart = 'pl';
    } else if (type === 'phrase') {
      typePart = 'ph';
    } else if (type === 'websearch') {
      typePart = 'w';
    }

    const configPart = config === undefined ? '' : `(${config})`;
    this.url.searchParams.append(`${column}`, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  /**
   * Finds all rows whose tsvector value on the stated `column` matches
   * to_tsquery(`query`).
   *
   * @param column  The column to filter on.
   * @param query  The Postgres tsquery string to filter with.
   * @param config  The text search configuration to use.
   *
   * @deprecated Use `textSearch()` instead.
   */


  fts(column, query, {
    config
  } = {}) {
    const configPart = typeof config === 'undefined' ? '' : `(${config})`;
    this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
    return this;
  }
  /**
   * Finds all rows whose tsvector value on the stated `column` matches
   * plainto_tsquery(`query`).
   *
   * @param column  The column to filter on.
   * @param query  The Postgres tsquery string to filter with.
   * @param config  The text search configuration to use.
   *
   * @deprecated Use `textSearch()` with `type: 'plain'` instead.
   */


  plfts(column, query, {
    config
  } = {}) {
    const configPart = typeof config === 'undefined' ? '' : `(${config})`;
    this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
    return this;
  }
  /**
   * Finds all rows whose tsvector value on the stated `column` matches
   * phraseto_tsquery(`query`).
   *
   * @param column  The column to filter on.
   * @param query  The Postgres tsquery string to filter with.
   * @param config  The text search configuration to use.
   *
   * @deprecated Use `textSearch()` with `type: 'phrase'` instead.
   */


  phfts(column, query, {
    config
  } = {}) {
    const configPart = typeof config === 'undefined' ? '' : `(${config})`;
    this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
    return this;
  }
  /**
   * Finds all rows whose tsvector value on the stated `column` matches
   * websearch_to_tsquery(`query`).
   *
   * @param column  The column to filter on.
   * @param query  The Postgres tsquery string to filter with.
   * @param config  The text search configuration to use.
   *
   * @deprecated Use `textSearch()` with `type: 'websearch'` instead.
   */


  wfts(column, query, {
    config
  } = {}) {
    const configPart = typeof config === 'undefined' ? '' : `(${config})`;
    this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
    return this;
  }
  /**
   * Finds all rows whose `column` satisfies the filter.
   *
   * @param column  The column to filter on.
   * @param operator  The operator to filter with.
   * @param value  The value to filter with.
   */


  filter(column, operator, value) {
    this.url.searchParams.append(`${column}`, `${operator}.${value}`);
    return this;
  }
  /**
   * Finds all rows whose columns match the specified `query` object.
   *
   * @param query  The object to filter with, with column names as keys mapped
   *               to their filter values.
   */


  match(query) {
    Object.keys(query).forEach(key => {
      this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
    });
    return this;
  }

}

exports.default = PostgrestFilterBuilder;
},{"./PostgrestTransformBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestTransformBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("./types");

var _PostgrestFilterBuilder = _interopRequireDefault(require("./PostgrestFilterBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgrestQueryBuilder extends _types.PostgrestBuilder {
  constructor(url, {
    headers = {},
    schema,
    fetch,
    shouldThrowOnError
  } = {}) {
    super({
      fetch,
      shouldThrowOnError
    });
    this.url = new URL(url);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  /**
   * Performs vertical filtering with SELECT.
   *
   * @param columns  The columns to retrieve, separated by commas.
   * @param head  When set to true, select will void data.
   * @param count  Count algorithm to use to count rows in a table.
   */


  select(columns = '*', {
    head = false,
    count = null
  } = {}) {
    this.method = 'GET'; // Remove whitespaces except when quoted

    let quoted = false;
    const cleanedColumns = columns.split('').map(c => {
      if (/\s/.test(c) && !quoted) {
        return '';
      }

      if (c === '"') {
        quoted = !quoted;
      }

      return c;
    }).join('');
    this.url.searchParams.set('select', cleanedColumns);

    if (count) {
      this.headers['Prefer'] = `count=${count}`;
    }

    if (head) {
      this.method = 'HEAD';
    }

    return new _PostgrestFilterBuilder.default(this);
  }

  insert(values, {
    upsert = false,
    onConflict,
    returning = 'representation',
    count = null
  } = {}) {
    this.method = 'POST';
    const prefersHeaders = [`return=${returning}`];
    if (upsert) prefersHeaders.push('resolution=merge-duplicates');
    if (upsert && onConflict !== undefined) this.url.searchParams.set('on_conflict', onConflict);
    this.body = values;

    if (count) {
      prefersHeaders.push(`count=${count}`);
    }

    if (this.headers['Prefer']) {
      prefersHeaders.unshift(this.headers['Prefer']);
    }

    this.headers['Prefer'] = prefersHeaders.join(',');

    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);

      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map(column => `"${column}"`);
        this.url.searchParams.set('columns', uniqueColumns.join(','));
      }
    }

    return new _PostgrestFilterBuilder.default(this);
  }
  /**
   * Performs an UPSERT into the table.
   *
   * @param values  The values to insert.
   * @param onConflict  By specifying the `on_conflict` query parameter, you can make UPSERT work on a column(s) that has a UNIQUE constraint.
   * @param returning  By default the new record is returned. Set this to 'minimal' if you don't need this value.
   * @param count  Count algorithm to use to count rows in a table.
   * @param ignoreDuplicates  Specifies if duplicate rows should be ignored and not inserted.
   */


  upsert(values, {
    onConflict,
    returning = 'representation',
    count = null,
    ignoreDuplicates = false
  } = {}) {
    this.method = 'POST';
    const prefersHeaders = [`resolution=${ignoreDuplicates ? 'ignore' : 'merge'}-duplicates`, `return=${returning}`];
    if (onConflict !== undefined) this.url.searchParams.set('on_conflict', onConflict);
    this.body = values;

    if (count) {
      prefersHeaders.push(`count=${count}`);
    }

    if (this.headers['Prefer']) {
      prefersHeaders.unshift(this.headers['Prefer']);
    }

    this.headers['Prefer'] = prefersHeaders.join(',');
    return new _PostgrestFilterBuilder.default(this);
  }
  /**
   * Performs an UPDATE on the table.
   *
   * @param values  The values to update.
   * @param returning  By default the updated record is returned. Set this to 'minimal' if you don't need this value.
   * @param count  Count algorithm to use to count rows in a table.
   */


  update(values, {
    returning = 'representation',
    count = null
  } = {}) {
    this.method = 'PATCH';
    const prefersHeaders = [`return=${returning}`];
    this.body = values;

    if (count) {
      prefersHeaders.push(`count=${count}`);
    }

    if (this.headers['Prefer']) {
      prefersHeaders.unshift(this.headers['Prefer']);
    }

    this.headers['Prefer'] = prefersHeaders.join(',');
    return new _PostgrestFilterBuilder.default(this);
  }
  /**
   * Performs a DELETE on the table.
   *
   * @param returning  If `true`, return the deleted row(s) in the response.
   * @param count  Count algorithm to use to count rows in a table.
   */


  delete({
    returning = 'representation',
    count = null
  } = {}) {
    this.method = 'DELETE';
    const prefersHeaders = [`return=${returning}`];

    if (count) {
      prefersHeaders.push(`count=${count}`);
    }

    if (this.headers['Prefer']) {
      prefersHeaders.unshift(this.headers['Prefer']);
    }

    this.headers['Prefer'] = prefersHeaders.join(',');
    return new _PostgrestFilterBuilder.default(this);
  }

}

exports.default = PostgrestQueryBuilder;
},{"./types":"node_modules/@supabase/postgrest-js/dist/module/lib/types.js","./PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestRpcBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("./types");

var _PostgrestFilterBuilder = _interopRequireDefault(require("./PostgrestFilterBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgrestRpcBuilder extends _types.PostgrestBuilder {
  constructor(url, {
    headers = {},
    schema,
    fetch,
    shouldThrowOnError
  } = {}) {
    super({
      fetch,
      shouldThrowOnError
    });
    this.url = new URL(url);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  /**
   * Perform a function call.
   */


  rpc(params, {
    head = false,
    count = null
  } = {}) {
    if (head) {
      this.method = 'HEAD';

      if (params) {
        Object.entries(params).forEach(([name, value]) => {
          this.url.searchParams.append(name, value);
        });
      }
    } else {
      this.method = 'POST';
      this.body = params;
    }

    if (count) {
      if (this.headers['Prefer'] !== undefined) this.headers['Prefer'] += `,count=${count}`;else this.headers['Prefer'] = `count=${count}`;
    }

    return new _PostgrestFilterBuilder.default(this);
  }

}

exports.default = PostgrestRpcBuilder;
},{"./types":"node_modules/@supabase/postgrest-js/dist/module/lib/types.js","./PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// generated by genversion
const version = '0.37.2';
exports.version = version;
},{}],"node_modules/@supabase/postgrest-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_HEADERS = void 0;

var _version = require("./version");

const DEFAULT_HEADERS = {
  'X-Client-Info': `postgrest-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
},{"./version":"node_modules/@supabase/postgrest-js/dist/module/lib/version.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PostgrestQueryBuilder = _interopRequireDefault(require("./lib/PostgrestQueryBuilder"));

var _PostgrestRpcBuilder = _interopRequireDefault(require("./lib/PostgrestRpcBuilder"));

var _constants = require("./lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgrestClient {
  /**
   * Creates a PostgREST client.
   *
   * @param url  URL of the PostgREST endpoint.
   * @param headers  Custom headers.
   * @param schema  Postgres schema to switch to.
   */
  constructor(url, {
    headers = {},
    schema,
    fetch,
    throwOnError
  } = {}) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, _constants.DEFAULT_HEADERS), headers);
    this.schema = schema;
    this.fetch = fetch;
    this.shouldThrowOnError = throwOnError;
  }
  /**
   * Authenticates the request with JWT.
   *
   * @param token  The JWT token to use.
   */


  auth(token) {
    this.headers['Authorization'] = `Bearer ${token}`;
    return this;
  }
  /**
   * Perform a table operation.
   *
   * @param table  The table name to operate on.
   */


  from(table) {
    const url = `${this.url}/${table}`;
    return new _PostgrestQueryBuilder.default(url, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head  When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   */


  rpc(fn, params, {
    head = false,
    count = null
  } = {}) {
    const url = `${this.url}/rpc/${fn}`;
    return new _PostgrestRpcBuilder.default(url, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    }).rpc(params, {
      head,
      count
    });
  }

}

exports.default = PostgrestClient;
},{"./lib/PostgrestQueryBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js","./lib/PostgrestRpcBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestRpcBuilder.js","./lib/constants":"node_modules/@supabase/postgrest-js/dist/module/lib/constants.js"}],"node_modules/@supabase/postgrest-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PostgrestBuilder", {
  enumerable: true,
  get: function () {
    return _types.PostgrestBuilder;
  }
});
Object.defineProperty(exports, "PostgrestClient", {
  enumerable: true,
  get: function () {
    return _PostgrestClient.default;
  }
});
Object.defineProperty(exports, "PostgrestFilterBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestFilterBuilder.default;
  }
});
Object.defineProperty(exports, "PostgrestQueryBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestQueryBuilder.default;
  }
});

var _PostgrestClient = _interopRequireDefault(require("./PostgrestClient"));

var _PostgrestFilterBuilder = _interopRequireDefault(require("./lib/PostgrestFilterBuilder"));

var _PostgrestQueryBuilder = _interopRequireDefault(require("./lib/PostgrestQueryBuilder"));

var _types = require("./lib/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./PostgrestClient":"node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js","./lib/PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js","./lib/PostgrestQueryBuilder":"node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js","./lib/types":"node_modules/@supabase/postgrest-js/dist/module/lib/types.js"}],"node_modules/@supabase/realtime-js/dist/module/lib/transformers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTimestampString = exports.toNumber = exports.toJson = exports.toBoolean = exports.toArray = exports.convertColumn = exports.convertChangeData = exports.convertCell = exports.PostgresTypes = void 0;

/**
 * Helpers to convert the change Payload into native JS types.
 */
// Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
exports.PostgresTypes = PostgresTypes;

(function (PostgresTypes) {
  PostgresTypes["abstime"] = "abstime";
  PostgresTypes["bool"] = "bool";
  PostgresTypes["date"] = "date";
  PostgresTypes["daterange"] = "daterange";
  PostgresTypes["float4"] = "float4";
  PostgresTypes["float8"] = "float8";
  PostgresTypes["int2"] = "int2";
  PostgresTypes["int4"] = "int4";
  PostgresTypes["int4range"] = "int4range";
  PostgresTypes["int8"] = "int8";
  PostgresTypes["int8range"] = "int8range";
  PostgresTypes["json"] = "json";
  PostgresTypes["jsonb"] = "jsonb";
  PostgresTypes["money"] = "money";
  PostgresTypes["numeric"] = "numeric";
  PostgresTypes["oid"] = "oid";
  PostgresTypes["reltime"] = "reltime";
  PostgresTypes["text"] = "text";
  PostgresTypes["time"] = "time";
  PostgresTypes["timestamp"] = "timestamp";
  PostgresTypes["timestamptz"] = "timestamptz";
  PostgresTypes["timetz"] = "timetz";
  PostgresTypes["tsrange"] = "tsrange";
  PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (exports.PostgresTypes = PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */


const convertChangeData = (columns, record, options = {}) => {
  var _a;

  const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */


exports.convertChangeData = convertChangeData;

const convertColumn = (columnName, columns, record, skipTypes) => {
  const column = columns.find(x => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record[columnName];

  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }

  return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} stringValue The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */


exports.convertColumn = convertColumn;

const convertCell = (type, value) => {
  // if data type is an array
  if (type.charAt(0) === '_') {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  } // If not null, convert to correct type.


  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);

    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);

    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);

    case PostgresTypes.timestamp:
      return toTimestampString(value);
    // Format to be consistent with PostgREST

    case PostgresTypes.abstime: // To allow users to cast it based on Timezone

    case PostgresTypes.date: // To allow users to cast it based on Timezone

    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime: // To allow users to cast it based on Timezone

    case PostgresTypes.text:
    case PostgresTypes.time: // To allow users to cast it based on Timezone

    case PostgresTypes.timestamptz: // To allow users to cast it based on Timezone

    case PostgresTypes.timetz: // To allow users to cast it based on Timezone

    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);

    default:
      // Return the value for remaining types
      return noop(value);
  }
};

exports.convertCell = convertCell;

const noop = value => {
  return value;
};

const toBoolean = value => {
  switch (value) {
    case 't':
      return true;

    case 'f':
      return false;

    default:
      return value;
  }
};

exports.toBoolean = toBoolean;

const toNumber = value => {
  if (typeof value === 'string') {
    const parsedValue = parseFloat(value);

    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }

  return value;
};

exports.toNumber = toNumber;

const toJson = value => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }

  return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */


exports.toJson = toJson;

const toArray = (value, type) => {
  if (typeof value !== 'string') {
    return value;
  }

  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0]; // Confirm value is a Postgres array by checking curly brackets

  if (openBrace === '{' && closeBrace === '}') {
    let arr;
    const valTrim = value.slice(1, lastIdx); // TODO: find a better solution to separate Postgres array data

    try {
      arr = JSON.parse('[' + valTrim + ']');
    } catch (_) {
      // WARNING: splitting on comma does not cover all edge cases
      arr = valTrim ? valTrim.split(',') : [];
    }

    return arr.map(val => convertCell(type, val));
  }

  return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */


exports.toArray = toArray;

const toTimestampString = value => {
  if (typeof value === 'string') {
    return value.replace(' ', 'T');
  }

  return value;
};

exports.toTimestampString = toTimestampString;
},{}],"node_modules/es5-ext/global.js":[function(require,module,exports) {
var naiveFallback = function () {
  if (typeof self === "object" && self) return self;
  if (typeof window === "object" && window) return window;
  throw new Error("Unable to resolve global `this`");
};

module.exports = function () {
  if (this) return this; // Unexpected strict mode (may happen if e.g. bundled into ESM module)
  // Fallback to standard globalThis if available

  if (typeof globalThis === "object" && globalThis) return globalThis; // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
  // In all ES5+ engines global object inherits from Object.prototype
  // (if you approached one that doesn't please report)

  try {
    Object.defineProperty(Object.prototype, "__global__", {
      get: function () {
        return this;
      },
      configurable: true
    });
  } catch (error) {
    // Unfortunate case of updates to Object.prototype being restricted
    // via preventExtensions, seal or freeze
    return naiveFallback();
  }

  try {
    // Safari case (window.__global__ works, but __global__ does not)
    if (!__global__) return naiveFallback();
    return __global__;
  } finally {
    delete Object.prototype.__global__;
  }
}();
},{}],"node_modules/websocket/package.json":[function(require,module,exports) {
module.exports = {
  "_from": "websocket@^1.0.34",
  "_id": "websocket@1.0.34",
  "_inBundle": false,
  "_integrity": "sha512-PRDso2sGwF6kM75QykIesBijKSVceR6jL2G8NGYyq2XrItNC2P5/qL5XeR056GhA+Ly7JMFvJb9I312mJfmqnQ==",
  "_location": "/websocket",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "websocket@^1.0.34",
    "name": "websocket",
    "escapedName": "websocket",
    "rawSpec": "^1.0.34",
    "saveSpec": null,
    "fetchSpec": "^1.0.34"
  },
  "_requiredBy": ["/@supabase/realtime-js"],
  "_resolved": "https://registry.npmjs.org/websocket/-/websocket-1.0.34.tgz",
  "_shasum": "2bdc2602c08bf2c82253b730655c0ef7dcab3111",
  "_spec": "websocket@^1.0.34",
  "_where": "D:\\Projects\\Game Engine\\Isometric\\web\\note-mockup\\node_modules\\@supabase\\realtime-js",
  "author": {
    "name": "Brian McKelvey",
    "email": "theturtle32@gmail.com",
    "url": "https://github.com/theturtle32"
  },
  "browser": "lib/browser.js",
  "bugs": {
    "url": "https://github.com/theturtle32/WebSocket-Node/issues"
  },
  "bundleDependencies": false,
  "config": {
    "verbose": false
  },
  "contributors": [{
    "name": "Iñaki Baz Castillo",
    "email": "ibc@aliax.net",
    "url": "http://dev.sipdoc.net"
  }],
  "dependencies": {
    "bufferutil": "^4.0.1",
    "debug": "^2.2.0",
    "es5-ext": "^0.10.50",
    "typedarray-to-buffer": "^3.1.5",
    "utf-8-validate": "^5.0.2",
    "yaeti": "^0.0.6"
  },
  "deprecated": false,
  "description": "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
  "devDependencies": {
    "buffer-equal": "^1.0.0",
    "gulp": "^4.0.2",
    "gulp-jshint": "^2.0.4",
    "jshint": "^2.0.0",
    "jshint-stylish": "^2.2.1",
    "tape": "^4.9.1"
  },
  "directories": {
    "lib": "./lib"
  },
  "engines": {
    "node": ">=4.0.0"
  },
  "homepage": "https://github.com/theturtle32/WebSocket-Node",
  "keywords": ["websocket", "websockets", "socket", "networking", "comet", "push", "RFC-6455", "realtime", "server", "client"],
  "license": "Apache-2.0",
  "main": "index",
  "name": "websocket",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/theturtle32/WebSocket-Node.git"
  },
  "scripts": {
    "gulp": "gulp",
    "test": "tape test/unit/*.js"
  },
  "version": "1.0.34"
};
},{}],"node_modules/websocket/lib/version.js":[function(require,module,exports) {
module.exports = require('../package.json').version;
},{"../package.json":"node_modules/websocket/package.json"}],"node_modules/websocket/lib/browser.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _globalThis;

if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
  _globalThis = globalThis;
} else {
  try {
    _globalThis = require('es5-ext/global');
  } catch (error) {} finally {
    if (!_globalThis && typeof window !== 'undefined') {
      _globalThis = window;
    }

    if (!_globalThis) {
      throw new Error('Could not determine global this');
    }
  }
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;

var websocket_version = require('./version');
/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */


function W3CWebSocket(uri, protocols) {
  var native_instance;

  if (protocols) {
    native_instance = new NativeWebSocket(uri, protocols);
  } else {
    native_instance = new NativeWebSocket(uri);
  }
  /**
   * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
   * class). Since it is an Object it will be returned as it is when creating an
   * instance of W3CWebSocket via 'new W3CWebSocket()'.
   *
   * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
   */


  return native_instance;
}

if (NativeWebSocket) {
  ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (prop) {
    Object.defineProperty(W3CWebSocket, prop, {
      get: function () {
        return NativeWebSocket[prop];
      }
    });
  });
}
/**
 * Module exports.
 */


module.exports = {
  'w3cwebsocket': NativeWebSocket ? W3CWebSocket : null,
  'version': websocket_version
};
},{"es5-ext/global":"node_modules/es5-ext/global.js","./version":"node_modules/websocket/lib/version.js"}],"node_modules/@supabase/realtime-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = '1.6.0';
exports.version = version;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS_CLOSE_NORMAL = exports.VSN = exports.TRANSPORTS = exports.SOCKET_STATES = exports.DEFAULT_TIMEOUT = exports.DEFAULT_HEADERS = exports.CHANNEL_STATES = exports.CHANNEL_EVENTS = void 0;

var _version = require("./version");

const DEFAULT_HEADERS = {
  'X-Client-Info': `realtime-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const VSN = '1.0.0';
exports.VSN = VSN;
const DEFAULT_TIMEOUT = 10000;
exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
const WS_CLOSE_NORMAL = 1000;
exports.WS_CLOSE_NORMAL = WS_CLOSE_NORMAL;
var SOCKET_STATES;
exports.SOCKET_STATES = SOCKET_STATES;

(function (SOCKET_STATES) {
  SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
  SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
  SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
  SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (exports.SOCKET_STATES = SOCKET_STATES = {}));

var CHANNEL_STATES;
exports.CHANNEL_STATES = CHANNEL_STATES;

(function (CHANNEL_STATES) {
  CHANNEL_STATES["closed"] = "closed";
  CHANNEL_STATES["errored"] = "errored";
  CHANNEL_STATES["joined"] = "joined";
  CHANNEL_STATES["joining"] = "joining";
  CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (exports.CHANNEL_STATES = CHANNEL_STATES = {}));

var CHANNEL_EVENTS;
exports.CHANNEL_EVENTS = CHANNEL_EVENTS;

(function (CHANNEL_EVENTS) {
  CHANNEL_EVENTS["close"] = "phx_close";
  CHANNEL_EVENTS["error"] = "phx_error";
  CHANNEL_EVENTS["join"] = "phx_join";
  CHANNEL_EVENTS["reply"] = "phx_reply";
  CHANNEL_EVENTS["leave"] = "phx_leave";
  CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = CHANNEL_EVENTS = {}));

var TRANSPORTS;
exports.TRANSPORTS = TRANSPORTS;

(function (TRANSPORTS) {
  TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (exports.TRANSPORTS = TRANSPORTS = {}));
},{"./version":"node_modules/@supabase/realtime-js/dist/module/lib/version.js"}],"node_modules/@supabase/realtime-js/dist/module/lib/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */
class Timer {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = undefined;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }

  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  } // Cancels any previous scheduleTimeout and schedules callback


  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }

}

exports.default = Timer;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/serializer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
  constructor() {
    this.HEADER_LENGTH = 1;
  }

  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }

    if (typeof rawPayload === 'string') {
      return callback(JSON.parse(rawPayload));
    }

    return callback({});
  }

  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view, decoder);
  }

  _decodeBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return {
      ref: null,
      topic: topic,
      event: event,
      payload: data
    };
  }

}

exports.default = Serializer;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/push.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../lib/constants");

var _RealtimeSubscription = _interopRequireDefault(require("../RealtimeSubscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Push {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(channel, event, payload = {}, timeout = _constants.DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = undefined;
    this.ref = '';
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
  }

  resend(timeout) {
    this.timeout = timeout;

    this._cancelRefEvent();

    this.ref = '';
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }

  send() {
    if (this._hasReceived('timeout')) {
      return;
    }

    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref
    });
  }

  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }

  receive(status, callback) {
    var _a;

    if (this._hasReceived(status)) {
      callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
    }

    this.recHooks.push({
      status,
      callback
    });
    return this;
  }

  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }

    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);

    const callback = payload => {
      this._cancelRefEvent();

      this._cancelTimeout();

      this.receivedResp = payload;

      this._matchReceive(payload);
    };

    if (this.channel instanceof _RealtimeSubscription.default) {
      this.channel.on(this.refEvent, callback);
    } else {
      this.channel.on(this.refEvent, {}, callback);
    }

    this.timeoutTimer = setTimeout(() => {
      this.trigger('timeout', {});
    }, this.timeout);
  }

  trigger(status, response) {
    if (this.refEvent) this.channel.trigger(this.refEvent, {
      status,
      response
    });
  }

  destroy() {
    this._cancelRefEvent();

    this._cancelTimeout();
  }

  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }

    if (this.channel instanceof _RealtimeSubscription.default) {
      this.channel.off(this.refEvent);
    } else {
      this.channel.off(this.refEvent, {});
    }
  }

  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = undefined;
  }

  _matchReceive({
    status,
    response
  }) {
    this.recHooks.filter(h => h.status === status).forEach(h => h.callback(response));
  }

  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }

}

exports.default = Push;
},{"../lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","../RealtimeSubscription":"node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js"}],"node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./lib/constants");

var _push = _interopRequireDefault(require("./lib/push"));

var _timer = _interopRequireDefault(require("./lib/timer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RealtimeSubscription {
  constructor(topic, params = {}, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = [];
    this.state = _constants.CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.timeout = this.socket.timeout;
    this.joinPush = new _push.default(this, _constants.CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new _timer.default(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive('ok', () => {
      this.state = _constants.CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach(pushEvent => pushEvent.send());
      this.pushBuffer = [];
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log('channel', `close ${this.topic} ${this.joinRef()}`);
      this.state = _constants.CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError(reason => {
      if (this.isLeaving() || this.isClosed()) {
        return;
      }

      this.socket.log('channel', `error ${this.topic}`, reason);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive('timeout', () => {
      if (!this.isJoining()) {
        return;
      }

      this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.on(_constants.CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
  }

  rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();

    if (this.socket.isConnected()) {
      this.rejoin();
    }
  }

  subscribe(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
    } else {
      this.joinedOnce = true;
      this.rejoin(timeout);
      return this.joinPush;
    }
  }

  onClose(callback) {
    this.on(_constants.CHANNEL_EVENTS.close, callback);
  }

  onError(callback) {
    this.on(_constants.CHANNEL_EVENTS.error, reason => callback(reason));
  }

  on(event, callback) {
    this.bindings.push({
      event,
      callback
    });
  }

  off(event) {
    this.bindings = this.bindings.filter(bind => bind.event !== event);
  }

  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }

  push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }

    let pushEvent = new _push.default(this, event, payload, timeout);

    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }

    return pushEvent;
  }

  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  /**
   * Leaves the channel
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */


  unsubscribe(timeout = this.timeout) {
    this.state = _constants.CHANNEL_STATES.leaving;

    let onClose = () => {
      this.socket.log('channel', `leave ${this.topic}`);
      this.trigger(_constants.CHANNEL_EVENTS.close, 'leave', this.joinRef());
    }; // Destroy joinPush to avoid connection timeouts during unscription phase


    this.joinPush.destroy();
    let leavePush = new _push.default(this, _constants.CHANNEL_EVENTS.leave, {}, timeout);
    leavePush.receive('ok', () => onClose()).receive('timeout', () => onClose());
    leavePush.send();

    if (!this.canPush()) {
      leavePush.trigger('ok', {});
    }

    return leavePush;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   */


  onMessage(event, payload, ref) {
    return payload;
  }

  isMember(topic) {
    return this.topic === topic;
  }

  joinRef() {
    return this.joinPush.ref;
  }

  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }

    this.socket.leaveOpenTopic(this.topic);
    this.state = _constants.CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }

  trigger(event, payload, ref) {
    let {
      close,
      error,
      leave,
      join
    } = _constants.CHANNEL_EVENTS;
    let events = [close, error, leave, join];

    if (ref && events.indexOf(event) >= 0 && ref !== this.joinRef()) {
      return;
    }

    let handledPayload = this.onMessage(event, payload, ref);

    if (payload && !handledPayload) {
      throw 'channel onMessage callbacks must return the payload, modified or unmodified';
    }

    this.bindings.filter(bind => {
      // Bind all events if the user specifies a wildcard.
      if (bind.event === '*') {
        return event === (payload === null || payload === void 0 ? void 0 : payload.type);
      } else {
        return bind.event === event;
      }
    }).map(bind => bind.callback(handledPayload, ref));
  }

  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }

  isClosed() {
    return this.state === _constants.CHANNEL_STATES.closed;
  }

  isErrored() {
    return this.state === _constants.CHANNEL_STATES.errored;
  }

  isJoined() {
    return this.state === _constants.CHANNEL_STATES.joined;
  }

  isJoining() {
    return this.state === _constants.CHANNEL_STATES.joining;
  }

  isLeaving() {
    return this.state === _constants.CHANNEL_STATES.leaving;
  }

}

exports.default = RealtimeSubscription;
},{"./lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","./lib/push":"node_modules/@supabase/realtime-js/dist/module/lib/push.js","./lib/timer":"node_modules/@supabase/realtime-js/dist/module/lib/timer.js"}],"node_modules/lodash.isequal/index.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
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
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
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

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
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
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
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
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
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
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
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
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

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
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
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
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
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
  return value != null && (type == 'object' || type == 'function');
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
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

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

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

},{}],"node_modules/lodash.clonedeep/index.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
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
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
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

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

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
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
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
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
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
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
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
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
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
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
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
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

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

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

},{}],"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/
class RealtimePresence {
  /**
   * Initializes the Presence
   * @param channel - The RealtimeSubscription
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(channel, opts) {
    this.channel = channel;
    this.state = {};
    this.pendingDiffs = [];
    this.joinRef = null;
    this.caller = {
      onJoin: () => {},
      onLeave: () => {},
      onSync: () => {}
    };
    const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
      state: 'presence_state',
      diff: 'presence_diff'
    };
    this.channel.on(events.state, {}, newState => {
      const {
        onJoin,
        onLeave,
        onSync
      } = this.caller;
      this.joinRef = this.channel.joinRef();
      this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach(diff => {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel.on(events.diff, {}, diff => {
      const {
        onJoin,
        onLeave,
        onSync
      } = this.caller;

      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
  }
  /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   */


  static syncState(currentState, newState, onJoin, onLeave) {
    const state = (0, _lodash.default)(currentState);
    const transformedState = this.transformState(newState);
    const joins = {};
    const leaves = {};
    this.map(state, (key, presences) => {
      if (!transformedState[key]) {
        leaves[key] = presences;
      }
    });
    this.map(transformedState, (key, newPresences) => {
      const currentPresences = state[key];

      if (currentPresences) {
        const newPresenceIds = newPresences.map(m => m.presence_id);
        const curPresenceIds = currentPresences.map(m => m.presence_id);
        const joinedPresences = newPresences.filter(m => curPresenceIds.indexOf(m.presence_id) < 0);
        const leftPresences = currentPresences.filter(m => newPresenceIds.indexOf(m.presence_id) < 0);

        if (joinedPresences.length > 0) {
          joins[key] = joinedPresences;
        }

        if (leftPresences.length > 0) {
          leaves[key] = leftPresences;
        }
      } else {
        joins[key] = newPresences;
      }
    });
    return this.syncDiff(state, {
      joins,
      leaves
    }, onJoin, onLeave);
  }
  /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   */


  static syncDiff(state, diff, onJoin, onLeave) {
    const {
      joins,
      leaves
    } = {
      joins: this.transformState(diff.joins),
      leaves: this.transformState(diff.leaves)
    };

    if (!onJoin) {
      onJoin = () => {};
    }

    if (!onLeave) {
      onLeave = () => {};
    }

    this.map(joins, (key, newPresences) => {
      const currentPresences = state[key];
      state[key] = (0, _lodash.default)(newPresences);

      if (currentPresences) {
        const joinedPresenceIds = state[key].map(m => m.presence_id);
        const curPresences = currentPresences.filter(m => joinedPresenceIds.indexOf(m.presence_id) < 0);
        state[key].unshift(...curPresences);
      }

      onJoin(key, currentPresences, newPresences);
    });
    this.map(leaves, (key, leftPresences) => {
      let currentPresences = state[key];
      if (!currentPresences) return;
      const presenceIdsToRemove = leftPresences.map(m => m.presence_id);
      currentPresences = currentPresences.filter(m => presenceIdsToRemove.indexOf(m.presence_id) < 0);
      state[key] = currentPresences;
      onLeave(key, currentPresences, leftPresences);
      if (currentPresences.length === 0) delete state[key];
    });
    return state;
  }
  /**
   * Returns the array of presences, with selected metadata.
   */


  static list(presences, chooser) {
    if (!chooser) {
      chooser = (_key, pres) => pres;
    }

    return this.map(presences, (key, presences) => chooser(key, presences));
  }

  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map(key => func(key, obj[key]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_id'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_id: '2', user_id: 1 },
   *    { presence_id: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   */


  static transformState(state) {
    state = (0, _lodash.default)(state);
    return Object.getOwnPropertyNames(state).reduce((newState, key) => {
      const presences = state[key];

      if ('metas' in presences) {
        newState[key] = presences.metas.map(presence => {
          presence['presence_id'] = presence['phx_ref'];
          delete presence['phx_ref'];
          delete presence['phx_ref_prev'];
          return presence;
        });
      } else {
        newState[key] = presences;
      }

      return newState;
    }, {});
  }

  onJoin(callback) {
    this.caller.onJoin = callback;
  }

  onLeave(callback) {
    this.caller.onLeave = callback;
  }

  onSync(callback) {
    this.caller.onSync = callback;
  }

  list(by) {
    return RealtimePresence.list(this.state, by);
  }

  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel.joinRef();
  }

}

exports.default = RealtimePresence;
},{"lodash.clonedeep":"node_modules/lodash.clonedeep/index.js"}],"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _constants = require("./lib/constants");

var _push = _interopRequireDefault(require("./lib/push"));

var _timer = _interopRequireDefault(require("./lib/timer"));

var _RealtimePresence = _interopRequireDefault(require("./RealtimePresence"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RealtimeChannel {
  constructor(topic, params = {}, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = [];
    this.state = _constants.CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.timeout = this.socket.timeout;
    this.joinPush = new _push.default(this, _constants.CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new _timer.default(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive('ok', () => {
      this.state = _constants.CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach(pushEvent => pushEvent.send());
      this.pushBuffer = [];
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log('channel', `close ${this.topic} ${this.joinRef()}`);
      this.state = _constants.CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError(reason => {
      if (this.isLeaving() || this.isClosed()) {
        return;
      }

      this.socket.log('channel', `error ${this.topic}`, reason);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive('timeout', () => {
      if (!this.isJoining()) {
        return;
      }

      this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.on(_constants.CHANNEL_EVENTS.reply, {}, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
    this.presence = new _RealtimePresence.default(this);
  }

  list() {
    return this.presence.list();
  }

  rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();

    if (this.socket.isConnected()) {
      this.rejoin();
    }
  }

  subscribe(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
    } else {
      const configs = this.bindings.reduce((acc, binding) => {
        const {
          type
        } = binding;

        if (!['phx_close', 'phx_error', 'phx_reply', 'presence_diff', 'presence_state'].includes(type)) {
          acc[type] = binding;
        }

        return acc;
      }, {});

      if (Object.keys(configs).length) {
        this.updateJoinPayload({
          configs
        });
      }

      this.joinedOnce = true;
      this.rejoin(timeout);
      return this.joinPush;
    }
  }

  onClose(callback) {
    this.on(_constants.CHANNEL_EVENTS.close, {}, callback);
  }

  onError(callback) {
    this.on(_constants.CHANNEL_EVENTS.error, {}, reason => callback(reason));
  }

  on(type, eventFilter, callback) {
    this.bindings.push({
      type,
      eventFilter: eventFilter !== null && eventFilter !== void 0 ? eventFilter : {},
      callback: callback !== null && callback !== void 0 ? callback : () => {}
    });
  }

  off(type, eventFilter) {
    this.bindings = this.bindings.filter(bind => {
      return !(bind.type === type && (0, _lodash.default)(bind.eventFilter, eventFilter));
    });
  }

  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }

  push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }

    let pushEvent = new _push.default(this, event, payload, timeout);

    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }

    return pushEvent;
  }

  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  /**
   * Leaves the channel
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */


  unsubscribe(timeout = this.timeout) {
    this.state = _constants.CHANNEL_STATES.leaving;

    let onClose = () => {
      this.socket.log('channel', `leave ${this.topic}`);
      this.trigger(_constants.CHANNEL_EVENTS.close, 'leave', this.joinRef());
    }; // Destroy joinPush to avoid connection timeouts during unscription phase


    this.joinPush.destroy();
    let leavePush = new _push.default(this, _constants.CHANNEL_EVENTS.leave, {}, timeout);
    leavePush.receive('ok', () => onClose()).receive('timeout', () => onClose());
    leavePush.send();

    if (!this.canPush()) {
      leavePush.trigger('ok', {});
    }

    return leavePush;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   */


  onMessage(event, payload, ref) {
    return payload;
  }

  isMember(topic) {
    return this.topic === topic;
  }

  joinRef() {
    return this.joinPush.ref;
  }

  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }

    this.socket.leaveOpenTopic(this.topic);
    this.state = _constants.CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }

  trigger(type, payload, ref) {
    const {
      close,
      error,
      leave,
      join
    } = _constants.CHANNEL_EVENTS;
    const events = [close, error, leave, join];

    if (ref && events.indexOf(type) >= 0 && ref !== this.joinRef()) {
      return;
    }

    const handledPayload = this.onMessage(type, payload, ref);

    if (payload && !handledPayload) {
      throw 'channel onMessage callbacks must return the payload, modified or unmodified';
    }

    this.bindings.filter(bind => {
      var _a, _b;

      return (bind === null || bind === void 0 ? void 0 : bind.type) === type && (((_a = bind === null || bind === void 0 ? void 0 : bind.eventFilter) === null || _a === void 0 ? void 0 : _a.event) === '*' || ((_b = bind === null || bind === void 0 ? void 0 : bind.eventFilter) === null || _b === void 0 ? void 0 : _b.event) === (payload === null || payload === void 0 ? void 0 : payload.event));
    }).map(bind => bind.callback(handledPayload, ref));
  }

  send(payload) {
    const push = this.push(payload.type, payload);
    return new Promise((resolve, reject) => {
      push.receive('ok', () => resolve('ok'));
      push.receive('timeout', () => reject('timeout'));
    });
  }

  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }

  isClosed() {
    return this.state === _constants.CHANNEL_STATES.closed;
  }

  isErrored() {
    return this.state === _constants.CHANNEL_STATES.errored;
  }

  isJoined() {
    return this.state === _constants.CHANNEL_STATES.joined;
  }

  isJoining() {
    return this.state === _constants.CHANNEL_STATES.joining;
  }

  isLeaving() {
    return this.state === _constants.CHANNEL_STATES.leaving;
  }

}

exports.default = RealtimeChannel;
},{"lodash.isequal":"node_modules/lodash.isequal/index.js","./lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","./lib/push":"node_modules/@supabase/realtime-js/dist/module/lib/push.js","./lib/timer":"node_modules/@supabase/realtime-js/dist/module/lib/timer.js","./RealtimePresence":"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"}],"node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _websocket = require("websocket");

var _constants = require("./lib/constants");

var _timer = _interopRequireDefault(require("./lib/timer"));

var _serializer = _interopRequireDefault(require("./lib/serializer"));

var _RealtimeSubscription = _interopRequireDefault(require("./RealtimeSubscription"));

var _RealtimeChannel = _interopRequireDefault(require("./RealtimeChannel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

const noop = () => {};

class RealtimeClient {
  /**
   * Initializes the Socket
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket.
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers The optional headers to pass when connecting.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.longpollerTimeout The maximum timeout of a long poll AJAX request. Defaults to 20s (double the server long poll timer).
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   */
  constructor(endPoint, options) {
    this.accessToken = null;
    this.channels = [];
    this.endPoint = '';
    this.headers = _constants.DEFAULT_HEADERS;
    this.params = {};
    this.timeout = _constants.DEFAULT_TIMEOUT;
    this.transport = _websocket.w3cwebsocket;
    this.heartbeatIntervalMs = 30000;
    this.longpollerTimeout = 20000;
    this.heartbeatTimer = undefined;
    this.pendingHeartbeatRef = null;
    this.ref = 0;
    this.logger = noop;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new _serializer.default();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.endPoint = `${endPoint}/${_constants.TRANSPORTS.websocket}`;
    if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.headers) this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
    if (options === null || options === void 0 ? void 0 : options.timeout) this.timeout = options.timeout;
    if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
    if (options === null || options === void 0 ? void 0 : options.transport) this.transport = options.transport;
    if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) this.heartbeatIntervalMs = options.heartbeatIntervalMs;
    if (options === null || options === void 0 ? void 0 : options.longpollerTimeout) this.longpollerTimeout = options.longpollerTimeout;
    this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : tries => {
      return [1000, 2000, 5000, 10000][tries - 1] || 10000;
    };
    this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
    this.reconnectTimer = new _timer.default(() => __awaiter(this, void 0, void 0, function* () {
      yield this.disconnect();
      this.connect();
    }), this.reconnectAfterMs);
  }
  /**
   * Connects the socket.
   */


  connect() {
    if (this.conn) {
      return;
    }

    this.conn = new this.transport(this.endPointURL(), [], null, this.headers);

    if (this.conn) {
      // this.conn.timeout = this.longpollerTimeout // TYPE ERROR
      this.conn.binaryType = 'arraybuffer';

      this.conn.onopen = () => this._onConnOpen();

      this.conn.onerror = error => this._onConnError(error);

      this.conn.onmessage = event => this.onConnMessage(event);

      this.conn.onclose = event => this._onConnClose(event);
    }
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */


  disconnect(code, reason) {
    return new Promise((resolve, _reject) => {
      try {
        if (this.conn) {
          this.conn.onclose = function () {}; // noop


          if (code) {
            this.conn.close(code, reason || '');
          } else {
            this.conn.close();
          }

          this.conn = null; // remove open handles

          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }

        resolve({
          error: null,
          data: true
        });
      } catch (error) {
        resolve({
          error: error,
          data: false
        });
      }
    });
  }
  /**
   * Logs the message. Override `this.logger` for specialized logging.
   */


  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  /**
   * Registers a callback for connection state change event.
   * @param callback A function to be called when the event occurs.
   *
   * @example
   *    socket.onOpen(() => console.log("Socket opened."))
   */


  onOpen(callback) {
    this.stateChangeCallbacks.open.push(callback);
  }
  /**
   * Registers a callbacks for connection state change events.
   * @param callback A function to be called when the event occurs.
   *
   * @example
   *    socket.onOpen(() => console.log("Socket closed."))
   */


  onClose(callback) {
    this.stateChangeCallbacks.close.push(callback);
  }
  /**
   * Registers a callback for connection state change events.
   * @param callback A function to be called when the event occurs.
   *
   * @example
   *    socket.onOpen((error) => console.log("An error occurred"))
   */


  onError(callback) {
    this.stateChangeCallbacks.error.push(callback);
  }
  /**
   * Calls a function any time a message is received.
   * @param callback A function to be called when the event occurs.
   *
   * @example
   *    socket.onMessage((message) => console.log(message))
   */


  onMessage(callback) {
    this.stateChangeCallbacks.message.push(callback);
  }
  /**
   * Returns the current state of the socket.
   */


  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case _constants.SOCKET_STATES.connecting:
        return 'connecting';

      case _constants.SOCKET_STATES.open:
        return 'open';

      case _constants.SOCKET_STATES.closing:
        return 'closing';

      default:
        return 'closed';
    }
  }
  /**
   * Retuns `true` is the connection is open.
   */


  isConnected() {
    return this.connectionState() === 'open';
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   */


  remove(channel) {
    this.channels = this.channels.filter(c => c.joinRef() !== channel.joinRef());
  }

  channel(topic, chanParams = {
    isNewVersion: false
  }) {
    const {
      isNewVersion
    } = chanParams,
          params = __rest(chanParams, ["isNewVersion"]);

    const chan = isNewVersion ? new _RealtimeChannel.default(topic, Object.assign({}, params), this) : new _RealtimeSubscription.default(topic, Object.assign({}, params), this);

    if (chan instanceof _RealtimeChannel.default) {
      chan.presence.onJoin((key, currentPresences, newPresences) => {
        chan.trigger('presence', {
          event: 'JOIN',
          key,
          currentPresences,
          newPresences
        });
      });
      chan.presence.onLeave((key, currentPresences, leftPresences) => {
        chan.trigger('presence', {
          event: 'LEAVE',
          key,
          currentPresences,
          leftPresences
        });
      });
      chan.presence.onSync(() => {
        chan.trigger('presence', {
          event: 'SYNC'
        });
      });
    }

    this.channels.push(chan);
    return chan;
  }

  push(data) {
    let {
      topic,
      event,
      payload,
      ref
    } = data;

    let callback = () => {
      this.encode(data, result => {
        var _a;

        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
      });
    };

    this.log('push', `${topic} ${event} (${ref})`, payload);

    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }

  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, msg => {
      let {
        topic,
        event,
        payload,
        ref
      } = msg;

      if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
        this.pendingHeartbeatRef = null;
      }

      this.log('receive', `${payload.status || ''} ${topic} ${event} ${ref && '(' + ref + ')' || ''}`, payload);
      this.channels.filter(channel => channel.isMember(topic)).forEach(channel => channel.trigger(event, payload, ref));
      this.stateChangeCallbacks.message.forEach(callback => callback(msg));
    });
  }
  /**
   * Returns the URL of the websocket.
   */


  endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, {
      vsn: _constants.VSN
    }));
  }
  /**
   * Return the next message ref, accounting for overflows
   */


  makeRef() {
    let newRef = this.ref + 1;

    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }

    return this.ref.toString();
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * @param token A JWT string.
   */


  setAuth(token) {
    this.accessToken = token;

    try {
      this.channels.forEach(channel => {
        token && channel.updateJoinPayload({
          user_token: token
        });

        if (channel.joinedOnce && channel.isJoined()) {
          channel.push(_constants.CHANNEL_EVENTS.access_token, {
            access_token: token
          });
        }
      });
    } catch (error) {
      console.log('setAuth error', error);
    }
  }

  leaveOpenTopic(topic) {
    let dupChannel = this.channels.find(c => c.topic === topic && (c.isJoined() || c.isJoining()));

    if (dupChannel) {
      this.log('transport', `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }

  _onConnOpen() {
    this.log('transport', `connected to ${this.endPointURL()}`);

    this._flushSendBuffer();

    this.reconnectTimer.reset();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    this.stateChangeCallbacks.open.forEach(callback => callback());
  }

  _onConnClose(event) {
    this.log('transport', 'close', event);

    this._triggerChanError();

    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer.scheduleTimeout();
    this.stateChangeCallbacks.close.forEach(callback => callback(event));
  }

  _onConnError(error) {
    this.log('transport', error.message);

    this._triggerChanError();

    this.stateChangeCallbacks.error.forEach(callback => callback(error));
  }

  _triggerChanError() {
    this.channels.forEach(channel => channel.trigger(_constants.CHANNEL_EVENTS.error));
  }

  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }

    const prefix = url.match(/\?/) ? '&' : '?';
    const query = new URLSearchParams(params);
    return `${url}${prefix}${query}`;
  }

  _flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach(callback => callback());
      this.sendBuffer = [];
    }
  }

  _sendHeartbeat() {
    var _a;

    if (!this.isConnected()) {
      return;
    }

    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(_constants.WS_CLOSE_NORMAL, 'hearbeat timeout');
      return;
    }

    this.pendingHeartbeatRef = this.makeRef();
    this.push({
      topic: 'phoenix',
      event: 'heartbeat',
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    this.setAuth(this.accessToken);
  }

}

exports.default = RealtimeClient;
},{"websocket":"node_modules/websocket/lib/browser.js","./lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","./lib/timer":"node_modules/@supabase/realtime-js/dist/module/lib/timer.js","./lib/serializer":"node_modules/@supabase/realtime-js/dist/module/lib/serializer.js","./RealtimeSubscription":"node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js","./RealtimeChannel":"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"}],"node_modules/@supabase/realtime-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RealtimeChannel", {
  enumerable: true,
  get: function () {
    return _RealtimeChannel.default;
  }
});
Object.defineProperty(exports, "RealtimeClient", {
  enumerable: true,
  get: function () {
    return _RealtimeClient.default;
  }
});
Object.defineProperty(exports, "RealtimePresence", {
  enumerable: true,
  get: function () {
    return _RealtimePresence.default;
  }
});
Object.defineProperty(exports, "RealtimeSubscription", {
  enumerable: true,
  get: function () {
    return _RealtimeSubscription.default;
  }
});
exports.Transformers = void 0;

var Transformers = _interopRequireWildcard(require("./lib/transformers"));

exports.Transformers = Transformers;

var _RealtimeClient = _interopRequireDefault(require("./RealtimeClient"));

var _RealtimeSubscription = _interopRequireDefault(require("./RealtimeSubscription"));

var _RealtimeChannel = _interopRequireDefault(require("./RealtimeChannel"));

var _RealtimePresence = _interopRequireDefault(require("./RealtimePresence"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./lib/transformers":"node_modules/@supabase/realtime-js/dist/module/lib/transformers.js","./RealtimeClient":"node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js","./RealtimeSubscription":"node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js","./RealtimeChannel":"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js","./RealtimePresence":"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupabaseRealtimeClient = void 0;

var _realtimeJs = require("@supabase/realtime-js");

class SupabaseRealtimeClient {
  constructor(socket, headers, schema, tableName) {
    const chanParams = {};
    const topic = tableName === '*' ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
    const userToken = headers['Authorization'].split(' ')[1];

    if (userToken) {
      chanParams['user_token'] = userToken;
    }

    this.subscription = socket.channel(topic, chanParams);
  }

  getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };

    if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
      records.new = _realtimeJs.Transformers.convertChangeData(payload.columns, payload.record);
    }

    if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
      records.old = _realtimeJs.Transformers.convertChangeData(payload.columns, payload.old_record);
    }

    return records;
  }
  /**
   * The event you want to listen to.
   *
   * @param event The event
   * @param callback A callback function that is called whenever the event occurs.
   */


  on(event, callback) {
    this.subscription.on(event, payload => {
      let enrichedPayload = {
        schema: payload.schema,
        table: payload.table,
        commit_timestamp: payload.commit_timestamp,
        eventType: payload.type,
        new: {},
        old: {},
        errors: payload.errors
      };
      enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
      callback(enrichedPayload);
    });
    return this;
  }
  /**
   * Enables the subscription.
   */


  subscribe(callback = () => {}) {
    this.subscription.onError(e => callback('SUBSCRIPTION_ERROR', e));
    this.subscription.onClose(() => callback('CLOSED'));
    this.subscription.subscribe().receive('ok', () => callback('SUBSCRIBED')).receive('error', e => callback('SUBSCRIPTION_ERROR', e)).receive('timeout', () => callback('RETRYING_AFTER_TIMEOUT'));
    return this.subscription;
  }

}

exports.SupabaseRealtimeClient = SupabaseRealtimeClient;
},{"@supabase/realtime-js":"node_modules/@supabase/realtime-js/dist/module/index.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupabaseQueryBuilder = void 0;

var _postgrestJs = require("@supabase/postgrest-js");

var _SupabaseRealtimeClient = require("./SupabaseRealtimeClient");

class SupabaseQueryBuilder extends _postgrestJs.PostgrestQueryBuilder {
  constructor(url, {
    headers = {},
    schema,
    realtime,
    table,
    fetch,
    shouldThrowOnError
  }) {
    super(url, {
      headers,
      schema,
      fetch,
      shouldThrowOnError
    });
    this._subscription = null;
    this._realtime = realtime;
    this._headers = headers;
    this._schema = schema;
    this._table = table;
  }
  /**
   * Subscribe to realtime changes in your database.
   * @param event The database event which you would like to receive updates for, or you can use the special wildcard `*` to listen to all changes.
   * @param callback A callback that will handle the payload that is sent whenever your database changes.
   */


  on(event, callback) {
    if (!this._realtime.isConnected()) {
      this._realtime.connect();
    }

    if (!this._subscription) {
      this._subscription = new _SupabaseRealtimeClient.SupabaseRealtimeClient(this._realtime, this._headers, this._schema, this._table);
    }

    return this._subscription.on(event, callback);
  }

}

exports.SupabaseQueryBuilder = SupabaseQueryBuilder;
},{"@supabase/postgrest-js":"node_modules/@supabase/postgrest-js/dist/module/index.js","./SupabaseRealtimeClient":"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js"}],"node_modules/@supabase/storage-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// generated by genversion
const version = '0.0.0';
exports.version = version;
},{}],"node_modules/@supabase/storage-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_HEADERS = void 0;

var _version = require("./version");

const DEFAULT_HEADERS = {
  'X-Client-Info': `storage-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
},{"./version":"node_modules/@supabase/storage-js/dist/module/lib/version.js"}],"node_modules/@supabase/storage-js/dist/module/lib/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.remove = remove;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const _getErrorMessage = err => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);

const handleError = (error, reject) => {
  if (typeof error.json !== 'function') {
    return reject(error);
  }

  error.json().then(err => {
    return reject({
      message: _getErrorMessage(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};

const _getRequestParams = (method, options, parameters, body) => {
  const params = {
    method,
    headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
  };

  if (method === 'GET') {
    return params;
  }

  params.headers = Object.assign({
    'Content-Type': 'application/json'
  }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};

function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then(result => {
        if (!result.ok) throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson) return resolve(result);
        return result.json();
      }).then(data => resolve(data)).catch(error => handleError(error, reject));
    });
  });
}

function get(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'GET', url, options, parameters);
  });
}

function post(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'POST', url, options, parameters, body);
  });
}

function put(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
  });
}

function remove(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
  });
}
},{}],"node_modules/@supabase/storage-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveFetch = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolveFetch = customFetch => {
  let _fetch;

  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = _crossFetch.default;
  } else {
    _fetch = fetch;
  }

  return (...args) => _fetch(...args);
};

exports.resolveFetch = resolveFetch;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/storage-js/dist/module/lib/StorageBucketApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageBucketApi = void 0;

var _constants = require("./constants");

var _fetch = require("./fetch");

var _helpers = require("./helpers");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class StorageBucketApi {
  constructor(url, headers = {}, fetch) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, _constants.DEFAULT_HEADERS), headers);
    this.fetch = (0, _helpers.resolveFetch)(fetch);
  }
  /**
   * Retrieves the details of all Storage buckets within an existing product.
   */


  listBuckets() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket`, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */


  getBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket/${id}`, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @returns newly created bucket id
   */


  createBucket(id, options = {
    public: false
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket`, {
          id,
          name: id,
          public: options.public
        }, {
          headers: this.headers
        });
        return {
          data: data.name,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Updates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   */


  updateBucket(id, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.put)(this.fetch, `${this.url}/bucket/${id}`, {
          id,
          name: id,
          public: options.public
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */


  emptyBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */


  deleteBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }

}

exports.StorageBucketApi = StorageBucketApi;
},{"./constants":"node_modules/@supabase/storage-js/dist/module/lib/constants.js","./fetch":"node_modules/@supabase/storage-js/dist/module/lib/fetch.js","./helpers":"node_modules/@supabase/storage-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/storage-js/dist/module/lib/StorageFileApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageFileApi = void 0;

var _fetch = require("./fetch");

var _helpers = require("./helpers");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: 'name',
    order: 'asc'
  }
};
const DEFAULT_FILE_OPTIONS = {
  cacheControl: '3600',
  contentType: 'text/plain;charset=UTF-8',
  upsert: false
};

class StorageFileApi {
  constructor(url, headers = {}, bucketId, fetch) {
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = (0, _helpers.resolveFetch)(fetch);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   * @param fileOptions HTTP headers.
   * `cacheControl`: string, the `Cache-Control: max-age=<seconds>` seconds value.
   * `contentType`: string, the `Content-Type` header value. Should be specified if using a `fileBody` that is neither `Blob` nor `File` nor `FormData`, otherwise will default to `text/plain;charset=UTF-8`.
   * `upsert`: boolean, whether to perform an upsert.
   */


  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), method === 'POST' && {
          'x-upsert': String(options.upsert)
        });

        if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
          body = new FormData();
          body.append('cacheControl', options.cacheControl);
          body.append('', fileBody);
        } else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
          body = fileBody;
          body.append('cacheControl', options.cacheControl);
        } else {
          body = fileBody;
          headers['cache-control'] = `max-age=${options.cacheControl}`;
          headers['content-type'] = options.contentType;
        }

        const cleanPath = this._removeEmptyFolders(path);

        const _path = this._getFinalPath(cleanPath);

        const res = yield this.fetch(`${this.url}/object/${_path}`, {
          method,
          body: body,
          headers
        });

        if (res.ok) {
          // const data = await res.json()
          // temporary fix till backend is updated to the latest storage-api version
          return {
            data: {
              Key: _path
            },
            error: null
          };
        } else {
          const error = yield res.json();
          return {
            data: null,
            error
          };
        }
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   * @param fileOptions HTTP headers.
   * `cacheControl`: string, the `Cache-Control: max-age=<seconds>` seconds value.
   * `contentType`: string, the `Content-Type` header value. Should be specified if using a `fileBody` that is neither `Blob` nor `File` nor `FormData`, otherwise will default to `text/plain;charset=UTF-8`.
   * `upsert`: boolean, whether to perform an upsert.
   */


  upload(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('POST', path, fileBody, fileOptions);
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   * @param fileOptions HTTP headers.
   * `cacheControl`: string, the `Cache-Control: max-age=<seconds>` seconds value.
   * `contentType`: string, the `Content-Type` header value. Should be specified if using a `fileBody` that is neither `Blob` nor `File` nor `FormData`, otherwise will default to `text/plain;charset=UTF-8`.
   * `upsert`: boolean, whether to perform an upsert.
   */


  update(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('PUT', path, fileBody, fileOptions);
    });
  }
  /**
   * Moves an existing file.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   */


  move(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Copies an existing file.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   */


  copy(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Create signed URL to download file without requiring permissions. This URL can be valid for a set number of seconds.
   *
   * @param path The file path to be downloaded, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   */


  createSignedUrl(path, expiresIn) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);

        let data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${_path}`, {
          expiresIn
        }, {
          headers: this.headers
        });
        const signedURL = `${this.url}${data.signedURL}`;
        data = {
          signedURL
        };
        return {
          data,
          error: null,
          signedURL
        };
      } catch (error) {
        return {
          data: null,
          error,
          signedURL: null
        };
      }
    });
  }
  /**
   * Create signed URLs to download files without requiring permissions. These URLs can be valid for a set number of seconds.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   */


  createSignedUrls(paths, expiresIn) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, {
          expiresIn,
          paths
        }, {
          headers: this.headers
        });
        return {
          data: data.map(datum => Object.assign(Object.assign({}, datum), {
            signedURL: datum.signedURL ? `${this.url}${datum.signedURL}` : null
          })),
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Downloads a file.
   *
   * @param path The file path to be downloaded, including the path and file name. For example `folder/image.png`.
   */


  download(path) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);

        const res = yield (0, _fetch.get)(this.fetch, `${this.url}/object/${_path}`, {
          headers: this.headers,
          noResolveJson: true
        });
        const data = yield res.blob();
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Retrieve URLs for assets in public buckets
   *
   * @param path The file path to be downloaded, including the path and file name. For example `folder/image.png`.
   */


  getPublicUrl(path) {
    try {
      const _path = this._getFinalPath(path);

      const publicURL = `${this.url}/object/public/${_path}`;
      const data = {
        publicURL
      };
      return {
        data,
        error: null,
        publicURL
      };
    } catch (error) {
      return {
        data: null,
        error,
        publicURL: null
      };
    }
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to be deleted, including the path and file name. For example [`folder/image.png`].
   */


  remove(paths) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, {
          prefixes: paths
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(id: string): Promise<{ data: Metadata | null; error: Error | null }> {
  //   try {
  //     const data = await get(`${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     return { data: null, error }
  //   }
  // }

  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<{ data: Metadata | null; error: Error | null }> {
  //   try {
  //     const data = await post(`${this.url}/metadata/${id}`, { ...meta }, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     return { data: null, error }
  //   }
  // }

  /**
   * Lists all the files within a bucket.
   * @param path The folder path.
   * @param options Search options, including `limit`, `offset`, and `sortBy`.
   * @param parameters Fetch parameters, currently only supports `signal`, which is an AbortController's signal
   */


  list(path, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), {
          prefix: path || ''
        });
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, {
          headers: this.headers
        }, parameters);
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }

  _getFinalPath(path) {
    return `${this.bucketId}/${path}`;
  }

  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
  }

}

exports.StorageFileApi = StorageFileApi;
},{"./fetch":"node_modules/@supabase/storage-js/dist/module/lib/fetch.js","./helpers":"node_modules/@supabase/storage-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/storage-js/dist/module/lib/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"node_modules/@supabase/storage-js/dist/module/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StorageBucketApi = require("./StorageBucketApi");

Object.keys(_StorageBucketApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _StorageBucketApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _StorageBucketApi[key];
    }
  });
});

var _StorageFileApi = require("./StorageFileApi");

Object.keys(_StorageFileApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _StorageFileApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _StorageFileApi[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});
},{"./StorageBucketApi":"node_modules/@supabase/storage-js/dist/module/lib/StorageBucketApi.js","./StorageFileApi":"node_modules/@supabase/storage-js/dist/module/lib/StorageFileApi.js","./types":"node_modules/@supabase/storage-js/dist/module/lib/types.js","./constants":"node_modules/@supabase/storage-js/dist/module/lib/constants.js"}],"node_modules/@supabase/storage-js/dist/module/StorageClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageClient = void 0;

var _lib = require("./lib");

class StorageClient extends _lib.StorageBucketApi {
  constructor(url, headers = {}, fetch) {
    super(url, headers, fetch);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */


  from(id) {
    return new _lib.StorageFileApi(this.url, this.headers, id, this.fetch);
  }

}

exports.StorageClient = StorageClient;
},{"./lib":"node_modules/@supabase/storage-js/dist/module/lib/index.js"}],"node_modules/@supabase/storage-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  StorageClient: true,
  SupabaseStorageClient: true
};
Object.defineProperty(exports, "StorageClient", {
  enumerable: true,
  get: function () {
    return _StorageClient.StorageClient;
  }
});
Object.defineProperty(exports, "SupabaseStorageClient", {
  enumerable: true,
  get: function () {
    return _StorageClient.StorageClient;
  }
});

var _StorageClient = require("./StorageClient");

var _types = require("./lib/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
},{"./StorageClient":"node_modules/@supabase/storage-js/dist/module/StorageClient.js","./lib/types":"node_modules/@supabase/storage-js/dist/module/lib/types.js"}],"node_modules/@supabase/functions-js/dist/module/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveFetch = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolveFetch = customFetch => {
  let _fetch;

  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = _crossFetch.default;
  } else {
    _fetch = fetch;
  }

  return (...args) => _fetch(...args);
};

exports.resolveFetch = resolveFetch;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/functions-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionsClient = void 0;

var _helper = require("./helper");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class FunctionsClient {
  constructor(url, {
    headers = {},
    customFetch
  }) {
    this.url = url;
    this.headers = headers;
    this.fetch = (0, _helper.resolveFetch)(customFetch);
  }
  /**
   * Updates the authorization header
   * @params token - the new jwt token sent in the authorisation header
   */


  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  /**
   * Invokes a function
   * @param functionName - the name of the function to invoke
   * @param invokeOptions - object with the following properties
   * `headers`: object representing the headers to send with the request
   * `body`: the body of the request
   * `responseType`: how the response should be parsed. The default is `json`
   */


  invoke(functionName, invokeOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          headers,
          body
        } = invokeOptions !== null && invokeOptions !== void 0 ? invokeOptions : {};
        const response = yield this.fetch(`${this.url}/${functionName}`, {
          method: 'POST',
          headers: Object.assign({}, this.headers, headers),
          body
        });
        const isRelayError = response.headers.get('x-relay-error');

        if (isRelayError && isRelayError === 'true') {
          return {
            data: null,
            error: new Error(yield response.text())
          };
        }

        let data;
        const {
          responseType
        } = invokeOptions !== null && invokeOptions !== void 0 ? invokeOptions : {};

        if (!responseType || responseType === 'json') {
          data = yield response.json();
        } else if (responseType === 'arrayBuffer') {
          data = yield response.arrayBuffer();
        } else if (responseType === 'blob') {
          data = yield response.blob();
        } else {
          data = yield response.text();
        }

        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }

}

exports.FunctionsClient = FunctionsClient;
},{"./helper":"node_modules/@supabase/functions-js/dist/module/helper.js"}],"node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./lib/constants");

var _helpers = require("./lib/helpers");

var _SupabaseAuthClient = require("./lib/SupabaseAuthClient");

var _SupabaseQueryBuilder = require("./lib/SupabaseQueryBuilder");

var _storageJs = require("@supabase/storage-js");

var _functionsJs = require("@supabase/functions-js");

var _postgrestJs = require("@supabase/postgrest-js");

var _realtimeJs = require("@supabase/realtime-js");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const DEFAULT_OPTIONS = {
  schema: 'public',
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: _constants.DEFAULT_HEADERS
};
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */

class SupabaseClient {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.headers Any additional headers to send with each network request.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.multiTab Set to "false" if you want to disable multi-tab/window events.
   * @param options.fetch A custom fetch implementation.
   */
  constructor(supabaseUrl, supabaseKey, options) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    if (!supabaseUrl) throw new Error('supabaseUrl is required.');
    if (!supabaseKey) throw new Error('supabaseKey is required.');

    const _supabaseUrl = (0, _helpers.stripTrailingSlash)(supabaseUrl);

    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.restUrl = `${_supabaseUrl}/rest/v1`;
    this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace('http', 'ws');
    this.authUrl = `${_supabaseUrl}/auth/v1`;
    this.storageUrl = `${_supabaseUrl}/storage/v1`;

    const isPlatform = _supabaseUrl.match(/(supabase\.co)|(supabase\.in)/);

    if (isPlatform) {
      const urlParts = _supabaseUrl.split('.');

      this.functionsUrl = `${urlParts[0]}.functions.${urlParts[1]}.${urlParts[2]}`;
    } else {
      this.functionsUrl = `${_supabaseUrl}/functions/v1`;
    }

    this.schema = settings.schema;
    this.multiTab = settings.multiTab;
    this.fetch = settings.fetch;
    this.headers = Object.assign(Object.assign({}, _constants.DEFAULT_HEADERS), options === null || options === void 0 ? void 0 : options.headers);
    this.shouldThrowOnError = settings.shouldThrowOnError || false;
    this.auth = this._initSupabaseAuthClient(settings);
    this.realtime = this._initRealtimeClient(Object.assign({
      headers: this.headers
    }, settings.realtime));

    this._listenForAuthEvents();

    this._listenForMultiTabEvents(); // In the future we might allow the user to pass in a logger to receive these events.
    // this.realtime.onOpen(() => console.log('OPEN'))
    // this.realtime.onClose(() => console.log('CLOSED'))
    // this.realtime.onError((e: Error) => console.log('Socket error', e))

  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */


  get functions() {
    return new _functionsJs.FunctionsClient(this.functionsUrl, {
      headers: this._getAuthHeaders(),
      customFetch: this.fetch
    });
  }
  /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */


  get storage() {
    return new _storageJs.SupabaseStorageClient(this.storageUrl, this._getAuthHeaders(), this.fetch);
  }
  /**
   * Perform a table operation.
   *
   * @param table The table name to operate on.
   */


  from(table) {
    const url = `${this.restUrl}/${table}`;
    return new _SupabaseQueryBuilder.SupabaseQueryBuilder(url, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      realtime: this.realtime,
      table,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param params  The parameters to pass to the function call.
   * @param head   When set to true, no data will be returned.
   * @param count  Count algorithm to use to count rows in a table.
   *
   */


  rpc(fn, params, {
    head = false,
    count = null
  } = {}) {
    const rest = this._initPostgRESTClient();

    return rest.rpc(fn, params, {
      head,
      count
    });
  }
  /**
   * Closes and removes all subscriptions and returns a list of removed
   * subscriptions and their errors.
   */


  removeAllSubscriptions() {
    return __awaiter(this, void 0, void 0, function* () {
      const allSubs = this.getSubscriptions().slice();
      const allSubPromises = allSubs.map(sub => this.removeSubscription(sub));
      const allRemovedSubs = yield Promise.all(allSubPromises);
      return allRemovedSubs.map(({
        error
      }, i) => {
        return {
          data: {
            subscription: allSubs[i]
          },
          error
        };
      });
    });
  }
  /**
   * Closes and removes a subscription and returns the number of open subscriptions.
   *
   * @param subscription The subscription you want to close and remove.
   */


  removeSubscription(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        error
      } = yield this._closeSubscription(subscription);
      const allSubs = this.getSubscriptions();
      const openSubCount = allSubs.filter(chan => chan.isJoined()).length;
      if (allSubs.length === 0) yield this.realtime.disconnect();
      return {
        data: {
          openSubscriptions: openSubCount
        },
        error
      };
    });
  }

  _closeSubscription(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
      let error = null;

      if (!subscription.isClosed()) {
        const {
          error: unsubError
        } = yield this._unsubscribeSubscription(subscription);
        error = unsubError;
      }

      this.realtime.remove(subscription);
      return {
        error
      };
    });
  }

  _unsubscribeSubscription(subscription) {
    return new Promise(resolve => {
      subscription.unsubscribe().receive('ok', () => resolve({
        error: null
      })).receive('error', error => resolve({
        error
      })).receive('timeout', () => resolve({
        error: new Error('timed out')
      }));
    });
  }
  /**
   * Returns an array of all your subscriptions.
   */


  getSubscriptions() {
    return this.realtime.channels;
  }

  _initSupabaseAuthClient({
    autoRefreshToken,
    persistSession,
    detectSessionInUrl,
    localStorage,
    headers,
    fetch
  }) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new _SupabaseAuthClient.SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, headers), authHeaders),
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      localStorage,
      fetch
    });
  }

  _initRealtimeClient(options) {
    return new _realtimeJs.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), {
      params: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), {
        apikey: this.supabaseKey
      })
    }));
  }

  _initPostgRESTClient() {
    return new _postgrestJs.PostgrestClient(this.restUrl, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      fetch: this.fetch,
      throwOnError: this.shouldThrowOnError
    });
  }

  _getAuthHeaders() {
    var _a, _b;

    const headers = Object.assign({}, this.headers);
    const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
    headers['apikey'] = this.supabaseKey;
    headers['Authorization'] = headers['Authorization'] || `Bearer ${authBearer}`;
    return headers;
  }

  _listenForMultiTabEvents() {
    if (!this.multiTab || !(0, _helpers.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      return null;
    }

    try {
      return window === null || window === void 0 ? void 0 : window.addEventListener('storage', e => {
        var _a, _b, _c;

        if (e.key === _constants.STORAGE_KEY) {
          const newSession = JSON.parse(String(e.newValue));
          const accessToken = (_b = (_a = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined;
          const previousAccessToken = (_c = this.auth.session()) === null || _c === void 0 ? void 0 : _c.access_token;

          if (!accessToken) {
            this._handleTokenChanged('SIGNED_OUT', accessToken, 'STORAGE');
          } else if (!previousAccessToken && accessToken) {
            this._handleTokenChanged('SIGNED_IN', accessToken, 'STORAGE');
          } else if (previousAccessToken !== accessToken) {
            this._handleTokenChanged('TOKEN_REFRESHED', accessToken, 'STORAGE');
          }
        }
      });
    } catch (error) {
      console.error('_listenForMultiTabEvents', error);
      return null;
    }
  }

  _listenForAuthEvents() {
    let {
      data
    } = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, 'CLIENT');
    });
    return data;
  }

  _handleTokenChanged(event, token, source) {
    if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') && this.changedAccessToken !== token) {
      // Token has changed
      this.realtime.setAuth(token); // Ideally we should call this.auth.recoverSession() - need to make public
      // to trigger a "SIGNED_IN" event on this client.

      if (source == 'STORAGE') this.auth.setAuth(token);
      this.changedAccessToken = token;
    } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      // Token is removed
      this.realtime.setAuth(this.supabaseKey);
      if (source == 'STORAGE') this.auth.signOut();
    }
  }

}

exports.default = SupabaseClient;
},{"./lib/constants":"node_modules/@supabase/supabase-js/dist/module/lib/constants.js","./lib/helpers":"node_modules/@supabase/supabase-js/dist/module/lib/helpers.js","./lib/SupabaseAuthClient":"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js","./lib/SupabaseQueryBuilder":"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js","@supabase/storage-js":"node_modules/@supabase/storage-js/dist/module/index.js","@supabase/functions-js":"node_modules/@supabase/functions-js/dist/module/index.js","@supabase/postgrest-js":"node_modules/@supabase/postgrest-js/dist/module/index.js","@supabase/realtime-js":"node_modules/@supabase/realtime-js/dist/module/index.js"}],"node_modules/@supabase/supabase-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createClient: true,
  SupabaseClient: true
};
Object.defineProperty(exports, "SupabaseClient", {
  enumerable: true,
  get: function () {
    return _SupabaseClient.default;
  }
});
exports.createClient = void 0;

var _SupabaseClient = _interopRequireDefault(require("./SupabaseClient"));

var _gotrueJs = require("@supabase/gotrue-js");

Object.keys(_gotrueJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gotrueJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gotrueJs[key];
    }
  });
});

var _realtimeJs = require("@supabase/realtime-js");

Object.keys(_realtimeJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _realtimeJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _realtimeJs[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new Supabase Client.
 */
const createClient = (supabaseUrl, supabaseKey, options) => {
  return new _SupabaseClient.default(supabaseUrl, supabaseKey, options);
};

exports.createClient = createClient;
},{"./SupabaseClient":"node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js","@supabase/gotrue-js":"node_modules/@supabase/gotrue-js/dist/module/index.js","@supabase/realtime-js":"node_modules/@supabase/realtime-js/dist/module/index.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _supabaseJs = require("@supabase/supabase-js");

require("./styles.css");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.getElementById("app").innerHTML = "\n<h1>Hello Vanilla!</h1>\n<div>\n  We use the same configuration as Parcel to bundle this sandbox, you can find more\n  info about Parcel \n  <a href=\"https://parceljs.org\" target=\"_blank\" rel=\"noopener noreferrer\">here</a>.\n</div>\n";
var supabaseUrl = "https://cinvrhnlxmkszbrirgxg.supabase.co";
var supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjIxNzMzMCwiZXhwIjoxOTUxNzkzMzMwfQ.AUCfgsxVNn7LyUIoqqxYsF4Rqs-CeQEkLNBwKBzkpBo";
var supabase = (0, _supabaseJs.createClient)(supabaseUrl, supabaseKey);

function signUp(_x, _x2, _x3, _x4, _x5) {
  return _signUp.apply(this, arguments);
}

function _signUp() {
  _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pEmail, pPassword, pFirstName, pLastName, pErrorElement) {
    var _yield$supabase$auth$, user, session, error;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return supabase.auth.signUp({
              email: pEmail,
              password: pPassword
            }, {
              data: {
                first_name: pFirstName,
                last_name: pLastName
              }
            });

          case 2:
            _yield$supabase$auth$ = _context2.sent;
            user = _yield$supabase$auth$.user;
            session = _yield$supabase$auth$.session;
            error = _yield$supabase$auth$.error;

            if (error) {
              displayError(error, pErrorElement);
            } else {
              sessionStorage.setItem("user_obj", JSON.stringify(user));
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signUp.apply(this, arguments);
}

function signIn(_x6, _x7, _x8) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pEmail, pPassword, pErrorElement) {
    var _yield$supabase$auth$2, user, session, error;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return supabase.auth.signIn({
              email: pEmail,
              password: pPassword
            });

          case 2:
            _yield$supabase$auth$2 = _context3.sent;
            user = _yield$supabase$auth$2.user;
            session = _yield$supabase$auth$2.session;
            error = _yield$supabase$auth$2.error;

            if (error) {
              displayError(error, pErrorElement);
            } else {
              sessionStorage.setItem("user_obj", JSON.stringify(user));
              sessionStorage.setItem("session_key", JSON.stringify(session));
            }

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _signIn.apply(this, arguments);
}

function displayError(error, errorElement) {
  errorElement.innerHTML = "<h1>".concat(error.message, "</h1>");
}

signIn("15BoltonT@nobel.herts.sch.uk", "jenson", document.getElementById("app")).then(function () {});
console.log(JSON.parse(sessionStorage.getItem("user_obj")).id);

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _yield$supabase$stora, data, error;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return supabase.storage.createBucket(JSON.parse(sessionStorage.getItem("user_obj")).id, {
            public: false
          });

        case 2:
          _yield$supabase$stora = _context.sent;
          data = _yield$supabase$stora.data;
          error = _yield$supabase$stora.error;
          console.log(data);
          console.log(error);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
},{"@supabase/supabase-js":"node_modules/@supabase/supabase-js/dist/module/index.js","./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54973" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map