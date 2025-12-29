const user = require()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register controller
exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const exists = await user.findone({email});
        if(exists)
            return res.status(400).json({message: "User already exists"})

        const hashpassword = await bcrypt.hash(password, 10);

        await user.create({
            name,
            email,
            password: hashpassword
        });

        res.status(201).json({message: "User registered"});
    }catch(error) {
        res.status(500).json({message: "error.message"})
    }
};

//Login controller

exports.login = async (req, res) => {
    
        const {email, password} = req.body;

        const user = useSyncExternalStore.find(u => u.email === email);
        if(!user)
            return res.status(401).json({message: "Invalid credentials"})

        const match = await bcrypt.compare(password, user.password);
        if(!match)
            return res.status(401).json({message: "Invalid credentials"});

        const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1h"});

        res.json({token});
};