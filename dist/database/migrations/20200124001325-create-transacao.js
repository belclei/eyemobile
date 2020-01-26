"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transacao', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nsu: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      bandeira: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['VISA', 'MASTERCARD', 'ELO', 'AMEX'],
      },
      modalidade: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['debito', 'credito'],
      },
      horario: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      liquido: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      disponivel: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('transacao');
  },
};
