"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Transacao = require('../models/Transacao'); var _Transacao2 = _interopRequireDefault(_Transacao);

class ExtratoController {
  async index(req, res) {
    const extrato = await _Transacao2.default.findAll({
      attributes: [
        'nsu',
        'valor',
        'liquido',
        'bandeira',
        'modalidade',
        'horario',
        'disponivel',
      ],
    });
    return res.json(extrato);
  }
}

exports. default = new ExtratoController();
