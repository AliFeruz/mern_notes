import * as z from "zod";

export const registerValidation = z.object({
    username: z.string().min(2, { message: 'too short'}),
    email: z.string().email(),
    password: z.string().min(7, { message: 'Password must be at least 7 characters'})
});

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(7, { message: 'Password must be at least 7 characters'})
});

export const NoteValidation = z.object({
    userId: z.string(),
    title: z.string().min(2).max(100),
    text: z.string().min(5).max(2200)
  });