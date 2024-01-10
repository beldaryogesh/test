const Admin = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwtToken = require('../constant/jwtToken');

const createAdmin = async function (req, res) {
  try {
    let admin = await Admin.findOne({});
    if(admin){
        return res.status(200).json({errorCode : 400, message : 'Admin Is Already Exist'})
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, 8);
    let obj = {
      email: req.body.email,
      password: encryptedPassword,
    };
    await Admin.create(obj);
    return res
      .status(200)
      .json({ erroCode: 200, message: "Admin Create Sucessfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errorCode: 500, message: "Internal Server Error" });
  }
};


const AdminLogin = async function(req, res){
    try {
        let { email, password } = req.body;

        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(200).json({errorCode : 404, message : 'Admin Not Found'})
        }
        const decryptPassword = admin.password;
        const pass = await bcrypt.compare(password, decryptPassword)
        if(!pass){
            return res.status(200).json({errorCode : 400, message : "Password Incorrect"})
        }
        let token = jwtToken(admin);
        res.setHeader('x-api-key', token);
        {
            return res.status(200).json({
                errorCode : 200,
                message : 'Admin Login Successfully',
                token : token
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}
module.exports = {
  createAdmin,
  AdminLogin
};
