import { useEffect, useState } from 'react';

import { $msured } from '../../assets/colors';
import AdminPanelBox from './adminPanelBox';
import EditRouteModal from './editRouteModal';
import EditShuttleModal from './editShuttleModal';
import MsuNav from '../navBar';
import SendAlertButton from './sendAlertButton';
import { api } from '../../utils/api';

export interface Stop {
  _id: string;
  name: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
}

export interface Route {
  _id: string;
  name: string;
  stops: Stop[];
}

export interface Bus {
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

export interface Operator {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Rider {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// const useFetchBuses = (routes: Route[]) => {
//   const [buses, setBuses] = useState<Bus[] | null>(null);

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await api.get('/shuttle/');
//         if (response.data && Array.isArray(response.data.data)) {
//           const fetchedBuses = response.data.data.map((bus: Bus) => {
//             const associatedRoute = routes.find((r: Route) => r?._id === bus.route?._id) || null;
//             return { ...bus, route: associatedRoute };
//           });
//           setBuses(fetchedBuses);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (routes.length > 0) {
//       fetchBuses();
//     }
//   }, [routes]);

//   return { buses, setBuses };
// };

const ShuttleInfo = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [, setRoutesFetched] = useState(false);
  // const { buses, setBuses } = useFetchBuses(routes);
  const [buses, setBuses] = useState<Bus[] | null>(null);
  const [showEditRouteModal, setShowEditRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);

  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowEditRouteModal(true);
  };

  const handleEditShuttle = (shuttle: Bus) => {
    setSelectedBus(JSON.parse(JSON.stringify(shuttle)));
    setShowEditModal(true);
  };

  // Bus refreshing
  // Maybe make this function request both /shuttle/ and /route/ to display the
  // correct combination of information
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

  const handleEditRouteSuccess = () => {
    fetchRoutes();
  };

  const handleEditShuttleSuccess = (updatedBus: Bus) => {
    if (buses) {
      const updatedBuses = buses.map((bus) => (bus._id === updatedBus._id ? updatedBus : bus));
      setBuses(updatedBuses);
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
            if (bus.route && bus.route._id) {
              const routeResponse = await api.post('/route/', { id: bus.route._id });
              if (routeResponse.status === 200 && routeResponse.data) {
                return { ...bus, route: routeResponse.data };
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
    fetchAdmins();
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
            <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleEditRoute(route)}>
              Edit
            </button>
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
              const routeName = bus.route ? routes.find((route) => route._id === bus.route._id)?.name : 'Not found';
              return {
                id: bus._id,
                text: (
                  <>
                    {`Bus ID: ${bus._id} (Route: ${routeName}, Driver: ${driverName})`}
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleEditShuttle(bus)}>
                      Edit
                    </button>
                  </>
                ),
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
        <EditRouteModal
          show={showEditRouteModal}
          route={selectedRoute}
          onHide={() => setShowEditRouteModal(false)}
          onEditSuccess={handleEditRouteSuccess}
        />
        <EditShuttleModal
          show={showEditModal}
          bus={selectedBus}
          routes={routes}
          onHide={() => setShowEditModal(false)}
          onEditSuccess={handleEditShuttleSuccess}
        />
      </div>
    </>
  );
};

export default ShuttleInfo;
