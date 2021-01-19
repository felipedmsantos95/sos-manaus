/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import AlertItem, { Alert } from '../../components/AlertItem';

import api from '../../services/api';
import './styles.css';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts()
  }, [])

  async function fetchAlerts() {
    const response = await api.get('alldonations');

    setAlerts(response.data);
  }

  return (
    <div id="page-alerts" className="container">
      <PageHeader title="Estas são as causas disponíveis." />

      <main>
        {alerts.map((alert: Alert) => {
          return <AlertItem key={alert.id} alert={alert} />;
        })}
      </main>
    </div>
  );
};

export default Alerts;
