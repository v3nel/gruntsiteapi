import { z } from "zod";

export const patchUserSchema = z.object({
    id: z.string().length(24),
    email: z.string().email("L'email fourni doit être valide (ex: 'johndoe@gmail.com')"),
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
    ),
    
})