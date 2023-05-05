import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

interface ShuttleData {
  _id: string;
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  driver: {
    _id: string;
    name: string;
  };
  occupancy: number;
}

const ShuttleInfo = () => {
  const [shuttles, setshuttles] = useState<ShuttleData[]>([]);
  const [shuttlesFetched, setShuttlesFetched] = useState(false);

  useEffect(() => {
    const fetchShuttles = async () => {
      try {
        const response = await api.get('/shuttle/');
        if (response.data.data) {
          setshuttles(response.data.data);
          setShuttlesFetched(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchShuttles();
  }, []);

  const activeShuttles = shuttles.filter((shuttle) => shuttle.active);

  return (
    <div>
      <div className="stops-header1">
        <h1 className="shuttles">All Shuttles:</h1>
      </div>
      <div className="stops-container">
        <div className="stops-list">
          {activeShuttles.map((shuttle) => (
            <li key={shuttle._id} className="stops-container1">
              Seats: {shuttle.capacity} <br />
              Passengers: {shuttle.occupancy} <br />
              Status: {shuttle.active ? 'Active' : 'Inactive'}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShuttleInfo;
