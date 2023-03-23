import React, { useState } from 'react';
import { View } from 'react-native';
import { Alerta } from '../../componentes/Alerta';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../services/auth';
import estilos from './estilos';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [statusErro, setStatusErro] = useState('');
  const [msgErro, setMsgErro] = useState('');

  async function loginEmail() {
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

    const resultado = await logar(email, senha);
    console.log(resultado)

    if (resultado === "erro") {
      setStatusErro('firebase');
      setMsgErro('Senha ou E-mail não conferem');
    }
    else {
      navigation.navigate('Principal');
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

      <Alerta
        mensagem={msgErro}
        erro={statusErro === 'firebase'}
        setErro={setStatusErro}
      />

      <Botao onPress={() => loginEmail()}>LOGAR</Botao>
      <Botao
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
