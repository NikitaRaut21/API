import User from "./../models/User.js"
import bcrypt, { hash } from 'bcrypt'
const saltRounds = 10;
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

const PostUser = async (req, res) => {
    const { name, email, password, age, mobileNo,role } = req.body;
    const user = new User({
        name,
        email,
        password: await hashPassword(password),
        age,
        mobileNo,
        role

    })
    try {
        const savedUser = await user.save();
        res.json({
            success: true,
            message: "user created successfully",
            data: savedUser

        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null,
        })
    }
}
const getAlluser = async (req, res) => {
    const user = await User.find().select('-password');
    res.json({
        success: true,
        user: user,
        message: "user fetch successfully"

    })
}
const getById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.json({
            success: false,
            message: 'user not found',
            data: null
        })
    }
    const userData = {
        name: user.name,
        email: user.email,
        age: user.age,
        mobileNo: user.mobileNo,
      password: await hashPassword(user.password),
    role: user.role,
        _id: user._id,
        _v: user._v
    }
    res.json({
        success: true,
        message: "user find successfully",
        data: userData
    })
}
const putUser = async (req, res) => {
    const { name, email, mobileNo, age } = req.body;
    const { id } = req.params;
  

    await User.updateOne({ _id: id }, {
        $set: {
            name: name,
            email: email,
            mobileNo: mobileNo,
            age: age

        }
    })
    const updateUser = await User.findById(id);
    res.json({
        success: true,
        message: "user update successfully",
        data: updateUser
    })

}
const deleteUser = async (req, res) => {
    const { id } = req.params
    await User.deleteOne({
        _id: id
    })
    res.json({
        success: true,
        message: "user deleted successfully",
        data: null
    })
}
const PostLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
        return res.json({
    message: 'user not found',
 })
    const checkpassword= await bcrypt.compare(password,user.password)
    if(!checkpassword){
     return res.status(404).json({
        message:'incorrect password'
        })
       
    }
    return res.status(200).json({
        message:'user logged in successfully',
        user:user

     })
}

export { PostUser, getAlluser, getById, putUser, deleteUser, PostLogin  };