"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Transacao = require('../models/Transacao'); var _Transacao2 = _interopRequireDefault(_Transacao);

class SaldoController {
  async index(req, res) {
    const somaValorDisponivel = await _Transacao2.default.findOne({
      attributes: [[_sequelize.fn.call(void 0, 'SUM', _sequelize.col.call(void 0, 'liquido')), 'disponivel']],
      where: {
        disponivel: { [_sequelize.Op.lte]: new Date() },
      },
      raw: true,
    });
    const somaValorReceber = await _Transacao2.default.findOne({
      attributes: [[_sequelize.fn.call(void 0, 'SUM', _sequelize.col.call(void 0, 'liquido')), 'receber']],
      where: {
        disponivel: { [_sequelize.Op.gt]: new Date() },
      },
      raw: true,
    });

    const { disponivel } = somaValorDisponivel;
    const { receber } = somaValorReceber;

    const extrato = {
      disponivel: disponivel || 0,
      receber: receber || 0,
    };
    return res.json(extrato);
  }
}

exports. default = new SaldoController();
