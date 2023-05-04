import { $msured, $red, $salmon, $white } from '../../assets/colors';
import { useEffect, useState } from 'react';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Alert {
  _id: string;
  message: string;
  title: string;
}

const styles = {
  form: css({
    fontFamily: 'Helvetica',
    fontSize: '1.3rem',
    display: 'flex',
    justifyContent: 'center',
  }),
  clearButton: css({
    backgroundColor: $white,
    color: $msured,
    border: 'none',
    marginBottom: '2rem',
    cursor: 'pointer',
    '&:hover': {
      color: $red,
    },
  }),
  title: css({
    fontSize: '2.2rem',
    fontFamily: 'Helvetica',
    color: $white,
    display: 'flex',
    justifyContent: 'center',
  }),
  message: css({
    fontSize: '1.8rem',
    fontFamily: 'Helvetica',
    color: $salmon,
    display: 'flex',
    justifyContent: 'center',
  }),
  text: css({
    fontFamily: 'Helvetica',
    fontSize: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
  }),
  borderTit: css({
    background: $salmon,
    borderRadius: '10px',
    border: '1px solid black',
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
    <div css={styles.form}>
      <div>
        {alertsFetched
          ? alerts.map((alert) => (
              <div key={alert._id}>
                <div css={styles.borderTit}>
                  <div css={styles.title}>Title:</div>
                  <p css={styles.text}>{alert.title}</p>
                </div>
                <div>
                  <div css={styles.message}>Message:</div>
                  <p css={styles.text}>{alert.message}</p>
                  <button css={styles.clearButton} onClick={() => handleClearAlert(alert._id)}>
                    Clear
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ClearForm;
