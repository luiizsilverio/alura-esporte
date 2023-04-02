import { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native"
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';

import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { salvarProduto, atualizarProduto, excluirProduto } from "../../services/firestore";
import { Alerta } from "../../componentes/Alerta";
import estilos from "./estilos";

export default function DadosProduto({ navigation, route }) {
  const [nome, setNome] = useState(route.params?.nome || '');
  const [preco, setPreco] = useState(route.params?.preco.toString() || '');
  const [mensagem, setMensagem] = useState('');
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  async function salvar() {
    if (nome === '' || preco === '') {
      setMensagem('Favor preencher todos os campos');
      setMostrarMensagem(true);
      return;
    }

    let resultado = '';

    if (route.params) {
      resultado = await atualizarProduto(route.params.id, { nome, preco });
    }
    else {
      resultado = await salvarProduto({ nome, preco });
    }

    if (resultado === 'erro') {
      setMensagem('Erro ao criar produto');
      setMostrarMensagem(true);
    }
    else {
      navigation.goBack();
    }
  }

  async function excluir() {
    Alert.alert(
      'Excluir produto',
      'Confirma exclusão do produto?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'default',
          onPress: () => {
            excluirProduto(route.params?.id);
            navigation.goBack();
          }
        }
      ]
    )
  }

  return (
    <View style={estilos.container}>
      {
        route.params?.id && (
          <TouchableOpacity
            onPress={() => excluir()}
          >
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
        )
      }

      <EntradaTexto
        label="Nome do produto"
        value={nome}
        onChangeText={value => setNome(value)}
      />
      <EntradaTexto
        label="Preço do produto"
        value={preco}
        onChangeText={value => setPreco(value)}
      />
      <Botao onPress={() => salvar()}>
        SALVAR
      </Botao>

      <Alerta
        mensagem={mensagem}
        erro={mostrarMensagem}
        setErro={setMostrarMensagem}
      />
    </View>
  )
}
