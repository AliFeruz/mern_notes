
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
import { loginValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";


const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  

const form = useForm<z.infer<typeof loginValidation>>({
  resolver: zodResolver(loginValidation),
  defaultValues: {
    email: '',
    password: '',
  },
});


async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      const loggedInResponse = await fetch(
        "http://localhost:8080/auth/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values),
        }
    );
    const loggedIn = await loggedInResponse.json();
    if (!loggedIn) {
      return toast({ title: "Sign up failed. Please try again." })
    } if (loggedIn) {
      localStorage.setItem("user", JSON.stringify(loggedIn.user));
      localStorage.setItem("token", loggedIn.token);
      navigate('/')
    }
    } catch (error) {
      console.log(error)
    }   
};

  return (
    <>
       <Form {...form} >
      <div className="flex justify-center items-center mt-6 flex-col">
        <h1 className="text-6xl text-orange-500 items-center p-2">NoteS</h1>
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">Log in to your account</h2>
        <p className="text-blue-800 dark:text-green-300 small-medium 
        md:base-regular mt-2">Welcome back! Please enter your details</p>
     
    <form onSubmit={form.handleSubmit(onSubmit)} 
    className="flex flex-col gap-5 w-full mt-4">
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
        Sign In
      </Button>
      <p className="text-small-regular text-blue-800 dark:text-green-300 text-center mt-2">
        Don't have an account?
        <Link to="/sign-up"
        className="text-orange-500 text-small-semibold ml-1"> Sign up</Link>
      </p>
    </form>
    </div>
  </Form>
 </>
 )
}

export default SignInForm;
