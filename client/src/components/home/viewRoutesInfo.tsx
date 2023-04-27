import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

interface Route {
  _id: number;
  name: string;
  description: string;
}

function ViewRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routesFetched, setRoutesFetched] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/route/');
        if (response.data.data) {
          setRoutes(response.data.data);
          setRoutesFetched(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div>
      {routesFetched ? (
        routes.map((route) => (
          <div key={route._id}>
            <p>Route Name: {route.name}</p>
          </div>
        ))
      ) : (
        <div>Loading routes...</div>
      )}
    </div>
  );
}

export default ViewRoutes;
