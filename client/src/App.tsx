import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './utils/AuthContext';
import { HelpPg } from './components/helpPg';
import { ToastContainer } from 'react-toastify';

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
