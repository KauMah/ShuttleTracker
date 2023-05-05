import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

import { ComponentProps, SetStateAction, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import AlertModal from './alertModal';
import MapEvent from 'react-map-gl';
import MapboxViewport from 'react-map-gl';
import Navbar from '../navBar';
import { NavigationControl } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
import RouterInfo from './viewRoutesInfo';
import ShuttleInfo from './viewShuttleInfo';
import StopInfo from './viewStopsInfo';
import ViewRoutes from './viewRoutesInfo';
import ViewState from 'react-map-gl';
import bus from './bus.png';
import dotenv from 'dotenv';
import envConfig from '../../../env-config.json';
import map from './map.png';
import mapboxgl from 'mapbox-gl';
import { viewport } from '@popperjs/core';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

//dotenv.config();

const Home = () => {
  const [viewState, setViewState] = useState({
    latitude: 40.8652598,
    longitude: -74.199567,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const stopCoordinates = [
    { latitude: 40.8720293, longitude: -74.1987873, label: 'Stop 1' },
    { latitude: 40.8705887, longitude: -74.1988991, label: 'Stop 2' },
    { latitude: 40.870515, longitude: -74.2010166, label: 'Stop 3' },
    { latitude: 40.870515, longitude: -74.2013492, label: 'Stop 4' },
    { latitude: 40.8690749, longitude: -74.1996545, label: 'Stop 5' },
    { latitude: 40.8676239, longitude: -74.2006334, label: 'Stop 6' },
    { latitude: 40.867362, longitude: -74.2002158, label: 'Stop 7' },
    { latitude: 40.8650461, longitude: -74.1982911, label: 'Stop 8' },
    { latitude: 40.8668351, longitude: -74.1965947, label: 'Stop 9' },
    { latitude: 40.8610319, longitude: -74.2000521, label: 'Stop 10' },
    { latitude: 40.8595465, longitude: -74.2000869, label: 'Stop 11' },
  ];

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
      <div className="view-map-container">
        <a className="view-map-link" onClick={handleViewMapClick}>
          View Map
        </a>
        <AlertModal />
        <img src={map} alt="Map" className="map-image" />
      </div>
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
          <ReactMapGL {...viewState} mapboxAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/streets-v11">
            {stopCoordinates.map((stop) => (
              <Marker key={stop.label} latitude={stop.latitude} longitude={stop.longitude}>
                <img src={bus} alt="Bus stop icon" width={30} height={30} />
                <div className="marker">{stop.label}</div>
              </Marker>
            ))}
          </ReactMapGL>
        </div>
      </div>
    </>
  );
};
export default Home;
