import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './utils/AuthContext';
import LocalRoutes from './Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LocalRoutes />
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
