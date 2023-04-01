import { useState } from "react";
import { View } from "react-native"

import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { salvarProduto } from "../../services/firestore";
import { Alerta } from "../../componentes/Alerta";
import estilos from "./estilos";

export default function DadosProduto({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  async function salvar() {
    if (nome === '' || preco === '') {
      setMensagem('Favor preencher todos os campos');
      setMostrarMensagem(true);
      return;
    }

    const resultado = await salvarProduto({ nome, preco });
    if (resultado === 'erro') {
      setMensagem('Erro ao criar produto');
      setMostrarMensagem(true);
    }
    else {
      navigation.goBack();
    }
  }

  return (
    <View style={estilos.container}>
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
