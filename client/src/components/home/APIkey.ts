const originCoords = '40.8720293,-74.1987873';
const destinationCoords = '40.8705887,-74.1988991';
const apiKey = 'AIzaSyDqsPyaci0mmZxsN7N427OK4tSI9x8vUec';

const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords}&destination=${destinationCoords}&mode=walking&key=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const travelTime: string = data.routes[0].legs[0].duration.text;
    console.log(`The estimated travel time between Lot 60 and Bassie Hall is ${travelTime}.`);
  })
  .catch((error) => console.log(error));
