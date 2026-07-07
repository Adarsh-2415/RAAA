import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
