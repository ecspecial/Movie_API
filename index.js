const morgan = require('morgan');

const express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path');

const PORT = 8080;

// Array of movies to return
let topMovies = [
    {
        title: 'The Shawshank Redemption',
        year: '1994'
    },
    {
        title: 'The Godfather',
        year: '1972'
    },
    {
        title: 'The Dark Knight',
        year: '2008'
    },
    {
        title: 'The Godfather Part II',
        year: '1974'
    },
    {
        title: '12 Angry Men',
        year: '1957'
    },
    {
        title: 'Schindler\'s List',
        year: '1993'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: '2003'
    },
    {
        title: 'Pulp Fiction',
        year: '1994'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: '2001'
    },
    {
        title: 'The Good, the Bad and the Ugly',
        year: '1966'
    },
];

// Define file to write logs to
const accesLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// Write logs to log.txt using morgan package
app.use(morgan('combined', {stream: accesLogStream}));

// Route all requests for static data in public folder
app.use(express.static('public'));

// Return default page
app.get('/', (req, res) => {
    res.send('Welcome to my movie_api App!');
});

// Return movies on request
app.get('/movies', (req, res) => {
    res.json(topMovies);
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