import Note from "../models/note.js";

export const createUserNote = async (req, res) => {
    try {
        const { userId, title, text } = req.body;
        const newNote = new Note({
            userId,
            title,
            text
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(404).json({ message: error.message});
        console.error("Error creating user note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getUserNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await Note.find({ userId});
        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};


export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const { title, text, userId } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, text, userId },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
