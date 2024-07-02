module.exports = (sequelize, DataTypes) => {
    const SecurityTransaction = sequelize.define('SecurityTransaction', {
      TRADE_DATE: {
        type: DataTypes.DATE,
        allowNull: false
      },
      SECURITY_ACCOUNT: {
        type: DataTypes.STRING,
        allowNull: true
      },
      SAM_NAME: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SECURITY_NUMBER: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SECURITY_NAME: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TRANS_TYPE: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RECID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NO_NOMINAL: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      },
      PRICE: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      },
      NET_AMT_TRADE: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      },
      BROKER_COMMS: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      },
      PROF_LOSS_SEC_CCY: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
      }
    }, {
      tableName: 'SECURITY_TRANSACTIONS',
      timestamps: false
    });
  
    return SecurityTransaction;
  };
  