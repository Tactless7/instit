(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Calcul = require('./Calcul');

var _Calcul2 = _interopRequireDefault(_Calcul);

var _Conjugaison = require('./Conjugaison');

var _Conjugaison2 = _interopRequireDefault(_Conjugaison);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      showCalcul: false,
      showConjugaison: false
    };

    _this.calculClick = _this.calculClick.bind(_this);
    _this.conjugaisonClick = _this.conjugaisonClick.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'calculClick',
    value: function calculClick() {
      this.setState({
        showConjugaison: false,
        showCalcul: true
      });
    }
  }, {
    key: 'conjugaisonClick',
    value: function conjugaisonClick() {
      this.setState({
        showCalcul: false,
        showConjugaison: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'content' },
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'button',
                { onClick: this.calculClick },
                ' Calcul Mental '
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'button',
                { onClick: this.conjugaisonClick },
                ' Conjugaison '
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'settings' },
          this.state.showCalcul ? _react2.default.createElement(_Calcul2.default, null) : null,
          this.state.showConjugaison ? _react2.default.createElement(_Conjugaison2.default, null) : null
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/Calcul.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calcul = function (_React$Component) {
  _inherits(Calcul, _React$Component);

  function Calcul() {
    _classCallCheck(this, Calcul);

    return _possibleConstructorReturn(this, (Calcul.__proto__ || Object.getPrototypeOf(Calcul)).apply(this, arguments));
  }

  _createClass(Calcul, [{
    key: "handleClickGenerate",
    value: function handleClickGenerate() {}
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "form",
        null,
        _react2.default.createElement(SeriesNumber, null),
        _react2.default.createElement(CalculNumber, null),
        _react2.default.createElement(
          "span",
          null,
          "Op\xE9rations : "
        ),
        _react2.default.createElement(Addition, null),
        _react2.default.createElement(Substraction, null),
        _react2.default.createElement(
          "button",
          { id: "generate", onClick: this.handleClickGenerate },
          "G\xE9n\xE9rer des s\xE9ries"
        )
      );
    }
  }]);

  return Calcul;
}(_react2.default.Component);

exports.default = Calcul;

var SeriesNumber = function (_React$Component2) {
  _inherits(SeriesNumber, _React$Component2);

  function SeriesNumber(props) {
    _classCallCheck(this, SeriesNumber);

    var _this2 = _possibleConstructorReturn(this, (SeriesNumber.__proto__ || Object.getPrototypeOf(SeriesNumber)).call(this, props));

    _this2.state = { value: 0 };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(SeriesNumber, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "label",
        { htmlFor: "seriesNumber" },
        "Nombre de s\xE9ries :",
        _react2.default.createElement("input", { name: "seriesNumber", id: "seriesNumber", type: "number", value: this.state.value, onChange: this.handleChange })
      );
    }
  }]);

  return SeriesNumber;
}(_react2.default.Component);

var CalculNumber = function (_React$Component3) {
  _inherits(CalculNumber, _React$Component3);

  function CalculNumber() {
    _classCallCheck(this, CalculNumber);

    return _possibleConstructorReturn(this, (CalculNumber.__proto__ || Object.getPrototypeOf(CalculNumber)).apply(this, arguments));
  }

  _createClass(CalculNumber, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "label",
        { htmlFor: "calculNumber" },
        "S\xE9ries de :",
        _react2.default.createElement("input", { name: "calculNumber", id: "calculNumber", type: "number" })
      );
    }
  }]);

  return CalculNumber;
}(_react2.default.Component);

var Addition = function (_React$Component4) {
  _inherits(Addition, _React$Component4);

  function Addition() {
    _classCallCheck(this, Addition);

    return _possibleConstructorReturn(this, (Addition.__proto__ || Object.getPrototypeOf(Addition)).apply(this, arguments));
  }

  _createClass(Addition, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "label",
        null,
        _react2.default.createElement("input", { id: "addition", value: "addition", type: "checkbox" }),
        "Addition"
      );
    }
  }]);

  return Addition;
}(_react2.default.Component);

var Substraction = function (_React$Component5) {
  _inherits(Substraction, _React$Component5);

  function Substraction() {
    _classCallCheck(this, Substraction);

    return _possibleConstructorReturn(this, (Substraction.__proto__ || Object.getPrototypeOf(Substraction)).apply(this, arguments));
  }

  _createClass(Substraction, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "label",
        null,
        _react2.default.createElement("input", { id: "substraction", value: "substraction", type: "checkbox" }),
        "Soustraction"
      );
    }
  }]);

  return Substraction;
}(_react2.default.Component);
});

;require.register("components/Conjugaison.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Conjugaison = function (_React$Component) {
	_inherits(Conjugaison, _React$Component);

	function Conjugaison() {
		_classCallCheck(this, Conjugaison);

		return _possibleConstructorReturn(this, (Conjugaison.__proto__ || Object.getPrototypeOf(Conjugaison)).apply(this, arguments));
	}

	_createClass(Conjugaison, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'h2',
				null,
				' Working on Progress '
			);
		}
	}]);

	return Conjugaison;
}(_react2.default.Component);

exports.default = Conjugaison;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Calcul from 'components/Calcul';

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));
});
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map