import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const userSchema=new Schema({
    name: {
        type: String,
        require: true,
        minLength: 2,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 4
    },
    rootDirId:{
        type: Schema.Types.ObjectId,
        require: true,
    }
});

const Users=mongoose.models.User || mongoose.model('User', userSchema);

export default Users;