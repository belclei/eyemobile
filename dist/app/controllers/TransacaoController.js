"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _datefns = require('date-fns');
var _Transacao = require('../models/Transacao'); var _Transacao2 = _interopRequireDefault(_Transacao);

function getParameters(modalidade) {
  const parameters = {
    debito: () => ({ prazo: 1, taxa: 2 }),
    credito: () => ({ prazo: 31, taxa: 3 }),
  };
  return parameters[modalidade];
}

class TransacaoController {
  async store(req, res) {
    const { nsu, modalidade, valor, horario } = req.body;

    const nsuExists = await _Transacao2.default.findOne({ where: { nsu } });
    if (nsuExists) {
      return res.status(409).json({ error: 'NSU already exists.' });
    }

    /**
     * Achei melhor persistir os valores de liquido e disponível.
     * Em caso de alteração de taxas e prazos,
     * as transações anteriores não são afetadas.
     */
    const parameters = getParameters(modalidade)();
    const liquido = Math.round(valor * (100 - parameters.taxa)) / 100;
    let disponivel = _datefns.addDays.call(void 0, _datefns.parseISO.call(void 0, horario), parameters.prazo);
    while (_datefns.isWeekend.call(void 0, disponivel)) {
      disponivel = _datefns.addDays.call(void 0, disponivel, 1);
    }

    return res.json(
      await _Transacao2.default.create({ ...req.body, disponivel, liquido })
    );
  }
}

exports. default = new TransacaoController();
