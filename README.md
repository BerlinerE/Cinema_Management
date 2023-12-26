# Cinema Management System

This project is a web application tailored for managing movies, users, and subscriptions. It employs a full-stack JavaScript architecture, relying on MongoDB as the database, Node.js and Express for back-end operations, and React for the front-end interface.

## Technology stack

- **React**

  <img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">
- **MongoDB**

  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">
- **NodeJs**

  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">

- **Express**

  <img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

- **VSCODE**

  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

- **Material UI**

  <a href="https://ibb.co/VtWN1my"><img src="https://i.ibb.co/wRNLksH/mui-logo.png" alt="mui-logo" width = "60px" height = "60px"></a>


## Project Structure

This project is structured into two primary components:

## Back-end Services

- Subscriptions and Cinema Web Services (Node.js and Express REST APIs)

## Front-end Client

<a href="https://ibb.co/L52XNv7"><img src="https://i.ibb.co/ySbc4Vj/project-architecture.png" alt="project-architecture" border="0"></a>

### Back-end Overview

#### Subscriptions Web Service (WS)

A Node.js and Express REST API responsible for managing data retrieval from external sources for members and movies. It interfaces with:

- [JSON Placeholder](https://jsonplaceholder.typicode.com/users) for members' data.
- [TVmaze API](https://api.tvmaze.com/shows) for movies' data.

The retrieved data is used to populate relevant collections in the Subscriptions database.

#### Cinema Web Service

Another Node.js and Express REST API focused on managing user authentication, permissions, and file operations within the database.


#### Files

- **Users.json**: Stores system user data including IDs, names, creation dates, and session timeouts.
- **Permissions.json**: Stores user permissions related to the movie management system.
**A user can have many permissions !**

#### Databases

The system employs two MongoDB databases:

- **Users DB**: Stores user-related data such as IDs, names, passwords, and session timeouts. Initially contains a pre-defined record for the System Admin.
- **Subscriptions DB**: Manages collections for Members, Movies, and Subscriptions data.

### Front-end

The front-end of this application is powered by React for design components, and Redux for state management. It comprises various pages dedicated to managing subscriptions, movies, and users, providing a seamless user experience.

### Installation and Setup

### Server

##### Cinema Server

#### Install the dependencies and start the server

1. Open a new terminal in VSCODE.

2. Navigate to the server directory: cd cinemaServer.

3. Install dependencies: npm install.


4. **MongoDB Connection URL:**
   - Locate the `config/dbConn.js` file within the project. This file likely contains the MongoDB connection setup, including a URL structured like this:
     ```
     mongodb://localhost:27017/usersDB
5. **Server Port Configuration:**
   - Find the `main.js` file or a similar entry point for your server setup.
   - Look for the port configuration, which might resemble this:
     ```javascript
     const port = 8001;
5. Open a terminal.

6. Run the server: node main.js


##### Subscriptions Server

#### Install the dependencies and start the server

1. Open a new terminal in VSCODE.

2. Navigate to the server directory: cd subscriptionServer.

3. Install dependencies: npm install.


4. **MongoDB Connection URL:**
   - Locate the `config/dbConn.js` file within the project. This file likely contains the MongoDB connection setup, including a URL structured like this:
     ```
     mongodb://localhost:27017/SubscriptionsDB
5. **Server Port Configuration:**
   - Find the `main.js` file or a similar entry point for your server setup.
   - Look for the port configuration, which might resemble this:
     ```javascript
     const port = 8000;
5. Open a terminal.

6. Run the server: node main.js

### Client
#### Install the dependencies and start the client

1. Open a new terminal in VSCODE.
2. Navigate to the client directory: cd client.
1. Installing Dependencies: npm install 
2. Starting the Application: Run the client: npm run dev


### Features

1. **User Authentication and Authorization:**
   - Implementation of user login functionality with different permission levels.
  
2. **Data Retrieval from External APIs:**
   - Fetching movie and member data from external web services to populate the application.

3. **CRUD Operations:**
   - Movie, Subscriptions, and Users support Create, Read, Update, and Delete operations.

4. **Reactive User Interface:**
   - Utilizing React to create a responsive and interactive user interface.

5. **Auto Logout Feature:**
   - Implementation of an automatic logout mechanism:
     - Utilizing MongoDB's `SessionTimeOut` field to control the duration (in minutes) a user can actively use the system post login.
     - Once the specified time limit is reached, the user is automatically logged out for security and session management purposes.


## Usage

1. <b>Login Page:</b> 

<a href="https://ibb.co/TbywcR0"><img src="https://i.ibb.co/gPYrywW/image.png" alt="image" border="0"></a>

2. <b>CreateAccount Page (Register):</b> Allows new users to signup with their details

<a href="https://ibb.co/RNrzrqz"><img src="https://i.ibb.co/FXZgZFg/image.png" alt="image" border="0"></a>

3. <b>Dashboard Page:</b> Contains a menu for system movies and subscriptions. The option User management is only available for admin users who are defined by the admin

<a href="https://ibb.co/R7cdPr0"><img src="https://i.ibb.co/Ybhw8nk/image.png" alt="image" border="0"></a>

4. <b>Users dashboard Page</b> (Admin only) Allows the admin to manage all users

<a href="https://ibb.co/pWjtQpc"><img src="https://i.ibb.co/f8dh97f/image.png" alt="image" border="0"></a>

5. <b> Users page</b> Allows the admin to view the registered users

<a href="https://ibb.co/ZzkrKRT"><img src="https://i.ibb.co/d4zv6sK/image.png" alt="image" border="0"></a>

6.  <b>Add user page</b> Allows the admin to add new user to the system with permissions

<a href="https://ibb.co/6XSYqP4"><img src="https://i.ibb.co/SfgNZnK/image.png" alt="image" border="0"></a>

7.  <b>Edit user</b> Allows admin to update user's data and their permissions

<a href="https://ibb.co/crBHWdH"><img src="https://i.ibb.co/P6Ln28n/image.png" alt="image" border="0"></a>

8. <b>Movies dashboard Page</b> Allows users to Manage all movies and their data

<a href="https://ibb.co/5jrjcy9"><img src="https://i.ibb.co/jwyw425/image.png" alt="image" border="0"></a>

9. <b>Movies Page</b> Allows users to view all the movies in the system and search for specific movie

<a href="https://ibb.co/cXHqkYy"><img src="https://i.ibb.co/7N5hjkS/image.png" alt="image" border="0"></a>

10. - <b>Search movie</b>

<a href="https://ibb.co/m88Rq55"><img src="https://i.ibb.co/1660qGG/image.png" alt="image" border="0"></a>


11. <b>Add Movie Page</b> Allows to create a new movie

<a href="https://ibb.co/GtwxJck"><img src="https://i.ibb.co/X3B24Sp/image.png" alt="image" border="0"></a>

12. <b>Edit Movie Page</b> Allows to update a movie's data

<a href="https://ibb.co/92BXSk5"><img src="https://i.ibb.co/1KBVjtW/image.png" alt="image" border="0"></a>

13. <b>Subscriptions dashboard Page</b> Manages all members and their movies subscriptions

<a href="https://ibb.co/hW4DPqT"><img src="https://i.ibb.co/tsv87d1/image.png" alt="image" border="0"></a>

14. <b>Members Page</b> Lists all the members and their subscriptions

<a href="https://ibb.co/99zJbXk"><img src="https://i.ibb.co/Z6t3Bsp/image.png" alt="image" border="0"></a>

15. - <b>Subscribe to new movie</b>

<a href="https://ibb.co/WKRRJZH"><img src="https://i.ibb.co/MNJJ0rg/image.png" alt="image" border="0"></a>

16. <b>Add Member Page</b> Allows to add a new member

<a href="https://ibb.co/Vp7Ldsc"><img src="https://i.ibb.co/3YDTwn9/image.png" alt="image" border="0"></a>

17. <b>Edit Member Page</b> Allows to update a member's data

<a href="https://ibb.co/3mvpf42"><img src="https://i.ibb.co/N2r91t5/image.png" alt="image" border="0"></a>

