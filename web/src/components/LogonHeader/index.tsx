import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface LogonHeaderProps {
  title: string;
}

const LogonHeader: React.FC<LogonHeaderProps> = props => {
  return (
    <header className="logon-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
      </div>
    </header>
  );
};

export default LogonHeader;
