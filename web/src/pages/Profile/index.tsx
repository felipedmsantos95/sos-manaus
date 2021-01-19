import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

interface cardCauses {
  id: number;
  name_cause: string;
  whatsapp: string;
  cause: string;
  user_id: string;
}

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [card, setCard] = useState<cardCauses[]>([]);
  const history = useHistory();

  useEffect(() => {
    const nameUser = localStorage.getItem('name');
    const emailUser = localStorage.getItem('email');
    const tokenUser = localStorage.getItem('token');
    const idUser = localStorage.getItem('id');

    if (nameUser) {
      setName(nameUser);
    }
    if (emailUser) {
      setEmail(emailUser);
    }
    if (tokenUser) {
      setToken(tokenUser);
    }
    if (idUser) {
      setId(idUser);
    }
  }, [])

  useEffect(() => {
    fetchNewCards();
  }, [email])

  async function fetchNewCards() {
    try {
      const response = await api.get('donations', { headers: { authorization: id } })
      setCard(response.data)
    } catch (err) {
      console.log('Error em tentar recuperar dados.');
      setTimeout(() => fetchNewCards(), 2000);
    }
  }

  async function handleExit(e: FormEvent) {
    e.preventDefault();
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    history.replace('/logon');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Sos Manaus" />
        <span>{`Olá, ${name}`}</span>
        <Link className="button" to="/alert-forms">Cadastrar novo caso</Link>
        <button
          onClick={(e) => handleExit(e)}
          type="button"
          title="logout">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {card.map((item, index) => (
          <li key={index}>
            <strong>Nome da Causa:</strong>
            <p>{item.name_cause}</p>
            <strong>Whatsapp:</strong>
            <p>{item.whatsapp}</p>

            <strong>Causa:</strong>
            <p>{item.cause}</p>

            <button type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
