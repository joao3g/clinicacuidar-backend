const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    async insert(req, res){
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });
        res.json(user);
    },

    async list (req, res){
        const users = await User.findAll({
            include: { association: "exams" }
        });
        return res.json(users);
    },

    async delete (req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);
        if(!user) return res.status(404).json({ error: "User not found!" });

        await user.destroy();
        return res.json()
    },

    async login(req, res, next){
        var { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email, password },
            attributes: { exclude: ['password'] }
        });
        if(!user) return res.status(404).json({ error: "Email or password are incorrect" });

        var { id, name, email } = user;
        const token = jwt.sign({ id, name, email }, process.env.SECRET);
        
        return res.json({ user, token });
    }
};