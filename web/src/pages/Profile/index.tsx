import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

const Profile: React.FC = () => {
  
  return ( 
    <div className="profile-container">
            <header>
                <img src={logoImg} alt="Sos Manaus"/>
                <span>Bem vindo, Amado</span>
                <Link className="button" to="/alert-forms">Cadastrar novo caso</Link>
                <button onClick={() => {}} type="button" title="logout">
                    <FiPower size={18} color= "#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
              
            <ul>
                    <li >
                    <strong>Nome:</strong>
                    <p>evoney</p>

                    
                    <strong>Whatsapp:</strong>
                    <p>(92) 996181893</p>

                    <strong>Causa:</strong>
                    <p>ola, quero diero</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
            </ul>
        </div>
  );
};

export default Profile;
