const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    path = require('path');

const PORT = 8080;

let users = [
    {
        id: 1,
        name: 'Rick',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Morty',
        favoriteMovies: []
    }
];

let movies = [
    {
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    genre: {
      name: 'Crime',
      description: 'Films of this genre generally involve various aspects of crime and its detection.'
    },
    director:{
      name:'Francis Ford Coppola',
      bio: 'American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d\'Or, and a British Academy Film Award (BAFTA).',
      birth: '1939',
    },
    imageURL:'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    featured: false
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genre: {
        name: 'Action',
        description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.'
    },
    director:{
        name: 'Christopher Nolan',
        bio: 'Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made',
        birth: '1970',
    },
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
    featured: false
  }
];

// Array of movies to return
/* let topMovies = [
    {
        title: 'The Shawshank Redemption',
        year: '1994',
        genre: 'Drama',
        director: 'Frank Darabont'
    },
    {
        title: 'The Godfather',
        year: '1972',
        genre: 'Crime',
        director: 'Francis Ford Coppola'
    },
    {
        title: 'The Dark Knight',
        year: '2008',
        genre: 'Action',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Godfather Part II',
        year: '1974',
        genre: 'Crime',
        director: 'Francis Ford Coppola'
    },
    {
        title: '12 Angry Men',
        year: '1957',
        genre: 'Crime',
        director: 'Sidney Lumet'
    },
    {
        title: 'Schindler\'s List',
        year: '1993',
        genre: 'Drama',
        director: 'Steven Spielberg'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: '2003',
        genre: 'Action',
        director: 'Peter Jackson'
    },
    {
        title: 'Pulp Fiction',
        year: '1994',
        genre: 'Crime',
        director: 'Quentin Tarantino'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: '2001',
        genre: 'Action',
        director: 'Peter Jackson'
    },
    {
        title: 'The Good, the Bad and the Ugly',
        year: '1966',
        genre: 'Adventure',
        director: 'Sergio Leone'
    },
]; */

// Define file to write logs to
const accesLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(bodyParser.json());

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