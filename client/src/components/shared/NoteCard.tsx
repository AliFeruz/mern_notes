import { multiFormatDateString } from "@/lib/utils";
import { Note } from "@/types";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";
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
    <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between p-2 gap-3 mb-3">
            <Button variant="ghost">
            <ArrowPathIcon className="w-6 h-6"/>
            </Button>
            <Button variant="ghost" onClick={handleDeleteNote}>
            <TrashIcon className="w-6 h-6"/>
            </Button>
        </div>
        <div className="p-2">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        </div>
        <div className="p-2 bg-green-200 rounded-md">
        <p className="text-gray-600">{text}</p>
        </div>
      <div className="flex items-center mt-4 border-t pt-4 text-gray-500">
        <span>Created at: {multiFormatDateString(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
