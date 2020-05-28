const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();

module.exports = {
    async insert(req, res){
        const { name, email, password } = req.body;

        await bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err) return res.status(400).json({ error: err });

            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: { 
                    name, 
                    email, 
                    password: hash 
                }
            });

            if(!created) return res.status(409).json({ error: "User already exists" })

            return res.json(user);
        });

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

    async login(req, res){
        var { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email }
        });

        if(!user) return res.status(404).json({ error: "Email not found" });

        await bcrypt.compare(password, user.password, async function(err, result){
            if(err) return res.status(400).json({ error: err });
            if(!result) return res.status(404).json({ error: "Password not found" });

            var { id, name, email } = user;
            const token = jwt.sign({ id, name, email }, process.env.SECRET);
            
            return res.json({ token });
        });

    }
};