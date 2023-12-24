const connectDB = require('./config/dbConn');
const express = require('express');
const cors = require('cors');
const movieRouter = require('./routes/movieRouter'); 
const subscriptionRouter = require('./routes/subscriptionRouter');
const memberRouter = require('./routes/memberRouter')

const app = express();
const port = 8000;

connectDB();
app.use(cors());
app.use(express.json());


// routers
app.use('/movies', movieRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/members', memberRouter);

/*
// One time run
const axios = require("axios");
const Member = require("./models/Member");
const Movie = require("./models/Movie");

// Fetch and populate data(Movies & Members) from external APIs
async function fetchAndPopulateData() {
    try {
      const membersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      const moviesResponse = await axios.get('https://api.tvmaze.com/shows');
  
      const members = membersResponse.data.map((user) => ({
       Name: user.name,
       Email: user.email,
       City: user.address.city,
       }));

    const movies = moviesResponse.data.map((movie) => ({
        Name: movie.name,
        Genres: movie.genres,
        Image: movie.image.medium,
        Premiered: new Date(movie.premiered),
        }));
  
      await Member.insertMany(members);
      await Movie.insertMany(movies);
  
      console.log('Data populated successfully.');
    } catch (error) {
      console.error('Error populating data:', error.message);
    }
  }

 // Run the function when the server starts
 fetchAndPopulateData();
*/

app.listen(
    port,
    () => console.log(`app is listening at http://localhost:${port}`)
  );
  