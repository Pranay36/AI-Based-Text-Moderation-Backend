const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signups = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // console.log("Request Body:", req.body);
         if (!password) {
           return res.status(400).json({ msg: "Password is required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        // console.error("Error in Signup:", err.message);
        res.status(500).send("Server error");

    }

};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
    

        const paylaod = { user: { id: user.id } };

        jwt.sign(paylaod, process.env.JWT_SECRET, {
            expiresIn: 3600
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

};

module.exports = { signups, login };
       
    