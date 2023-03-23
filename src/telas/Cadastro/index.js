import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import estilos from './estilos';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { cadastrarEmail } from '../../services/auth';
import { Alerta } from '../../componentes/Alerta';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [statusErro, setStatusErro] = useState('');
  const [msgErro, setMsgErro] = useState('');

  async function cadastra() {
    if (!email && !senha) return;
    if (!email) {
      setStatusErro('email');
      setMsgErro('E-mail não informado');
      return;
    }
    if (!senha) {
      setStatusErro('senha');
      setMsgErro('Senha não informada');
      return;
    }
    if (!!senha && senha !== confirmaSenha) {
      setStatusErro('confirmaSenha');
      setMsgErro('Senhas não conferem');
      return;
    }

    const resultado = await cadastrarEmail(email, senha);

    if (resultado === 'sucesso') {
      setStatusErro('firebase');
      setMsgErro('Usuário cadastrado com sucesso!');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
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
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusErro === 'email'}
        messageError={msgErro}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusErro === 'senha'}
        messageError={msgErro}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
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
