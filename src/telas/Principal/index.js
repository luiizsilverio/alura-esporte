import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import estilos from './estilos';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import { auth, db } from '../../config/firebase';

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;

  function deslogar() {
    auth.signOut();
    navigation.replace('Login');
  }

  useEffect(() => {
    async function criarProduto() {
      // await setDoc(doc(db, "produtos", "1234567"), {
      //   nome: "tênis Mizuno",
      //   preco: 120
      // })
      const docRef = await addDoc(collection(db, 'produtos'), {
        nome: "tênis Mizuno",
        preco: 120
      })
    }

    // criarProduto();
  }, [])

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <Produto nome="Tênis" preco="200,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="150,00" />
     </View>
  );
}
