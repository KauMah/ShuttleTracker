import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

// interface RouterData {
//   id: string;
//   name: string;
//   capacity: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

const RouterInfo = () => {
  const [route, setRoute] = useState({ stops: ' ' });

  useEffect(() => {
    api
      .get('/route')
      .then((response) => {
        setRoute(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ${error.message');
      });
  }, []);

  return (
    <div>
      <h1>All Routes</h1>
      <ul>
        {route.stops}
        {/* {route.map((route) => (
          // <li key={route.id}>{route.name}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default RouterInfo;
