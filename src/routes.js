const express = require("express");

const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const PatientController = require("./controllers/PatientController");
const ExamController = require("./controllers/ExamController");

const AuthMiddleware = require("./middlewares/auth");

const routes = express.Router();

// USER ROUTES
routes.post('/users/login', UserController.login);

routes.get('/users/list', AuthMiddleware, UserController.list)
routes.post('/users/insert', AuthMiddleware, UserController.insert);
routes.delete('/users/delete/:user_id', AuthMiddleware, UserController.delete);


// COMPANY ROUTES
routes.get('/companies/list', AuthMiddleware, CompanyController.list)
routes.post('/companies/insert', AuthMiddleware, CompanyController.insert);
routes.delete('/companies/delete/:company_id', AuthMiddleware, CompanyController.delete);

// PATIENT ROUTES
routes.get('/patients/list', AuthMiddleware, PatientController.list)
routes.post('/patients/insert/company/:company_id', AuthMiddleware, PatientController.insert);
routes.delete('/patients/delete/:patient_id', AuthMiddleware, PatientController.delete);

//EXAM ROUTES
routes.get('/exams/list', AuthMiddleware, ExamController.list)
routes.post('/exams/insert/user/:user_id/patient/:patient_id', AuthMiddleware, ExamController.insert);
routes.delete('/exams/delete/:id', AuthMiddleware, ExamController.delete);

module.exports = routes