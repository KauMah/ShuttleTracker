import 'react-grid-layout/css/styles.css';

import React, { useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';

interface ShuttleData {
  id: string;
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShuttleInfo = () => {
  const [shuttles, setshuttles] = useState<ShuttleData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/shuttles');
  //     const data = await response.json();
  //     setshuttles(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>All Routes</h1>
      <ul>
        {shuttles.map((shuttle) => (
          <li key={shuttle.id}>{shuttle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShuttleInfo;
