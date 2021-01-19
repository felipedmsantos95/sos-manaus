/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeaderForms from '../../components/PageHeaderForms';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import './styles.css';

const AlertsForm: React.FC = () => {
  const history = useHistory();
  const [nameCause, setNameCause] = useState('');
  const [cause, setCause] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const idUser = localStorage.getItem('id');
    if (idUser) {
      setId(idUser);
    }
  }, [])

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    console.log(id)
    const whats = "+55" + parseWhatsapp(whatsapp);

    if (whatsapp.length === 15 && nameCause.length !== 0 && cause.length !== 0) {
      const body = {
        name_cause: nameCause,
        whatsapp: whats,
        cause
      }

      await api.post('donations', body, { headers: { authorization: id } }).then(() => {
        alert('Cadastro realizado com sucessso!');
        history.push('/profile');
      }).catch((err) => {
        alert('Erro no cadastro!');
        console.log(err.response.data)
      })
    } else {
      alert("Por favor, preencha todos os campos corretamente.")
    }
  }

  function parseWhatsapp(number: string): string {
    number = number.replace("(", "")
    number = number.replace(")", "")
    number = number.replace(" ", "")
    number = number.replace("-", "")
    return number
  }

  function maskTelephone(number: string): void {
    number = number.replace(/\D/g, "");
    number = number.replace(/^(\d{2})(\d)/g, "($1) $2");
    number = number.replace(/(\d)(\d{4})$/, "$1-$2");

    setWhatsapp(number);
  }

  return (
    <div id="page-alert-form" className="container">
      <PageHeaderForms
        title="Esperamos que consigamos ajudar :)"
        description="O primeiro passo é preencher esse formulário de cadastro da causa."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="nameCause"
              label="Nome da causa"
              value={nameCause}
              onChange={e => setNameCause(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              placeholder={"(99) 99999-9999"}
              maxLength={15}
              onChange={e => maskTelephone(e.target.value)}
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
