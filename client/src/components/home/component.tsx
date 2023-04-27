import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

import { ComponentProps, SetStateAction, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import MapEvent from 'react-map-gl';
import Navbar from '../navBar';
import { NavigationControl } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
import RouterInfo from './viewRoutesInfo';
import StopInfo from './viewStopsInfo';
import ShuttleInfo from './viewShuttleInfo';
import ViewState from 'react-map-gl';
import dotenv from 'dotenv';
import envConfig from '../../../env-config.json';
import mapboxgl from 'mapbox-gl';
import { viewport } from '@popperjs/core';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

//dotenv.config();

const Home = () => {
  const [viewState, setViewState] = useState({
    latitude: 40.8634,
    longitude: -74.199567,
    zoom: 14.5,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  return (
    <>
      <Navbar />
      <div className="message">
        <p>View Route Information | View Shuttle Information </p>
      </div>
      {/* <div className="react-map-gl">
        <ReactMapGL
          {...viewState}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        ></ReactMapGL>
      </div> */}
      <div>
        <StopInfo />
      </div>
    </>
  );
};
export default Home;
