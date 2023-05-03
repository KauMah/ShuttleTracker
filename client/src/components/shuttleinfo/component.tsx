import { useEffect, useState } from 'react';

import { $msured } from '../../assets/colors';
import AddBusModal from './addShuttleModal';
import AddRouteModal from './addRouteModal';
import AddStopModal from './addStopModal';
import AddUserModal from './addUserModal';
import AdminPanelBox from './adminPanelBox';
import EditRouteModal from './editRouteModal';
import EditShuttleModal from './editShuttleModal';
import EditStopModal from './editStopModal';
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

const ShuttleInfo = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [, setRoutesFetched] = useState(false);
  const [buses, setBuses] = useState<Bus[] | null>(null);
  const [showEditRouteModal, setShowEditRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedUser, setSelectedUser] = useState<Operator | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [showEditStopModal, setShowEditStopModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowAddUserModal(true);
  };

  const handleAddBus = () => {
    setSelectedBus(null);
    setShowAddBusModal(true);
  };

  const handleAddRoute = () => {
    setSelectedRoute(null);
    setShowAddRouteModal(true);
  };

  const handleAddStop = () => {
    setSelectedStop(null);
    setShowAddStopModal(true);
  };

  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowEditRouteModal(true);
  };

  const handleEditShuttle = (shuttle: Bus) => {
    setSelectedBus(JSON.parse(JSON.stringify(shuttle)));
    setShowEditModal(true);
  };

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

  const updateStopList = (updatedStop: Stop) => {
    setStops((prevStops) => prevStops.map((stop) => (stop._id === updatedStop._id ? updatedStop : stop)));
    fetchStops(); // Add this line
  };

  const handleEditStop = (stop: Stop) => {
    setSelectedStop(stop);
    setShowEditStopModal(true);
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
      reloadPage();
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
            if (bus && bus.route) {
              const routeResponse = await api.post('/route/', { id: bus.route });
              if (routeResponse.status === 200 && routeResponse.data && routeResponse.data.data) {
                return { ...bus, route: routeResponse.data.data };
              }
            }
            return { ...bus, route: null }; // Set route to null if not found
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

  const handleDelete = async (endpoint: string, id: string) => {
    try {
      await api.post(endpoint, { id });
      // Refresh data after deletion
      loadData();
      refreshBuses();
      fetchStops();
      fetchOperators();
      fetchAdmins();
      fetchRiders();
    } catch (err) {
      console.log(err);
    }
  };

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
            <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete('/route/delete', route._id)}>
              Delete
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
              const routeName = bus.route ? routes.find((route) => route._id === bus.route._id)?.name : 'Not assigned';
              return {
                id: bus._id,
                text: (
                  <>
                    {`Bus ID: ${bus._id} (Route: ${routeName}, Driver: ${driverName})`}
                    <button className="btn btn-sm btn-success ms-2" onClick={handleAddBus}>
                      Add
                    </button>
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleEditShuttle(bus)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => handleDelete('/shuttle/delete', bus._id)}
                    >
                      Delete
                    </button>
                  </>
                ),
              };
            })
          : [],
    },
    {
      title: 'Available Stops',
      content: stops.map((stop) => ({
        id: stop._id,
        text: (
          <>
            {stop.name}
            <button className="btn btn-sm btn-success ms-2" onClick={handleAddStop}>
              Add
            </button>
            <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleEditStop(stop)}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete('/stop/delete', stop._id)}>
              Delete
            </button>
          </>
        ),
      })),
    },
  ];

  const box3Options = [
    {
      title: 'Bus Operators',
      content: operators
        .filter((operator) => operator.role === 'driver')
        .map((operator) => ({
          id: operator._id,
          text: (
            <>
              {`${operator.name} (${operator.email})`}
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleAddUser}>
                Add
              </button>
            </>
          ),
        })),
    },
    {
      title: 'Riders',
      content: riders
        .filter((operator) => operator.role === 'rider')
        .map((rider) => ({
          id: rider._id,
          text: (
            <>
              {`${rider.name} (${rider.email})`}
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleAddUser}>
                Add
              </button>
            </>
          ),
        })),
    },
    {
      title: 'Admins',
      content: admins
        .filter((operator) => operator.role === 'admin')
        .map((admin) => ({ id: admin._id, text: `${admin.name} (${admin.email})` })),
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
          onEditSuccess={() => {
            handleEditRouteSuccess();
            fetchRoutes();
          }}
        />
        <EditShuttleModal
          show={showEditModal}
          bus={selectedBus}
          routes={routes}
          onHide={() => setShowEditModal(false)}
          onEditSuccess={(updatedBus: Bus) => {
            handleEditShuttleSuccess(updatedBus);
            refreshBuses();
          }}
        />
        <EditStopModal
          key={`edit-stop-modal-${selectedStop?._id}`} // Change this line
          show={showEditStopModal}
          stop={selectedStop}
          onHide={() => setShowEditStopModal(false)}
          onEditSuccess={(updatedStop: Stop) => {
            updateStopList(updatedStop);
            fetchStops();
            setShowEditModal(false);
          }}
          reload={reloadPage}
        />
        <AddUserModal
          show={showAddUserModal}
          user={selectedUser}
          onHide={() => setShowAddUserModal(false)}
          loadData={loadData}
          onAddSuccess={() => {
            fetchOperators();
            fetchAdmins();
            fetchRiders();
          }}
          reload={reloadPage}
        />
        <AddStopModal
          show={showAddStopModal}
          stop={selectedStop}
          onHide={() => setShowAddStopModal(false)}
          loadData={loadData}
          onAddSuccess={() => {
            fetchStops();
          }}
          reload={reloadPage}
        />
        <AddBusModal
          show={showAddBusModal}
          bus={selectedBus}
          onHide={() => setShowAddBusModal(false)}
          loadData={loadData}
          onAddSuccess={() => {
            refreshBuses();
          }}
          reload={reloadPage}
        />
      </div>
    </>
  );
};

export default ShuttleInfo;
