import Sequelize, { Model } from 'sequelize';

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        nsu: Sequelize.STRING,
        valor: Sequelize.DOUBLE,
        bandeira: Sequelize.ENUM('VISA', 'MASTERCARD', 'ELO', 'AMEX'),
        modalidade: Sequelize.ENUM('credito', 'debito'),
        horario: Sequelize.DATE,
        liquido: Sequelize.DOUBLE,
        disponivel: Sequelize.DATEONLY,
      },
      {
        sequelize,
        tableName: 'transacao',
      }
    );

    return this;
  }
}

export default Transacao;
