import { useContext, useEffect } from 'react';

import { AuthContext } from '../../utils/AuthContext';
import HelpPg from '../helpPg';
import { redirect } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      redirect('/login');
    }
  }, [user]);
  return <HelpPg />;
};

export default Home;
