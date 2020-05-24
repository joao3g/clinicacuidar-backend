const Company = require("../models/Company");

module.exports = {
    async list(req, res){
        const companies = await Company.findAll();

        return res.json(companies);
    },

    async insert(req, res){
        const { name, cnpj } = req.body;

        const company = await Company.create({ name, cnpj });

        return res.json(company);
    },

    async delete(req, res){
        const { company_id } = req.params;

        const company = await Company.findByPk(company_id);
        if(!company) return res.status(404).json({ error: "Company not found!" });

        await company.destroy();
        return res.json();
    }
};