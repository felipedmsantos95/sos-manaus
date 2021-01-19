import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

const Logon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();

  async function handleLogin(e: FormEvent) {

    e.preventDefault();

    try {
      
      const response = await api.post('/signin', { email, senha });
      
      localStorage.setItem('email', email);
      localStorage.setItem('senha', response.data.senha);
      history.push('/profile')

    } catch (err){
      alert('Falha no login, tente novamente.')
    }
 
  }
 

  return ( 

    <div className="logon-container">
        <section className="form">

            <form onSubmit={handleLogin}>
                <h1>Faça seu login</h1>

                <input 
                  placeholder="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                 <input 
                  placeholder="Senha"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register"> 
                    <FiLogIn size={16} color="#E02041"/>
                    Cadastrar
                </Link>
            </form>
        </section>
      </div> 
  );
};

export default Logon;
