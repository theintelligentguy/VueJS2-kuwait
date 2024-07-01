module.exports = (sequelize, DataTypes) => {
    const SecurityTransaction = sequelize.define('SecurityTransaction', {
        securityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return SecurityTransaction;
};
