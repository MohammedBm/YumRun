import express from 'express';
import router from "./router";
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  console.log("Hello")
  res.status(200)
  res.json({ message: 'Hello from express' });
});

app.use('/api', protect, router);
// why didn't we put the signup and signin routes in the router?
// because we don't want to protect the signup and signin routes
// we want to allow users to access these routes without a token
// so we put them outside of the router
app.post('/user', createNewUser)
app.post('/signin', signin)

export default app;