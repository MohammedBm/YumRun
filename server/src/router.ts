import { Router } from "express";
import db from "./db";
const router = Router();
import { createUser, fetchUser, getAllUsers, updateCurrentUser } from './controller/User.Controller'
import { createStore, fetchStore } from "./controller/Store.Controller";


// routers are the supp ui for the app
// app is the whole API

//* user routes


/**
 * @openapi
 * /api/user:
 *  get:
 *    tags:
 *    - User
 *    description: Get all users
 *    responses:
 *      200:
 *        description: A list of users
 *      403:
 *        description: Unauthorized
 *  post:
 *    tags:
 *    - User
 *    description: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      200:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: User already exists
 *      400:
 *        description: Bad request
 */
router.get("/user", getAllUsers);

router.post("/user", createUser);
/**
 * @openapi
 * /api/user/:id:
 *  get:
 *    tags:
 *    - User
 *    description: Get all users
 *    responses:
 *      200:
 *        description: A list of users
 *      403:
 *        description: Unauthorized
 *  post:
 *    tags:
 *    - User
 *    description: Create a new 
 * 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      200:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: User already exists
 *      400:
 *        description: Bad request
 */
router.get("/user/:id", fetchUser);

router.put("/user/:id", updateCurrentUser);


router.delete("/user/:id", () => { });

//* Store Routers
router.get("/store", () => { });

router.get("/store/:id", fetchStore);

router.put("/store/:id", () => { });

router.post("/store/", createStore);

router.delete("/store/:id", () => { });

//* Update Point Route
router.get("/updatepoint", () => { });

router.get("/updatepoint/:id", () => { });

router.put("/updatepoint/:id", () => { });

router.post("updatepoint/", () => { });

router.delete("/updatepoint/:id", () => { });

export default router;
