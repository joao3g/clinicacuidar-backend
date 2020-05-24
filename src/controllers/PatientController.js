const Patient = require("../models/Patient");
const Company = require("../models/Company");

module.exports = {
    async list(req, res){
        const patients = await Patient.findAll();

        return res.json(patients);
    },

    async insert(req, res){
        const { company_id } = req.params;
        const { name, age } = req.body;

        const company = await Company.findByPk(company_id);
        if(!company) return res.status(404).json({ error: "Company not found!" });

        const patient = await Patient.create({ name, age, company_id });

        return res.json(patient);
    },

    async delete(req, res){
        const { patient_id } = req.params;

        const patient = await Patient.findByPk(patient_id);
        if(!patient) return res.status(404).json({ error: "Patient not found!" });

        await patient.destroy();
        return res.json();
    }
};