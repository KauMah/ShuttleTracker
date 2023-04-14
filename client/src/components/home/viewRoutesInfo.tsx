import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';
import { api } from '../../utils/api';

interface RouterData {
  id: string;
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

const RouterInfo = () => {
  const [routes, setRoutes] = useState<RouterData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/route');
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>All Routes</h1>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>{route.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RouterInfo;
