import NoteCard from "@/components/shared/NoteCard"
import { useUserContext } from "@/context/authContext";
import { Note } from "@/types";
import { useEffect, useState } from "react";


const Home = () => {
  const { user, token } = useUserContext();
  const userId = user?._id;
  const [notes, setNotes] = useState<Note[]>([]);

  const getUserNotes = async () => {
    const response = await fetch(`http://localhost:8080/notes/${userId}/notes`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`}
    });
    if (response.ok) {
      const notes = await response.json();
      setNotes(notes)
    }
    };

    const handleDeleteNote = async (noteId: string) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    };

    useEffect(() => {
      getUserNotes();
    }, [userId, token]);


  return (
    <div className="flex flex-1 mt-24">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <h2 className="h3-bold md:h2-bold text-zinc-800 dark:text-cyan-600 text-left w-full">All Note's</h2>
      </div>
      <div className="grid-container">
        {notes.slice().reverse().map((note: Note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDeleteNote={handleDeleteNote} 
          />
        ))}
      </div>
    </div>
  </div>
  )
}

export default Home