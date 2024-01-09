import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
            min: 2,
            max: 2200
        },
    },
    { timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

export default Note;