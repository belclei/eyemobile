import { parseISO, addDays, isWeekend } from 'date-fns';
import Transacao from '../models/Transacao';

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

    const nsuExists = await Transacao.findOne({ where: { nsu } });
    if (nsuExists) {
      return res.status(400).json({ error: 'NSU already exists.' });
    }

    /**
     * Achei melhor persistir os valores de liquido e disponível.
     * Em caso de alteração de taxas e prazos,
     * as transações anteriores não são afetadas.
     */
    const parameters = getParameters(modalidade)();
    const liquido = Math.round(valor * (100 - parameters.taxa)) / 100;
    let disponivel = addDays(parseISO(horario), parameters.prazo);
    while (isWeekend(disponivel)) {
      disponivel = addDays(disponivel, 1);
    }

    return res.json(
      await Transacao.create({ ...req.body, disponivel, liquido })
    );
  }
}

export default new TransacaoController();
