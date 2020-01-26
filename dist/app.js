"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);
require('express-async-errors');

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
require('./database');
require('dotenv/config');
var _swaggerjson = require('./swagger.json'); var _swaggerjson2 = _interopRequireDefault(_swaggerjson);

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(_cors2.default.call(void 0, ));
    this.server.use(_express2.default.json());
  }

  routes() {
    this.server.use(
      '/api-docs',
      _swaggeruiexpress2.default.serve,
      _swaggeruiexpress2.default.setup(_swaggerjson2.default)
    );
    this.server.use('/api/v1', _routes2.default);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new (0, _youch2.default)(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

exports. default = new App().server;
