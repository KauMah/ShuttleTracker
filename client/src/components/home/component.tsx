import 'mapbox-gl/dist/mapbox-gl.css';

import { $grey, $msured, $red, $white } from '../../assets/colors';
import ReactMapGL, { Layer, MapRef, Marker, Source } from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';

import AlertModal from './alertModal';
import Navbar from '../navBar';
import _ from 'lodash';
import { api } from '../../utils/api';
import bus from './bus.png';
import envConfig from '../../../env-config.json';

const mapboxToken = envConfig.REACT_APP_MAPBOX_TOKEN;

const styles = {
  container: {
    marginTop: 200,
  },
  route: {
    backgroundColor: $grey,
    textAlign: 'center' as const,
    color: $white,
    cursor: 'pointer',
  },
  stop: {
    backgroundColor: $grey,
    textAlign: 'center' as const,
    color: $white,
    cursor: 'pointer',
  },
  map: {
    width: '100%',
    height: 600,
    marginBottom: 200,
    marginTop: 30,
  },
};

const Home = () => {
  const [routes, setRoutes] = useState<any>([]);
  const [route, setRoute] = useState();
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState();
  const [waypoints, setWaypoints] = useState();
  const [shuttles, setShuttles] = useState([]);
  const map = useRef<MapRef>(null);

  const mapPos = {
    latitude: 40.8652598,
    longitude: -74.199567,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  // fetch Routes (I am .thenning because oh my god are we pressed for time)
  useEffect(() => {
    if (routes.length < 1) {
      api.get('/route/').then((data) => {
        setRoutes(data.data.data);
      });
    }
  }, [routes]);

  useEffect(() => {
    const res = api.get('/shuttle').then((data) => {
      const buses = data.data.data;
      if (!route) return;
      const rtBus = buses.filter((b: any) => route._id === b.route);
      setShuttles(rtBus);
    });
  }, [route]);

  useEffect(() => {
    let coordStr = '';
    if (stops.length === 0) return;
    stops.map((st, index) => {
      coordStr += `${index === 0 ? '' : ';'}${_.get(st, 'loc.coordinates[0]', '')},${_.get(
        st,
        'loc.coordinates[1]',
        ''
      )}`;
    });
    const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordStr}?geometries=geojson&access_token=${mapboxToken}`;
    const fetcher = async () => {
      const res = await fetch(query);
      const data = await res.json();
      const rt = data.routes[0].geometry.coordinates;
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: rt,
        },
      };
      setWaypoints(geojson);
    };
    fetcher();
  }, [stops]);

  return (
    <>
      <Navbar />
      <div className="container" style={styles.container}>
        <AlertModal />
        <div className="row">
          <h3>Routes</h3>
          {routes.length > 0 &&
            routes.map((rt: any) => (
              <div
                style={styles.route}
                className="col-12 col-sm-4 col-md-3"
                onClick={() => {
                  setRoute(rt);
                  setStops(rt.stops);
                }}
                key={`route-${rt._id}`}
              >
                {rt.name}
              </div>
            ))}
        </div>
        {stops && (
          <>
            <h3>Stops</h3>
            <div className="row">
              {stops.map((st: any) => (
                <div key={`stop-${st.name}`} style={styles.stop} className="col-12 col-sm-4 col-md-3">
                  {st.name}
                </div>
              ))}
            </div>
          </>
        )}
        <ReactMapGL
          {...mapPos}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={styles.map}
          ref={map}
        >
          {shuttles &&
            shuttles.map((st: any) => (
              <Marker
                key={`marker-${st._id}`}
                latitude={_.get(st, 'loc.coordinates[1]', 0)}
                longitude={_.get(st, 'loc.coordinates[0]', 0)}
              >
                <div style={{ height: 20, width: 20, backgroundColor: $msured }}></div>
                <div className="marker">{st.name}</div>
              </Marker>
            ))}
          {stops &&
            stops.map((st: any) => (
              <Marker
                key={`marker-${st.name}`}
                latitude={_.get(st, 'loc.coordinates[1]', 0)}
                longitude={_.get(st, 'loc.coordinates[0]', 0)}
              >
                <img src={bus} alt="Bus stop icon" width={30} height={30} />
                <div className="marker">{st.name}</div>
              </Marker>
            ))}
          {waypoints && (
            <Source id="route" type="geojson" data={{ type: 'FeatureCollection', features: [waypoints] }}>
              <Layer {...{ id: 'line', type: 'line', paint: { 'line-color': $red, 'line-width': 5 } }} />
            </Source>
          )}
        </ReactMapGL>
      </div>
    </>
  );
};
export default Home;
