import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';
import { helpPg } from './components/helpPg';

function App() {
  return (
    <div className="App">
      <AuthProvider />
      {<helpPg />}
      <ToastContainer />
    </div>
  );
}

export default App;
