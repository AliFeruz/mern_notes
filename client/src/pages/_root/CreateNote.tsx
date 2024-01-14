import NoteForm from "@/components/shared/NoteForm"
import { PencilIcon } from '@heroicons/react/24/solid'



const CreateNote = () => {
  return (
    <div className="flex flex-1 mt-24">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
      <PencilIcon className="w-[30px] h-[30px] icon" />
      <h2 className="text-3xl font-bold text text-left w-full">Write a Note</h2>
      </div>
      <NoteForm action="Create"/>
    </div>
  </div>
  )
}

export default CreateNote