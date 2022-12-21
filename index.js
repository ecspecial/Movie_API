const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    path = require('path');

const PORT = 8080;

// Define file to write logs to
const accesLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Write logs to log.txt using morgan package
app.use(morgan('combined', {stream: accesLogStream}));

// Route all requests for static data in public folder
app.use(express.static('public'));

// Return default page
app.get('/', (req, res) => {
    res.send('Welcome to my movie_api App!');
});

// Return documentation page
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Add new user
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Missing name in request body.');
    }
});

// Update user name
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find( user => user.id == id );
    let updatedUser  = req.body;

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found.');
    }
});

// Remove user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(201).send(`Deleted user number ${id}.`);
    } else {
        res.status(404).send('User not found.');
    }
});

// Add movies to the favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id);
    
    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(201).send(`${movieTitle} has been added to user ${id}\'s favorites.`)
    } else {
        res.status(404).send('User not found.');
    }
});

// Delete movies from favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title != movieTitle);
        res.status(201).send(`${movieTitle} has been removed from user ${id}\'s favorites.`)
    } else {
        res.status(404).send('User not found.');
    }
});

// Return list of movies upon a request
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Retrurn data about single movie by title
app.get('/movies/:title', (req, res) => {
    let movie = movies.find(movie => movie.title === req.params.title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).send('Movie not found.')
    }
});

// Return description of movie genre
app.get('/movies/genre/:genreName', (req, res) => {
    let genre = movies.find(movie => movie.genre.name === req.params.genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(404).send('Genre not found.')
    }
});

// Return director by name
app.get('/movies/directors/:directorName', (req, res) => {
    let director = movies.find(movie => movie.director.name === req.params.directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(404).send('Director not found.')
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

// Listen on port
app.listen(PORT, () => {
    console.log('App is listening on port 8080');
});