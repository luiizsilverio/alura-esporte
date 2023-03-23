import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { auth } from '../../config/firebase';
import estilos from './estilos';
import { cadastrarEmail } from '../../services/auth';

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
      console.log(senha)
      console.log(confirmaSenha)
      setStatusErro('confirmaSenha');
      setMsgErro('Senhas não conferem');
      return;
    }

    const resultado = await cadastrarEmail(email, senha);

    if (resultado === 'sucesso') {
      Alert.alert('Usuário cadastrado com sucesso!');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
    else {
      Alert.alert(resultado)
    }

    setStatusErro('');
    setMsgErro('');
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

      <Botao onPress={() => cadastra()}>
        CADASTRAR
      </Botao>
    </View>
  );
}
