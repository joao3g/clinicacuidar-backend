const { Model, DataTypes } = require("sequelize");

class Patient extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            age: DataTypes.INTEGER
        }, {
            sequelize: connection,
        })
    }

    static associate(models){
        this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
        this.hasMany(models.Exam, { foreignKey: 'patient_id', as: 'exams' });
    }
}

module.exports = Patient