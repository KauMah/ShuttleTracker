import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Router } from 'react-router-dom';

import { AuthProvider } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <AuthProvider />
      {/* </BrowserRouter> */}
      <ToastContainer />
    </div>
  );
}

export default App;
