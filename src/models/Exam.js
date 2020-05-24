const { Model, DataTypes } = require("sequelize");

class Exam extends Model {
    static init(connection){
        super.init({
            path: DataTypes.STRING,
            type: DataTypes.STRING,
            result: DataTypes.INTEGER
        }, {
            sequelize: connection,
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
    }
}

module.exports = Exam