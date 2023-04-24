import { useEffect, useState } from 'react';

import { $msured } from '../../assets/colors';
import AdminPanelBox from './adminPanelBox';
import MsuNav from '../navBar';
import SendAlertButton from './sendAlertButton';
import { api } from '../../utils/api';

interface Stop {
  _id: string;
  name: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
}

interface Route {
  _id: string;
  name: string;
  stops: Stop[];
}

interface Bus {
  _id: string;
  name?: string;
  capacity: number;
  route: Route;
  active: boolean;
  driver: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
  occupancy: number;
}

interface Operator {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Rider {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const useFetchBuses = (routes: Route[]) => {
  const [buses, setBuses] = useState<Bus[] | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await api.get('/shuttle/');
        // console.log('Buses:', response.data);
        if (response.data && Array.isArray(response.data.data)) {
          const updatedBuses = response.data.data.map((bus: any) => ({
            ...bus,
            route: routes.find((route) => route._id === bus.route) || null,
          }));
          setBuses(updatedBuses);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (routes.length > 0) {
      fetchBuses();
    }
  }, [routes]);

  return buses;
};

const ShuttleInfo = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [, setRoutesFetched] = useState(false);
  const buses = useFetchBuses(routes);

  const fetchStops = async () => {
    try {
      const response = await api.get('/stop/');
      // console.log('Stops:', response.data.data); // Log the fetched stops data
      setStops(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Route fetching
  const fetchRoutes = async () => {
    try {
      const response = await api.get('/route/');
      // console.log('Routes:', response.data);
      if (response.data.data) {
        setRoutes(response.data.data);
        setRoutesFetched(true);
      }
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

  // Admin fetching
  const fetchAdmins = async () => {
    try {
      const response = await api.get('/user/admins');
      // console.log('Admins:', response.data);
      if (response.data.data.users) {
        setAdmins(response.data.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStops();
    fetchRoutes();
    fetchOperators();
    fetchAdmins();
    fetchRiders();
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
      content: buses
        ? buses.map((bus) => {
            const driver = operators.find((operator) => operator._id === bus.driver);
            const driverName = driver ? driver.name : 'unknown';
            return {
              id: bus._id,
              text: bus.route
                ? `Bus ID: ${bus._id} (Route: ${bus.route.name}, Driver: ${driverName})`
                : `Bus: ${bus._id} (Driver: ${driverName})`,
            };
          })
        : [],
    },
    {
      title: 'Available Stops',
      content: stops.map((stop) => ({ id: stop._id, text: stop.name })),
    },
  ];

  const box3Options = [
    {
      title: 'Bus Operators',
      content: operators
        .filter((operator) => operator.role === 'driver')
        .map((operator) => ({ id: operator._id, text: `${operator.name} (${operator.email})` })),
    },
    {
      title: 'Admins',
      content: admins
        .filter((operator) => operator.role === 'admin')
        .map((admin) => ({ id: admin._id, text: `${admin.name} (${admin.email})` })),
    },
    {
      title: 'Riders',
      content: riders
        .filter((operator) => operator.role === 'rider')
        .map((rider) => ({ id: rider._id, text: `${rider.name} (${rider.email})` })),
    },
  ];

  const currentViewTextStyle = {
    fontSize: '1.25rem',
    color: $msured,
  };

  const mainContainerStyle = {
    marginTop: '6.5rem',
  };

  return (
    <>
      <MsuNav />
      <div className="container" style={mainContainerStyle}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <p style={currentViewTextStyle}>Current View: Admin</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <SendAlertButton onClick={handleSendAlert} />
          </div>
        </div>
        <div className="row">
          <AdminPanelBox options={box1Options} showSelect={false} />
          <AdminPanelBox options={box2Options} />
          <AdminPanelBox options={box3Options} />
        </div>
      </div>
    </>
  );
};

export default ShuttleInfo;
