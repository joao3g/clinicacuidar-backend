const express = require("express");

const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const PatientController = require("./controllers/PatientController");
const ExamController = require("./controllers/ExamController");

const routes = express.Router();

// USER ROUTES
routes.get('/users/list', UserController.list)
routes.post('/users/insert', UserController.insert);
routes.delete('/users/delete/:user_id', UserController.delete);

// COMPANY ROUTES
routes.get('/companies/list', CompanyController.list)
routes.post('/companies/insert', CompanyController.insert);
routes.delete('/companies/delete/:company_id', CompanyController.delete);

// PATIENT ROUTES
routes.get('/patients/list', PatientController.list)
routes.post('/patients/insert/company/:company_id', PatientController.insert);
routes.delete('/patients/delete/:patient_id', PatientController.delete);

//EXAM ROUTES
routes.get('/exams/list', ExamController.list)
routes.post('/exams/insert/user/:user_id/patient/:patient_id', ExamController.insert);
routes.delete('/exams/delete/:id', ExamController.delete);

module.exports = routes