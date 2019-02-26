Message Feed Toy Application

Application is built using MongoDB, Express.js, React.js.

A user can:

- login or register (contains authentication)
- post a tread
- delete its own posted thread(s)
- reply to threads
- delete its own replies

Project set up:

First of all, make sure you have an .env file placed in the root of the backend folder. It should contain paths for ports, database, etc.

The project consists of two parts: Frontend and Backend.

Step 1. Frontend:
- Change directory to the frontend folder and run "npm install" in order to install all necessary dependencies.

Step 2.
- Change directory to the backend folder and do the same process as step 1.
- Run "npm run devstart" in the current folder (backend). It will trigger up both servers for frontend and backend in a concurrent matter. A browser will be fired up and then you can start playing with the app.

Simple as that!

Some details about the project:

The project was built from scratch in order to imitate a real-life application's development steps (data flow from database up until the client, authentication factors, etc).

During my prototyping process I have sketched the data structure necessary for my application to be scalable and then implemented database models and the server architecture. For the server side, I have used the MVC design pattern in order to encapsulate various features (users,threads,comments). In this way, I have tried to decouple components so that we can remove them without breaking the entire application. In regards to database querying, my intention was to run optimizated queries. An example would be in the case when a user reloads the "Feed" page. The server performs a query on the "Thread" model and populates each thread with its own "Comments" array of objects (if exists). For this to happen, I designed the database schemas with relationships between them (references).

In what regards the client side, I have built up my react components based on the needed data structure and not the other way around. I have tried to decouple each component and take into consideration their degree of usefulness in terms of "re-usage". When authenticated, the application stores a token and the user's email in local storage. In this way it makes it very practical to retrieve user credentials and perform useful tasks such as database queries, and comparing thread author with current user for deletion access. I took into account and tried to respect the principle of "unique source of truth" in order to synchronise components between them as least error-prone as possible. The data flow is pushed up from nested components up until the main component's state. All data mutation is made by using the main component's functions.  
