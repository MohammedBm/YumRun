import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();
const db = app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger doc for helathcheck
/**
  * @openapi
  * /healthcheck:
  *  get:
  *     tags:
  *     - Healthcheck
  *     description: Responds if the app is up and running
  *     responses:
  *       200:
  *         description: App is up and running
  */
app.get("/healthcheck", async (req, res) => {
  res.sendStatus(200);
});

app.use('/api', router);
// why didn't we put the signup and signin routes in the router?
// because we don't want to protect the signup and signin routes
// we want to allow users to access these routes without a token
// so we put them outside of the router
// app.post('/user', createNewUser)
// app.post('/signin', signin)

export default app;
