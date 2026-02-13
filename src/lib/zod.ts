import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title minimal 1 karakter"),
  body: z.string().min(1, "Body minimal 1 karakter"),
});

export type CretaNoteValues = z.infer<typeof createNoteSchema>;
