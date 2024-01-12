import NoteForm from "@/components/shared/NoteForm"
import { useUserContext } from "@/context/authContext";
import { Note } from "@/types";
import { PencilIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"



const UpdateNote = () => {
    const { _id } = useParams();
    const { user, token } = useUserContext();
    const userId = user?._id;
    const [note, setNote] = useState<Note | null>(null);

    const getCurrentNote = async () => {
        try {
          const response = await fetch(`https://crud-note.onrender.com/notes/${userId}/notes`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (response.ok) {
            const notes = await response.json();
            const foundNote = notes.find((note : Note) => note._id === _id);
    
            if (foundNote) {
              setNote(foundNote);
            } else {
              console.error("Note not found");
            }
          } else {
            console.error("Failed to fetch notes");
          }
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
    

  

    useEffect(() => {
        getCurrentNote();
      }, [userId, token, _id]);


  return (
    <div className="flex flex-1 mt-24">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
      <PencilIcon className="w-[30px] h-[30px] dark:text-cyan-600 text-cyan-900" />
      <h2 className="h3-bold md:h2-bold text-zinc-800 dark:text-cyan-600 text-left w-full">Update Note</h2>
      </div>
      {note && <NoteForm action="Update" note={note}/>}
    </div>
  </div>
  )
}

export default UpdateNote