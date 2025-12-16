import { model, Schema } from "mongoose";

const TodoSchema=new Schema({
    task: {
        type: String,
        require: [true,"task field is required"],
    },
    completed: {
        type: Boolean,
        require: [true,"completed field is required"],
        default: false
    }
},{
    strict: "throw"
})

const Todo=model("tasks",TodoSchema);

export default Todo;