import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

interface Route {
  _id: string;
  name: string;
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
      <h1 className="routes">Route Information:</h1>
      {routesFetched
        ? routes.map((route) => (
            <div key={route._id} className="stop">
              <h2 className="stop-name">Route Name:</h2>
              <p className="stop-info">{route.name}</p>
            </div>
          ))
        : null}
    </div>
  );
}

export default ViewRoutes;
