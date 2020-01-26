"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Transacao extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nsu: _sequelize2.default.STRING,
        valor: _sequelize2.default.DOUBLE,
        bandeira: _sequelize2.default.ENUM('VISA', 'MASTERCARD', 'ELO', 'AMEX'),
        modalidade: _sequelize2.default.ENUM('credito', 'debito'),
        horario: _sequelize2.default.DATE,
        liquido: _sequelize2.default.DOUBLE,
        disponivel: _sequelize2.default.DATEONLY,
      },
      {
        sequelize,
        tableName: 'transacao',
      }
    );

    return this;
  }
}

exports. default = Transacao;
