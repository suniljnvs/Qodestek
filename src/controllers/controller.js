const { model } = require("mongoose");
let signUpModel = require("../models/userModel");
let productModel = require("../models/productModel");
const jwt=require('jsonwebtoken');




//=================================================================================================


let signup_User = async function (req, res) {
    try {
        const requestBody = req.body;

        // Object Destructuring 
        let { fname, lname, gender, mobile, email, password } = requestBody;

        if (!mobile) {
            throw new Error("mobile no is required")
        }
        if (!password) {
            throw new Error("password is required")
        }

        let mobileNoIsUsed = await signUpModel.findOne({ mobile })
        if (mobileNoIsUsed) {
            throw new Error("this mobile no all ready used")
        }

        const newSignup = await signUpModel.create(requestBody);

        res.status(201).send({ status: true, message: "SignUp created successfully", data: newSignup })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//create  login API

const login_User = async function (req, res) {
    const mobile = req.body.mobile;
    const password = req.body.password;
    try {
        const user = await signUpModel.findOne({ mobile: mobile });
        if (user.password === password) {

            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    name: 'Sunil',

                    iat: Math.floor(Date.now() / 1000)
                },
                "secretSunil",

                { expiresIn: '1h' });

            res.setHeader('x-auth-key', token);
            res.status(200).send({ status: true, token: token, message: "login successfully" });

        } else {
            res.send({ message: "login failed" });
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating a create operation"
        });
    }
}


const create_Product = async function(req,res){
    try {
        const product = req.body;

        const productData = await productModel.create (product);
        res.status(201).send({ status: true, message: "Product created successfully", data:productData  })
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { signup_User, login_User,create_Product }