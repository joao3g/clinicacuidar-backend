const Exam = require("../models/Exam");
const User = require("../models/User");
const Patient = require("../models/Patient");

module.exports = {
    async insert(req, res){
        const { path, type, result } = req.body;
        const { user_id, patient_id } = req.params;

        const user = await User.findByPk(user_id);
        if(!user) return res.status(404).json({ error: "User not found!" });

        const patient = await Patient.findByPk(patient_id);
        if(!patient) return res.status(404).json({ error: "Patient not found!" });

        const exam = await Exam.create({ path, type, result, user_id, patient_id });
        res.json(exam);
    },

    async list (req, res){
        const exams = await Exam.findAll();
        return res.json(exams);
    },

    async delete (req, res){
        const { id } = req.params;

        const exam = await Exam.findByPk(id);
        if(!exam) return res.status(404).json({ error: "Exam not found!" });

        await exam.destroy();
        return res.json()
    }
};