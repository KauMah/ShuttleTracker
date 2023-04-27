import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

interface Stop {
  _id: string;
  name: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
}

const fetchStops = async () => {
  try {
    const response = await api.get('/stop/');
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

const StopInfo = () => {
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    const getStops = async () => {
      const stopsData = await fetchStops();
      if (stopsData) {
        setStops(stopsData);
      }
    };
    getStops();
  }, []);

  console.log(stops); // Log the stops state

  return (
    <div>
      <h1>List of Stops:</h1>
      <ul>
        {stops.map((stop) => (
          <li key={stop._id}>
            <h2>{stop.name}</h2>
            <p>Latitude: {stop.loc.coordinates[1]}</p>
            <p>Longitude: {stop.loc.coordinates[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StopInfo;
