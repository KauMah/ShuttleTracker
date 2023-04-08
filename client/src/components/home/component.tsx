<<<<<<< HEAD
import 'mapbox-gl/dist/mapbox-gl.css';

import Map, { Marker } from 'react-map-gl';
import { SetStateAction, useState } from 'react';

import MapEvent from 'react-map-gl';
import Navbar from '../navBar';
import dotenv from 'dotenv';
import envConfig from '../../../env-config.json';
import { viewport } from '@popperjs/core';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

//dotenv.config();

const Home = () => {
  const [viewState, setViewState] = useState({
    latitude: 40.864872,
    longitude: -74.1995669,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const onMove = (event: typeof MapEvent) => {
    setViewState(event);
  };
=======
import MsuNav from '../navBar';

const Home = () => {
  return <MsuNav />;
};
>>>>>>> 9f5bd8b41a0500206bcb58fcd4c95565e382636a

  return (
    <>
      <Navbar />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Map
          {...viewState}
          onMove={onMove}
          mapboxAccessToken={mapboxToken} // replace with your access token
          mapStyle="mapbox://styles/mapbox/streets-v11"
          initialViewState={viewState}
        >
          <Marker latitude={40.864872} longitude={-74.1995669}>
            <div>Marker here</div>
          </Marker>
        </Map>
      </div>
    </>
  );
};
export default Home;
