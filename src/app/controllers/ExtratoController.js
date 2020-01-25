import Transacao from '../models/Transacao';

class ExtratoController {
  async index(req, res) {
    const extrato = await Transacao.findAll({
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

export default new ExtratoController();
