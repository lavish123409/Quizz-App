# Quiz app

A time bounded quizzing platform with realtime leaderboards and a store of past quizzes and results. 🧑‍🏫🧑‍🎓. This Project has been made under the event of **FOSS Overflow**.

## What is FOSS Overflow ?

FOSS Overflow is a month-long festival celebrating open source culture and is organized by Google Developer Student Clubs and OpenLake at IIT Bhilai.

## Features

- Lets its users to make different types of Quizzes
- Time bounded questions needed to be answered as soon as possible for getting higher score
- Shows all the past quizzes given by the user
- A profile section to show all the quizzes which have been made by the user
- Tech Stack : Node.js, React, MongoDB, Express, JWT

## Check the App

You can check the live hosted Quizz App [here](https://quizz-app-foss-overflow.netlify.app/)

Code for the Test quiz - 663b34611e083b1888e8e36c

`Note: Currently, the database is facing some issues`

## Setup

### Step 1

- Fork this repository by clicking `fork button`

- Clone the repository in your local machine by typing

  ```sh
  git clone https://github.com/<your-username>/quiz-app-1.git
  ```

  in your terminal(for _mac/linux_) or Git Bash (for _windows_)

### Step 2

- Install `nodejs` and `npm` on your local machine. For [windows](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/), [linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) and [mac](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)

#### For Frontend

- Navigate to `client` directory and type

```sh
 npm install
```

to install all the dependencies

- Then, run the command

```sh
 npm start
```

to start the development server for frontend.

#### For Backend

- Navigate to `server` directory and type

```sh
 npm install
```

to install all the dependencies

- Then, run the command

```sh
 node index.js
```

to start the backend server.

> Note : You would need to connect to the mongodb atlas for running the app.

Reporting [bugs](https://github.com/OpenLake/Quiz-App/issues) and making [Pull requests](https://github.com/OpenLake/Quiz-App/pulls) would be highly appreciated.
