import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Alert {
  id: number;
  cause: string;
  name: string;
  whatsapp: string;
}

interface AlertItemProps {
  alert: Alert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  function createNewConnection(): void {
    api.post('connections', {
      user_id: alert.id,
    });
  }

  return (
    <article className="alert-item">
      <header>
        <div>
          <strong>{alert.name}</strong>
          <span>{alert.whatsapp}</span>
        </div>
      </header>

      <p>{alert.cause}</p>
      <footer>
        <a
          target="_blanck"
          onClick={createNewConnection}
          href={`https://wa.me/${alert.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default AlertItem;
