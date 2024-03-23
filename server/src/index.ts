import * as dotenv from 'dotenv';
import app from './server';
import swaggerDoc from './utils/swagger';
const port = 3000;

dotenv.config();

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')

  swaggerDoc(app, port)
})