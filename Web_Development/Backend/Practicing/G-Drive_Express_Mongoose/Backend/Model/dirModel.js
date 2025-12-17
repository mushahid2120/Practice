import {model, Schema} from 'mongoose';

const dirSchema=new Schema({
    name: {
        type: String,
        require: [true, "name Field is required"],
    },
    parentDirId: {
        type: Schema.Types.ObjectId || null,
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
},{
    strict: "throw"
}
)

const Dir=model('directories',dirSchema)

export default Dir;