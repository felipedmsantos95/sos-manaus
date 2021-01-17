/* eslint-disable react/jsx-curly-newline */
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import './styles.css';

const AlertsForm: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [cause, setCause] = useState('');
  const [whatsapp, setWhatsapp] = useState('');


  function handleCreateClass(e: FormEvent): void {
    e.preventDefault();

    api
      .post('users', {
        name,
        whatsapp,
        cause,
      })
      .then(() => {
        alert('Cadastro realizado com sucessso!');
        history.push('/');
      })
      .catch(() => alert('Erro no cadastro!'));
  }

  return (
    <div id="page-alert-form" className="container">
      <PageHeader
        title="Esperamos que consigamos ajudar :)"
        description="O primeiro passo é preencher esse formulário de cadastro da causa."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="cause"
              label="Descrição da causa"
              value={cause}
              onChange={e => setCause(e.target.value)}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default AlertsForm;
