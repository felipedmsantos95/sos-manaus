import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleRegister(e: FormEvent) {

    e.preventDefault();

    const data = {
        name,
        email,
        senha,
    };

    try {
      
      const response = await api.post('/users', data);
      
      //alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/logon');

    } catch (err){
        alert('Erro no cadastro. Tente novamente.');
    }
  }


  return ( 
    <div className="register-container">
    <div className="content">
        <section>

        <img src={logoImg} alt="SOS MANAUS"/>

        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma e ajude as pessoas encontrar os casos para doações</p>

        <Link className="back-link" to="/">
        <FiArrowLeft size={16} color="E02041"/>
         Voltar a tela de login
         </Link>

        </section>

        <form onSubmit={handleRegister}>
            <input placeholder="Nome"
            value = {name}
            onChange = {e => setName(e.target.value)}
            />
            <input type="email" placeholder="E-mail"
            value = {email}
            onChange = {e => setEmail(e.target.value)}
            />
            <input type="senha" placeholder="Senha"
            value = {senha}
            onChange = {e => setSenha(e.target.value)}
            />

            <button className="button" type="submit">Cadastrar</button>

        </form>
    </div>
</div>
  );
};

export default Register;
