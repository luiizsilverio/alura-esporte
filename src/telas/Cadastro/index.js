import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import estilos from './estilos';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { cadastrarEmail } from '../../services/auth';
import { Alerta } from '../../componentes/Alerta';

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
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        onChangeText={valor => alteraDados('email', valor)}
        error={statusErro === 'email'}
        messageError={msgErro}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={valor => alteraDados('senha', valor)}
        secureTextEntry
        error={statusErro === 'senha'}
        messageError={msgErro}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={valor => alteraDados('confirmaSenha', valor)}
        secureTextEntry
        error={statusErro === 'confirmaSenha'}
        messageError={msgErro}
      />

      <Alerta
        mensagem={msgErro}
        erro={statusErro === 'firebase'}
        setErro={setStatusErro}
      />

      <Botao onPress={() => cadastra()}>
        CADASTRAR
      </Botao>
    </View>
  );
}
