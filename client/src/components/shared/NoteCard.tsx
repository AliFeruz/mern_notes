import { multiFormatDateString } from "@/lib/utils";
import { Note } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/authContext";
import { Link } from "react-router-dom";



type Props = {
  note: Note;
  onDeleteNote: (noteId: string) => void;
};

const NoteCard = ({ note, onDeleteNote }: Props) => {
  const { title, text, createdAt, _id } = note;
  const { token } = useUserContext();

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(`https://crud-notes.vercel.app/notes/${_id}/note`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Note deleted successfully");
        onDeleteNote(_id); 
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="bg-cyan-100 dark:bg-gradient-to-t dark:from-[#17065c] dark:to-fuchsia-800 p-4 shadow-text rounded-md shadow-lg">
      
        <div className="flex items-center justify-between p-2 gap-3 mb-3">
            <Link to={`/update-note/${_id}`}>
            <PencilIcon className="w-6 h-6 icon"/>
            </Link>
            <Button variant="ghost" onClick={handleDeleteNote}>
            <TrashIcon className="w-6 h-6 icon"/>
            </Button>
        </div>
        <div className="p-2 border-t border-icon">
        <h1 className="text-xl text font-bold mb-2">{title}</h1>
        </div>
        <div className="p-2 h-[200px] rounded-md">
        <p className="text text-lg">{text}</p>
        </div>
      <div className="flex items-center mt-4 dark:text-cyan-200 border-t border-text pt-4 text-gray-500">
        <span>Created: {multiFormatDateString(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
