import { useContext, useEffect, useState } from 'react';

import { $red } from '../../assets/colors';
import AdminPanelBox from './adminPanelBox';
import { AuthContext } from '../../utils/AuthContext';
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

// Add interfaces for other data types
interface Route {
  _id: string;
  name: string;
  stops: Stop[];
}

interface Bus {
  _id: string;
  name: string;
  route: Route;
}

interface Operator {
  _id: string;
  name: string;
  bus: Bus;
}

interface Admin {
  _id: string;
  name: string;
}

const ShuttleInfo = () => {
  const { user } = useContext(AuthContext);
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const fetchStops = async () => {
    try {
      const response = await api.get('/stop/');
      console.log('Stops:', response.data.data); // Log the fetched stops data
      setStops(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add fetch functions for other data types
  const fetchRoutes = async () => {
    try {
      const response = await api.get('/route/');
      console.log('Routes:', response.data.data); // Log the fetched routes data
      setRoutes(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await api.get('/shuttle/');
      console.log('Buses:', response.data.data); // Log the fetched buses data
      setBuses(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOperators = async () => {
    try {
      const response = await api.get('/user/');
      console.log('Operators:', response.data.data); // Log the fetched operators data
      setOperators(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await api.get('/admin/');
      console.log('Admins:', response.data.data); // Log the fetched admins data
      setAdmins(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStops();
      fetchRoutes(); // Fetch routes data
      fetchBuses(); // Fetch buses data
      fetchOperators(); // Fetch operators data
      fetchAdmins(); // Fetch admins data
    }
  }, [user]);

  const handleSendAlert = () => {
    console.log('Alert sent');
    // We still need to implement our alert sending logic here !!
  };

  const box1Options = [
    {
      title: 'Current Routes',
      content: routes.map((route) => ({ id: route._id, text: route.name })), // Display route names
    },
  ];

  const box2Options = [
    {
      title: 'Current Buses',
      content: buses.map((bus) => ({ id: bus._id, text: `${bus.name} (Route ${bus.route.name})` })), // Display bus and route information
    },
    {
      title: 'Available Stops',
      content: stops.map((stop) => ({ id: stop._id, text: stop.name })),
    },
  ];

  const box3Options = [
    {
      title: 'Bus Operators',
      content: operators.map((operator) => ({ id: operator._id, text: `${operator.name} (${operator.bus.name})` })), // Display operator and bus information
    },
    {
      title: 'Admins',
      content: admins.map((admin) => ({ id: admin._id, text: admin.name })), // Display admin names
    },
  ];

  const currentViewTextStyle = {
    fontSize: '1.25rem',
    color: $red,
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
          <AdminPanelBox options={box1Options} />
          <AdminPanelBox options={box2Options} />
          <AdminPanelBox options={box3Options} />
        </div>
      </div>
    </>
  );
};

export default ShuttleInfo;
