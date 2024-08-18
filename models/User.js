import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
  role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:true
    }
}
, {
    timestamps: true,
});
const User = model("User", userSchema);
export default User;
