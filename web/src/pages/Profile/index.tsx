import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import trash from '../../assets/images/icons/delete.svg';

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
  const [id, setId] = useState<string>('');
  const [card, setCard] = useState<cardCauses[]>([]);
  const history = useHistory();

  useEffect(() => {
    const nameUser = localStorage.getItem('name');
    const idUser = localStorage.getItem('id');

    if (nameUser) {
      setName(nameUser);
    }
    if (idUser) {
      setId(idUser);
    }
  }, [])

  useEffect(() => {
    fetchNewCards();
  }, [id])

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

  async function handleDeleteCause(idCause: number) {
    await api.delete(`donations/${idCause}`, { headers: { authorization: id } })
      .then(() => {
        const newArray = card.filter((item) => item.id !== idCause)
        setCard(newArray);
      }).catch((err) => {
        alert("Erro em deletar a causa.")
      })
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

            <button type="button" onClick={() => handleDeleteCause(item.id)}>
              <img
                src={trash}
                alt="trash"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
