import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { auth } from '../../config/firebase';
import estilos from './estilos';

export default function Cadastro({ navigation }) {  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  function cadastraEmail() {
    if (!email || !senha) return;
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
      />
      
      <Botao onPress={() => cadastraEmail()}>CADASTRAR</Botao>
    </View>
  );
}
