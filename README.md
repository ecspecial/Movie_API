# Movie_API

### Description:
The Movie API is a RESTful API designed to interact with a MongoDB database and provide data about various movies. The API includes endpoints for accessing movie information, director information, and genre information. The API also includes user authentication and authorization features that allow users to sign up, update their personal information, and create a list of their favorite movies.

New [API release](https://github.com/ecspecial/movie-api-aws) deployed on AWS opposing previous run on Heroku is available.

### Technologies:
- The Movie API is built using Node.js and Express.
- Data is stored in a MongoDB database and Mongoose is used for data modeling.
- Passport is used for authentication and authorization.
- The API is currently deployed on Heroku.

### Key Features:

- RESTful API architecture
- MongoDB database with Mongoose data modeling
- User authentication and authorization with Passport
- Basic HTTP authentication for first login, followed by JWT-based authentication for subsequent API calls
- Password hashing for user security
- Express library for endpoint routing
- OpenAPI documentation for easy testing and integration

### Getting Started:

To use the Movie API, you will need to first clone the repository and deploy it to Heroku. After that, you can set up your environmental variables on Heroku.

In order to set up the environmental variables, go to your Heroku app dashboard and navigate to the "Settings" tab. Scroll down to the "Config Vars" section and click the "Reveal Config Vars" button. Here, you can set the values for your environmental variables, such as your MongoDB database connection string, port number, host name, and JWT secret code.

Once you have set up the environmental variables, you can start the API by running the npm start command. This will start the API and allow you to access the various endpoints. You can test the API endpoints directly from the OpenAPI documentation or import the OpenAPI definitions to Postman for testing.

- [API endpoint documentation](https://ecspecial.github.io/Movie_API/public/documentation.html)

### Dependencies:
The Movie API uses several dependencies, including Express, Mongoose, Passport and more. See the package.json file for a full list of dependencies.

### Use Cases:

Currently API is used for the frontend of my [myFlix](https://github.com/ecspecial/myFlix-client) project.

The Movie API can be used in a variety of applications, including movie review websites, entertainment blogs, and online streaming platforms. With its user authentication and authorization features, the API can help ensure user data privacy and security. The API's RESTful architecture and OpenAPI documentation make it easy to integrate into existing applications and test new features.