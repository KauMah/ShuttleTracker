import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

import { ComponentProps, SetStateAction, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import MapEvent from 'react-map-gl';
import Navbar from '../navBar';
import { NavigationControl } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
import RouterInfo from './viewRoutesInfo';
import ShuttleInfo from './viewShuttleInfo';
import StopInfo from './viewStopsInfo';
import ViewRoutes from './viewRoutesInfo';
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

  // const handleViewMapClick = () => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // };

  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const handleViewMapClick = () => {
    setShowMap(true);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <button className="view-map-btn" onClick={handleViewMapClick}>
        View Map
      </button>
      <div>
        <StopInfo />
      </div>
      <div>
        <ViewRoutes />
      </div>
      <div>
        <ShuttleInfo />
      </div>
      <div className="map-container">
        <div ref={mapRef} className="react-map-gl d-flex justify-content-center">
          <ReactMapGL
            {...viewState}
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          ></ReactMapGL>
        </div>
      </div>
    </>
  );
};
export default Home;
