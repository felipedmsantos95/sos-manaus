import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/images/sos.svg';

import api from '../../services/api';

import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmacao, setConfirmacao] = useState('');


  const history = useHistory();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (name.length !== 0 && email.length !== 0 && password.length !== 0 && confirmacao.length !== 0) {
      if (password === confirmacao && password.length >= 6 && confirmacao.length >= 6) {
        const data = {
          name,
          email,
          password,
        };
        try {
          await api.post('users', data);
          alert('Usuário cadastrado com sucesso.')
          history.push('/logon');
        } catch (err) {
          alert('Erro no cadastro, o email pode já existir em nosso banco de dados, Tente novamente.');
        }
      } else {
        alert('A senha deve ser maior que 6 caracteres ou suas senhas não são iguais.');
      }
    } else {
      alert('Por favor, verifique se todos os campos estão preenchidos.')
    }
  }


  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="SOS MANAUS" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude as pessoas encontrar os casos para doações</p>

          <Link className="back-link" to="/logon">
            <FiArrowLeft size={16} color="E02041" />
         Voltar a tela de login
         </Link>

        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmacao}
            onChange={e => setConfirmacao(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
};

export default Register; 
