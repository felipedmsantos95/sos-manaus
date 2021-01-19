import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

const Logon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (email.length !== 0 && password.length !== 0) {
      try {
        const response = await api.post('signin', { email, password });
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('email', email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.user_id);
        history.push('/profile');
      } catch (err) {
        alert('Falha no login, tente novamente.')
      }
    } else {
      alert('Por favor, preencha todos os campos.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="E-mail"
            type={"email"}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            type={"password"}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
                    Cadastrar
                </Link>
        </form>
      </section>
    </div>
  );
};

export default Logon;
