import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { registerValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";


const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  

const form = useForm<z.infer<typeof registerValidation>>({
  resolver: zodResolver(registerValidation),
  defaultValues: {
    username: '',
    email: '',
    password: '',
  },
});


async function onSubmit(values: z.infer<typeof registerValidation>) {
  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", values.username);
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const newUser = await fetch("http://localhost:8080/auth/register", requestOptions)
      if (!newUser) {
        return toast({ title: "Sign up failed. Please try again." })
      } else {
        navigate('/sign-in')
      }
    } catch (error) {
      console.log(error)
    }   
};

  return (
    <>
       <Form {...form} >
      <div className="sm:w-420 flex-center flex-col">
      <h1 className="text-6xl text-orange-500 p-2">Note<span className="text-blue-800 dark:text-green-100">.</span>S</h1>
      <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">Create a new account</h2>
      <p className="dark:text-green-300 text-blue-800 small-medium 
        md:base-regular mt-2">To use NoteS, please enter your details</p>
     
    <form onSubmit={form.handleSubmit(onSubmit)}
    className="flex flex-col gap-6 w-full mt-5">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="flex gap-1 flex-col">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex gap-1 flex-col">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="flex gap-1 flex-col">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit"
      className="shad-button_primary">
        SignUp
      </Button>
      <p className="text-small-regular text-blue-800 dark:text-green-300 text-center mt-2">
        Already have an account?
        <Link to="/sign-in"
        className="text-orange-500 text-small-semibold ml-1"> Log in</Link>
      </p>
    </form>
    </div>
  </Form>
 </>
 )
}

export default SignUpForm;
