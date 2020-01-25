import { fn, col, Op } from 'sequelize';
import Transacao from '../models/Transacao';

class SaldoController {
  async index(req, res) {
    const somaValorDisponivel = await Transacao.findOne({
      attributes: [[fn('SUM', col('liquido')), 'disponivel']],
      where: {
        disponivel: { [Op.lte]: new Date() },
      },
      raw: true,
    });
    const somaValorReceber = await Transacao.findOne({
      attributes: [[fn('SUM', col('liquido')), 'receber']],
      where: {
        disponivel: { [Op.gt]: new Date() },
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

export default new SaldoController();
