import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <AuthProvider />
      <ToastContainer />
    </div>
  );
}

export default App;
