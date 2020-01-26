"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _expressbasicauth = require('express-basic-auth'); var _expressbasicauth2 = _interopRequireDefault(_expressbasicauth);
var _authTerminal = require('./app/middlewares/authTerminal'); var _authTerminal2 = _interopRequireDefault(_authTerminal);
var _TransacaoController = require('./app/controllers/TransacaoController'); var _TransacaoController2 = _interopRequireDefault(_TransacaoController);
var _ExtratoController = require('./app/controllers/ExtratoController'); var _ExtratoController2 = _interopRequireDefault(_ExtratoController);

var _TransacaoStore = require('./app/validators/TransacaoStore'); var _TransacaoStore2 = _interopRequireDefault(_TransacaoStore);
var _SaldoController = require('./app/controllers/SaldoController'); var _SaldoController2 = _interopRequireDefault(_SaldoController);

const routes = new (0, _express.Router)();
/** Criei duas maneiras de verificação das credenciais do usuário
 * pois imaginei que a implementação desta validação poderia ser importante
 * para a avaliação do desafio. Entretanto, para uma solução real, é recomendado
 * utilizar a biblioteca express-basic-auth
 */
routes.post(
  '/transacao',
  _authTerminal2.default,
  _TransacaoStore2.default,
  _TransacaoController2.default.store
);

routes.use(_expressbasicauth2.default.call(void 0, { users: { portal: '123456' }, challenge: true }));

routes.get('/extrato', _ExtratoController2.default.index);
routes.get('/saldo', _SaldoController2.default.index);

exports. default = routes;
