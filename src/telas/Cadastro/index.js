import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import estilos from './estilos';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { cadastrarEmail } from '../../services/auth';
import { Alerta } from '../../componentes/Alerta';

const entradas = [
  {
    id: 1,
    name: 'email',
    label: 'E-mail',
    messageError: 'Digite um e-mail válido',
    secureTextEntry: false
  },
  {
    id: 2,
    name: 'senha',
    label: 'Senha',
    messageError: 'Digite uma senha válida',
    secureTextEntry: true
  },
  {
    id: 3,
    name: 'confirmaSenha',
    label: 'Confirmar Senha',
    messageError: 'As senhas não conferem',
    secureTextEntry: true
  }
]

export default function Cadastro({ navigation }) {
  const [statusErro, setStatusErro] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [dados, setDados] = useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  })

  const alteraDados = (chave, valor) => {
    setDados({
      ...dados,
      [chave]: valor
    })
  }

  async function cadastra() {
    if (!dados.email && !dados.senha) return;
    if (!dados.email) {
      setStatusErro('email');
      setMsgErro('E-mail não informado');
      return;
    }
    if (!dados.senha) {
      setStatusErro('senha');
      setMsgErro('Senha não informada');
      return;
    }
    if (!!dados.senha && dados.senha !== dados.confirmaSenha) {
      setStatusErro('confirmaSenha');
      setMsgErro('Senhas não conferem');
      return;
    }

    const resultado = await cadastrarEmail(dados.email, dados.senha);

    if (resultado === 'sucesso') {
      // setStatusErro('firebase');
      // setMsgErro('Usuário cadastrado com sucesso!');
    }
    else {
      setStatusErro('firebase');
      setMsgErro(resultado);
    }
  }

  return (
    <View style={estilos.container}>
      {
        entradas.map((entrada) => (
          <EntradaTexto
            key={entrada.id}
            // label={entrada.label}
            // messageError={entrada.messageError}
            // secureTextEntry={entrada.secureTextEntry}
            {...entrada}
            error={statusErro === entrada.name}
            value={dados[entrada.name]}
            onChangeText={valor => alteraDados(entrada.name, valor)}
          />
        ))
      }

      <Alerta
        mensagem={msgErro}
        erro={statusErro === 'firebird'}
        setErro={setStatusErro}
      />

      <Botao onPress={() => cadastra()}>
        CADASTRAR
      </Botao>
    </View>
  );
}
