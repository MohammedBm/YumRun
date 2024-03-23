import { Router } from "express";
import db from "./db";
const router = Router();
import { createUser } from './controller/User.Controller'


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
router.get("/user", async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  //get user by id
  const userRef = db.collection("users").doc(req.params.id);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json({ id: doc.id, data: doc.data() });
  }
});

router.put("/user/:id", () => { });

// post method
router.post("/user", createUser);


router.delete("/user/:id", () => { });

//* Update Routers
router.get("/update", () => { });

router.get("/update/:id", () => { });

router.put("/update/:id", () => { });

router.post("update/", () => { });

router.delete("/update/:id", () => { });

//* Update Point Route
router.get("/updatepoint", () => { });

router.get("/updatepoint/:id", () => { });

router.put("/updatepoint/:id", () => { });

router.post("updatepoint/", () => { });

router.delete("/updatepoint/:id", () => { });

export default router;
