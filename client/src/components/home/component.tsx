import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL, { Map, Marker } from 'react-map-gl';

import Navbar from '../navBar';
import dotenv from 'dotenv';
import envConfig from '../../../env-config.json';
import { useState } from 'react';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

dotenv.config();

const Home = () => {
  const [viewState, setViewState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  return (
    <>
      <Navbar />
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={mapboxToken}
      ></Map>
    </>
  );
};
export default Home;
