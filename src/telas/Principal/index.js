import { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

import estilos from './estilos';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import { auth, db } from '../../config/firebase';
import { BotaoProduto } from '../../componentes/BotaoProduto';
import { lerProdutos } from '../../services/firestore';

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function deslogar() {
    auth.signOut();
    navigation.replace('Login');
  }

  async function carregarListaProdutos() {
    setRefreshing(true);
    const data = await lerProdutos();
    setProdutos(data);
    setRefreshing(false);
  }

  useEffect(() => {
    carregarListaProdutos();
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <ScrollView
        style={{width: '100%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarListaProdutos}
          />
        }
      >
        {
          produtos?.map((produto) => (
            <Produto
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
            />
          ))
        }
      </ScrollView>

      <BotaoProduto onPress={() => navigation.navigate('DadosProduto')}/>
     </View>
  );
}
