import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const userSchema=new Schema({
    name: {
        type: String,
        require: true,
        minLength: [2,"name must atleast 2 character"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please, enter valid email"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: [4,"Password must be alteast 4 character"]
    },
    rootDirId:{
        type: Schema.Types.ObjectId,
        require: true,
    }
});

const Users=mongoose.models.User || mongoose.model('User', userSchema);

export default Users;