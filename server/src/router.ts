import { Router } from "express";
import db from "./db";
const router = Router();
import { createUser, fetchUser, getAllUsers, updateCurrentUser } from './controller/User.Controller'
import { createStore, fetchStoreById, fetchStorebyUserId, getAllStores, updateOrderStatus, updateStore } from "./controller/Store.Controller";
import { param } from "express-validator";
import { createCheckoutSession, getMyOrders, getMyStoreOrders, stripeWebhookHandler } from "./controller/Order.Controller";
import express from "express";

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
router.get("/user", getAllUsers); // documented

router.post("/user", createUser); // documented
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
router.get("/user/:id", fetchUser); // doucmented

/**
 * @openapi
 * /api/user/:id:
 *  put:
 *    tags:
 *    - User
 *    description: Update a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: User already exists
 *      400:
 *        description: Bad request
 */
router.put("/user/:id", updateCurrentUser);


// router.delete("/user/:id", () => { });

//* Store Routers

// open api template for api doc
/**
 * @openapi
 * /api/store:
 *  get:
 *    tags:
 *    - Store
 *    description: Get all stores
 *    responses:
 *      200:
 *        description: A list of stores
 *      403:
 *        description: Unauthorized
 *  post:
 *    tags:
 *    - Store
 *    description: Create a new store
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateStore'
 *    responses:
 *      200:
 *        description: Store created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateStoreResponse'
 *      409:
 *        description: Store already exists
 *      400:
 *        description: Bad request
 */
router.get("/store", getAllStores); // documented

router.post("/store/", createStore); // documented

/**
 * @openapi
 * /api/store/:id:
 *  put:
 *    tags:
 *    - Store
 *    description: Update a store
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateStore'
 *    responses:
 *      200:
 *        description: Store updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateStoreResponse'
 *      409:
 *        description: Store already exists
 *      400:
 *        description: Bad request
 */
router.get("/store/:id", fetchStorebyUserId);

router.get("/storeid/:id", fetchStoreById);

router.put("/store/:id", updateStore);

router.patch('/order/:orderId/status', updateOrderStatus)

router.delete("/store/:id", () => { });

//* Order Routers
router.post("/order", getMyOrders)

router.post("/order/store-orders", getMyStoreOrders)

router.post("/order/checkout/create-checkout-session", createCheckoutSession)

router.post("/order/checkout/webhook", stripeWebhookHandler)

export default router;
