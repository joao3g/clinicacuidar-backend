const { Model, DataTypes } = require("sequelize");

class Company extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            cnpj: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }

    static associate(models){
        this.hasMany(models.Patient, { foreignKey: 'company_id', as: 'patients' });
    }
}

module.exports = Company