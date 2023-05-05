import { Bus, Operator, Rider, Route, Stop } from '../shuttleinfo/component';
import { useEffect, useState } from 'react';

import { $msured } from '../../assets/colors';
import AdminPanelBox from '../shuttleinfo/adminPanelBox';
import MsuNav from '../navBar';
import SendAlertButton from '../shuttleinfo/sendAlertButton';
import { api } from '../../utils/api';

const ShuttleBusop = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [, setRiders] = useState<Rider[]>([]);
  const [buses, setBuses] = useState<Bus[] | null>(null);
  const [, setLoading] = useState<boolean>(false);

  // Bus refreshing
  const refreshBuses = async () => {
    try {
      const response = await api.get('/shuttle/');
      if (response.data && Array.isArray(response.data.data)) {
        const fetchedBuses = response.data.data.map((bus: Bus) => {
          const associatedRoute = routes.find((r: Route) => r?._id === bus.route?._id);
          return { ...bus, route: associatedRoute };
        });
        setBuses(fetchedBuses);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Stop fetching
  const fetchStops = async () => {
    try {
      const response = await api.get('/stop/');
      // console.log('Stops:', response.data.data); // Log the fetched stops data
      setStops(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Operator fetching
  const fetchOperators = async () => {
    try {
      const response = await api.get('/user/drivers');
      // console.log('Operators:', response.data);
      if (response.data.data.users) {
        setOperators(response.data.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Rider fetching
  const fetchRiders = async () => {
    try {
      const response = await api.get('/user/riders');
      // console.log('Riders:', response.data);
      if (response.data.data.users) {
        setRiders(response.data.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function loadData() {
    try {
      setLoading(true);

      const routesResponse = await api.get('/route/');
      if (routesResponse.status === 200 && routesResponse.data && Array.isArray(routesResponse.data.data)) {
        setRoutes(routesResponse.data.data);
      } else {
        setRoutes([]);
      }

      const busesResponse = await api.get('/shuttle/');
      if (busesResponse.status === 200 && busesResponse.data && Array.isArray(busesResponse.data.data)) {
        const fetchedBuses = await Promise.all(
          busesResponse.data.data.map(async (bus: Bus) => {
            if (bus && bus.route) {
              const routeResponse = await api.post('/route/', { id: bus.route });
              if (routeResponse.status === 200 && routeResponse.data && routeResponse.data.data) {
                return { ...bus, route: routeResponse.data.data };
              }
            }
            return { ...bus, route: null };
          })
        );
        setBuses(fetchedBuses);
      } else {
        setBuses([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    refreshBuses();
    fetchStops();
    fetchOperators();
    fetchRiders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendAlert = () => {
    console.log('Alert sent');
    // We still need to implement our alert sending logic here !!
  };

  const box1Options = [
    {
      title: 'Current Routes',
      content: routes.map((route) => ({
        id: route._id,
        text: (
          <>
            {route.name}
            <ol style={{ fontSize: '0.8rem', paddingLeft: '1rem' }}>
              {route.stops.map((stop) => (
                <li key={stop._id}>{stop.name}</li>
              ))}
            </ol>
          </>
        ),
      })),
    },
  ];

  const box2Options = [
    {
      title: 'Current Buses',
      content:
        buses && routes
          ? buses.map((bus) => {
              const driver = operators.find((operator) => operator?._id === bus.driver);
              const driverName = driver ? driver.name : 'unknown';
              const routeName = bus.route ? routes.find((route) => route._id === bus.route._id)?.name : 'Not assigned';
              return {
                id: bus._id,
                text: <>{`Bus ID: ${bus._id} (Route: ${routeName}, Driver: ${driverName})`}</>,
              };
            })
          : [],
    },
  ];

  const box3Options = [
    {
      title: 'Available Stops',
      content: stops.map((stop) => ({
        id: stop._id,
        text: <>{stop.name}</>,
      })),
    },
  ];

  const currentViewTextStyle = {
    fontSize: '1.25rem',
    color: $msured,
  };

  // edit for commit
  const mainContainerStyle = {
    marginTop: '3.5rem',
  };

  return (
    <>
      <MsuNav />
      <div className="container" style={mainContainerStyle}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <p style={currentViewTextStyle}>Current View: Bus Operator</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center" style={{ marginTop: '-12px' }}>
            <SendAlertButton onClick={handleSendAlert} />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <AdminPanelBox options={box1Options} showSelect={false} />
          <AdminPanelBox options={box2Options} showSelect={false} />
          <AdminPanelBox options={box3Options} showSelect={false} />
        </div>
      </div>
    </>
  );
};

export default ShuttleBusop;
