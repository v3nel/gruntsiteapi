import { Router, Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";
import { hashPassword } from "../auth/hash.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { createUserSchema } from "../schemas/createUserSchema.js";
import { usersExists } from "../auth/exists.js";
import { generateAndStoreJWT } from "../auth/genstorejwt.js";
import { verifyHash } from "../auth/verify.js";

const userRouter = Router();


/**
 * @openapi
 * /users/login:
 *  post:
 *      summary: Login
 *      description: Login to your account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "johndoe@gmail.com"
 *                          password:
 *                              type: string
 *                              example: "Supersecurepass!1234"
 *      responses:
 *          200:
 *              description: Login successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Successfully logged in"
 *                              email:
 *                                  type: string
 *                                  example: "johndoe@gmail.com"
 *                              jwt:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....jz9KN_7KtAE"
 *          401:
 *              description: Login failed for bad combinaison
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              errror:
 *                                  type: string
 *                                  example: "This email/password combinaison does not exist"
 */
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const exists = await usersExists(email);
        
        if (!exists) {
            return res.status(401).json({ error: "This email/password combinaison does not exist"});
        }

        const userq = await db.select().from(users).where(eq(users.email, email)).limit(1);
        const user = userq[0];

        const isValid = verifyHash(user.hashed_password, password);

        if (!isValid) {
            return res.status(401).json({error: "This email/password combinaison does not exist"});
        }

        if (!user.jwt) {
            const token = await generateAndStoreJWT(user.id, user.email);
            return res.status(200).json({ message: "Successfully logged in", email: user.email, jwt: token});
        }

        return res.status(200).json({ message: "Successfully logged in", email: user.email, jwt: user.jwt});
    } catch(err) {
        next(err)
    }
});

/**
 * @openapi
 * /users:
 *  get:
 *      summary: Retrieve users
 *      description: Retrieve a list of all the users of the dashboard
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      example: 1
 *                                  email:
 *                                      type: string
 *                                      example: "johndoe@gmail.com"
 *                                  permissions:
 *                                      type: object
 *                                      properties:
 *                                          manage_podcasts:
 *                                              type: boolean
 *                                              example: true
 *                                          manage_posts:
 *                                              type: boolean
 *                                              example: false
 *                                          view_podcasts:
 *                                              type: boolean
 *                                              example: true
 *                                          view_posts:
 *                                              type: boolean
 *                                              example: true
 *                                          manage_cyphers:
 *                                              type: boolean
 *                                              example: false
 *                                          view_cyphers:
 *                                              type: boolean
 *                                              example: true
 *                                          manage_users:
 *                                              type: boolean
 *                                              example: false
 */
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userTable = await db.select().from(users);
        return res.status(200).json(userTable);
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /users:
 *  post:
 *      summary: Create user
 *      description: Allows authorized users to create an user on the dashboard
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                          - permissions
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "johndoe@gmail.com"
 *                          password:
 *                              type: string
 *                              example: "Supersecretpassword"
 *                          permissions:
 *                              type: object
 *                              properties:
 *                                  manage_podcasts:
 *                                      type: boolean
 *                                  manage_posts:
 *                                      type: boolean
 *                                  view_podcasts:
 *                                      type: boolean
 *                                  view_posts:
 *                                      type: boolean
 *                                  manage_cyphers:
 *                                      type: boolean
 *                                  view_cyphers:
 *                                      type: boolean
 *                                  manage_users:
 *                                      type: boolean
 *      responses:
 *          201:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User created with the next informations"
 *                              email:
 *                                  type: string
 *                                  example: "johndoe@gmail.com"
 *                              permissions:
 *                                  type: object
 *                                  properties:
 *                                      manage_podcasts:
 *                                          type: boolean
 *                                      manage_posts:
 *                                          type: boolean
 *                                      view_podcasts:
 *                                          type: boolean
 *                                      view_posts:
 *                                          type: boolean
 *                                      manage_cyphers:
 *                                          type: boolean
 *                                      view_cyphers:
 *                                          type: boolean
 *                                      manage_users:
 *                                          type: boolean
 *          409:
 *              description: User already exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "User with this email already exists"
 */
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = createUserSchema.parse(req.body);
        
        const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: "User with this email already exists" });
        }
        
        const hash = await hashPassword(body.password);
        await db.insert(users).values([
            {
                email: body.email,
                hashed_password: hash,
                permissions: body.permissions
            }
        ]);
        return res.status(201).json({
            message: "User created with the next informations",
            email: body.email,
            permissions: body.permissions
        });
    } catch(err) {
        next(err);
    }
});

userRouter.patch("/", (req: Request, res: Response) => {

});

export default userRouter;