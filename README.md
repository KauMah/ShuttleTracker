# ShuttleTracker

The logins are locked to a single email domain, so if you would like to see the application as a user would, you can use the credentials below:
username: github@montclair.edu 
password: Github123

## Back End
The API we are building uses Node.js and Typescript along with Express to serve data to the front end application. The database we are using is a MySQL DB that is hosted on Cpanel (tentatively), but if that doesn't work out or is too cumbersome to implement, we can pivot to MongoDB. 

## Front End
# Vite + React + Typescript

This is my first attempt at using Vite and emotion for styling. PreviouslyI swore by create-react-app and Radium for custom styles, but Radium is no longer under active development, and create-react-app was not suited to using the @emotion/react library

## Available Scripts

### `yarn dev`
Starts the development server (using swc :) ) THIS IS PROBABLY THE ONLY SCRIPT YOU NEED TO RUN

### `yarn test`
Runs the suite of tests defined by vitest and testing-library. 

### `yarn build`
Creates a production ready build of the app

### `yarn preview`
Previews the built app
