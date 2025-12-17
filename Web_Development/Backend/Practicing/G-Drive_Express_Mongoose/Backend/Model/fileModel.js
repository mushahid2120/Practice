import { model, Schema } from "mongoose";


const filesSchema=new Schema({
    name: {
        type: String,
        require: true,
        minLength: 1,
    },
    extension:{
        type: String,
        require: true,
    },
    parentDirId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'directories'
    }
})

const Files=model('files',filesSchema)

export default Files;