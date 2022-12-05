const { model } = require("mongoose");
let signUpModel = require("../models/model");
// let jwt = require("jsonwebtoken");



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

// //====================================< login Authores >===========================================

// const loginAuthor = async function(req, res){
//     try {
//         let requestBody = req.body;

//         if (!isValidReqestBody(requestBody)) {
//             res.status(400).send({ status: false, message: "Invalid request parameter. Please provide login details" });
//             return
//         }

//         // Extract params
//         const { email, password } = requestBody;

//         // validation starts is here
//         if (!isValid(email)) {
//             res.status(400).send({ status: false, msg: "Email is required" });
//             return
//         };

//         if (!isValid((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email))) {
//             res.status(400).send({ status: false, message: "Please provide valid email address" })
//             return
//         }

//         if (!isValid(password)) {
//             res.status(400).send({ status: false, msg: "Password is required" });
//             return
//         }
//         // Validation ends

//         const author = await authorModel.findOne({ email, password });

//         if (!author) {
//             res.status(400).send({ status: false, message: "Invalid login credential" });
//             return
//         }

//         let token = await jwt.sign({
//             authorId: author._id,
//             iat: Math.floor(Date.now() / 1000),
//             exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
//         },
//          "Sunil_project_01");

//         res.header('x-api-key', token);
//         res.status(201).send({ status: true, message: "Author login successfully", data: { token } })

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message })
//     }
// }


module.exports = { signup_User }