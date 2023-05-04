import { useEffect, useState } from 'react';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Alert {
  _id: string;
  message: string;
}

const styles = {
  clearButton: css({
    backgroundColor: '#fff',
    color: '#D1190D',
    border: '1px solid #D1190D',
    borderRadius: '0.3rem',
    padding: '0.2rem 0.5rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#D1190D',
      color: '#fff',
    },
  }),
};

const ClearForm = (): JSX.Element => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsFetched, setAlertsFetched] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/alerts/');
        if (response.data.data) {
          setAlerts(response.data.data);
          setAlertsFetched(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlerts();
  }, []);

  const handleClearAlert = async (id: string) => {
    try {
      await api.post(`/alerts/clear`, { id });
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Alerts:</h1>
      <div>
        {alertsFetched
          ? alerts.map((alert) => (
              <div key={alert._id}>
                <p>{alert.message}</p>
                <button css={styles.clearButton} onClick={() => handleClearAlert(alert._id)}>
                  Clear
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ClearForm;
