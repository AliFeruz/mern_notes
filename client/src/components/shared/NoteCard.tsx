import { multiFormatDateString } from "@/lib/utils";
import { Note } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/authContext";



type Props = {
  note: Note;
  onDeleteNote: (noteId: string) => void;
};

const NoteCard = ({ note, onDeleteNote }: Props) => {
  const { title, text, createdAt, _id } = note;
  const { token } = useUserContext();

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(`http://localhost:8080/notes/${_id}/note`, {
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
    <div className="bg-cyan-100 dark:bg-slate-200 p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between p-2 gap-3 mb-3">
            <Button variant="ghost">
            <PencilIcon className="w-6 h-6 text-cyan-900 dark:text-cyan-600"/>
            </Button>
            <Button variant="ghost" onClick={handleDeleteNote}>
            <TrashIcon className="w-6 h-6 text-cyan-90 dark:text-cyan-600"/>
            </Button>
        </div>
        <div className="p-2 border-t border-cyan-400">
        <h1 className="text-xl text-zinc-700 dark:text-cyan-600 font-bold mb-2">{title}</h1>
        </div>
        <div className="p-2 h-[200px] bg-cyan-200 dark:bg-slate-300 rounded-md">
        <p className="text-cyan-900">{text}</p>
        </div>
      <div className="flex items-center mt-4 border-t border-cyan-400 pt-4 text-gray-500">
        <span>Created at: {multiFormatDateString(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
