import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { NoteValidation } from "@/lib/validation";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/authContext";
import { Note } from "@/types";

 
type PostFormProps = {
  action: 'Create'| 'Update';
  note?: Note
}

const NoteForm = ({ action, note} : PostFormProps) => {
  const { user, token } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();


  const form = useForm<z.infer<typeof NoteValidation>>({
    resolver: zodResolver(NoteValidation),
    defaultValues: {
      userId: user?._id,
      title: note?.title || "",
      text: note?.text || "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof NoteValidation>) {
    try {

      const urlencoded = new URLSearchParams();
      urlencoded.append("userId", values.userId);
      urlencoded.append("title", values.title);
      urlencoded.append("text", values.text);
  
      const requestOptions: RequestInit = {
        method: action === 'Update' ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}`},
        body: urlencoded,
      };
  
      const response = await fetch(`https://crud-notes.vercel.app/notes/${note?._id || ''}${action === 'Update' ? "/update" : ""}`, requestOptions);
  
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const contentType = response.headers.get('content-type');
  
        if (contentType?.includes('text/html')) {
          const errorText = await response.text();
          console.error("Error HTML:", errorText);
          return toast({ title: "An unexpected error occurred. Please try again." });
        }
  
        const errorData = await response.json();
        console.error("Error data:", errorData);
        return toast({ title: "Saving Note failed. Please try again." });
      }
  
      const newNote = await response.json();
  
      if (!newNote) {
        return toast({ title: "Saving Note failed. Please try again." });
      } else {
        toast({ title: "Note saved successfully!" });
        navigate('/');
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({ title: "An unexpected error occurred. Please try again." });
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-9 w-full max-w-5xl">
         <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex gap-1 flex-col">
              <FormLabel className="shad-form_label">Title</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="shad-form_label">Text</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea p-2 custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <Button type="submit"
        className="shad-button_primary whitespace-nowrap">
           {action === 'Update' ? 'Update' : 'Save'}
        </Button>
       {action === "Update" && (<Button onClick={() => navigate("/")}
        className="shad-button_primary bg- whitespace-nowrap">
           Cancel
        </Button>)}
      </form>
    </Form>
  )
}

export default NoteForm;
