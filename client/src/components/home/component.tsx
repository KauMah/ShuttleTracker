import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

import { ComponentProps, SetStateAction, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import MapEvent from 'react-map-gl';
import Navbar from '../navBar';
import { NavigationControl } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
import ShuttleInfo from './viewShuttleInfo';
import ViewState from 'react-map-gl';
import dotenv from 'dotenv';
import envConfig from '../../../env-config.json';
import { viewport } from '@popperjs/core';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

//dotenv.config();

const Home = () => {
  const [viewState, setViewState] = useState({
    latitude: 40.864872,
    longitude: -74.1995669,
    zoom: 14.7,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const [map, setMap] = useState<null | mapboxgl.Map>(null);

  return (
    <>
      <Navbar />
      <div style={{ width: '100vw', height: '100vh' }}>
        <div className="map-container1">
          <ReactMapGL
            {...viewState}
            onMove={(event) => setViewState(event.viewState)}
            mapboxAccessToken={mapboxToken} // replace with your access token
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onLoad={(event) => setMap(event.target)}
          ></ReactMapGL>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <ShuttleInfo />
      </div>
    </>
  );
};
export default Home;
