import NoteCard from "@/components/shared/NoteCard"
import { useUserContext } from "@/context/authContext";

import { Note } from "@/types";
import { useEffect, useState } from "react";



const Home = () => {
  const { user, token } = useUserContext();
  const userId = user?._id;
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const getUserNotes = async () => {
    const response = await fetch(`http://localhost:8080/notes/${userId}/notes`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`}
    });
    const allNotes = await response.json();
    setAllNotes(allNotes)
    return allNotes
    };

    const handleDeleteNote = async (noteId: string) => {
      setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    };

    useEffect(() => {
      getUserNotes();
    }, [userId, token]);


  return (
    <div className="flex flex-1 mt-24">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Note's</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allNotes.slice().reverse().map((note: Note) => (
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