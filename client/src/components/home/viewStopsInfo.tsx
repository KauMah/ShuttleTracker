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

  console.log(stops);

  return (
    <div>
      <div className="stops-header1">
        <h1 className="stops">List of Stops:</h1>
      </div>
      <div className="stops-container">
        <div className="stops-list">
          <ul>
            {stops.map((stop, index) => (
              <li key={stop._id} className="stop">
                <h2 className="stop-name">Stop {index + 1}:</h2>
                <p className="stop-name-text">{stop.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default StopInfo;
