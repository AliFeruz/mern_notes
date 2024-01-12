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
  const { user } = useUserContext();
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
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("userId", values.userId);
        urlencoded.append("title", values.title);
        urlencoded.append("text", values.text);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded
        };

        const response = await fetch(`http://localhost:8080/notes`, requestOptions);

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            const errorData = await response.json();
            console.error("Error data:", errorData);

            return toast({ title: "Saving Note failed. Please try again." });
        }

        const newNote = await response.json();

        if (!newNote) {
            return toast({ title: "Saving Note failed. Please try again." });
        } else {
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
          Save
        </Button>
      </form>
    </Form>
  )
}

export default NoteForm;
