import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors());
app.use(morgan("dev"));

//!! fixes the issue with stripe webhook caused by req.body being undefined
app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' })); //!! important

//!! DO NOT CHANGE THE ORDER OF THESE MIDDLEWARES
app.use(express.json()); //!! this must be under the webook middleware

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

export default app;
