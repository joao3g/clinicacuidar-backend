const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Company = require("../models/Company");
const Patient = require("../models/Patient");
const Exam = require("../models/Exam");

const connection = new Sequelize(dbConfig);

User.init(connection);
Company.init(connection);
Patient.init(connection);
Exam.init(connection);

User.associate(connection.models);
Company.associate(connection.models);
Patient.associate(connection.models);
Exam.associate(connection.models);

module.exports = connection;