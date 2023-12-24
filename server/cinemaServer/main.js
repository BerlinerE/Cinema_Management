const connectDB = require('../cinemaServer/config/dbconn')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRouter'); // Import the authRouter
const userRouter = require('./routers/userRouter');

const app = express();
const port = 8001;

connectDB()
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());


// routers
// Use the auth router for authentication routes
app.use('/auth', authRouter);
app.use('/users', userRouter);


app.listen(
    port,
    () => console.log(`app is listening at http://localhost:${port}`)
  );
  