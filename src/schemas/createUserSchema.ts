import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password must be 8 characters or longer")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Passwor must contain at least one special character"),
    permissions: z.array(
        z.object({
           manage_podcasts: z.boolean(),
           manage_posts: z.boolean(),
           view_podcasts: z.boolean(),
           view_posts: z.boolean(),
           manage_cyphers: z.boolean(),
           view_cyphers: z.boolean(),
           manage_users: z.boolean()
        })
    )
});