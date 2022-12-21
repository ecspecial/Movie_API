// Require mongoose to use database with api in index.js
const mongoose = require('mongoose');

// Define schema for movie document in mongoDB
let movieSchema = mongoose.Schema({
    Title: {Type: String, required: true},
    Description: {Type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String,
        Death: String
    },
    ImagePath: String,
    Featured: Boolean
});

// Define schema for user document in mongoDB
let userSchema = ({
    Username: {Type: String, required: true},
    Password: {Type: String, required: true},
    Email: {Type: String, required: true},
    Birthday: Date, 
    FavoriteMovies: [{Type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

// Create model based on schema
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', movieSchema);

// Export model
module.exports.Movie = Movie;
module.exports.User = User;