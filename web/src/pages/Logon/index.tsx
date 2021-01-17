import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

const Logon: React.FC = () => {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e: FormEvent) {

    e.preventDefault();

    try {
      
      const response = await api.post('/signin', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile')

    } catch (err){
      alert('Falha no login, tente novamente.')
    }

  }


  return ( 

    <div className="logon-container">
        <section className="form">

            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input 
                  placeholder="Sua ID"
                  value={id}
                  onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register"> 
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>

        </section>

        <img src={logoImg} alt="SOS-MANAUS"/>
      </div> 
  );
};

export default Logon;
