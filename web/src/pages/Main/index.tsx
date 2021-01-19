import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/sos.svg';

import handShake from '../../assets/images/icons/handshake.svg';
import whiteHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h1>SOS Manaus</h1>
          <h2>Doe ou peça ajuda!</h2>
        </div>

        <img
          src={logoImg}
          alt="Plataforma de emergência"
          className="sos-image"
        />

        <div className="buttons-container">
          <Link to="/alert" className="alert">
            <img src={handShake} alt="Doar" />
            Ajudar
          </Link>
        </div>

        <span className="total-connections">
          Total de
          {` ${totalConnections} `}
          conexões já realizadas
          <img src={whiteHeartIcon} alt="Coração branco" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
