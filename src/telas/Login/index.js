import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { Alerta } from '../../componentes/Alerta';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../services/auth';
import { auth } from '../../config/firebase';
import loadingGif from '../../../assets/loading.gif';
import estilos from './estilos';

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
  }
]

export default function Login({ navigation }) {
  const [statusErro, setStatusErro] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [aguarde, setAguarde] = useState(true);

  const [dados, setDados] = useState({
    email: '',
    senha: ''
  })

  useEffect(() => {
    // Verifica se já logou anteriormente
    const estadoUsuario = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Principal');
      }
      setAguarde(false);
    })

    return () => estadoUsuario();
  }, [])

  async function loginEmail() {
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

    const resultado = await logar(dados.email, dados.senha);
    console.log(resultado)

    if (resultado === "erro") {
      setStatusErro('firebase');
      setMsgErro('Senha ou E-mail incorretos');
    }
    else {
      navigation.replace('Principal');
    }

  }

  const alteraDados = (chave, valor) => {
    setDados({
      ...dados,
      [chave]: valor
    })
  }

  if (aguarde) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={loadingGif}
          style={estilos.imagem}
        />
      </View>
    )
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
