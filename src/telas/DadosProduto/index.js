import { View } from "react-native"
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from "../../componentes/Botao";
import estilos from "./estilos";
import { useState } from "react";

export default function DadosProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

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
      <Botao onPress={() => {}}>
        SALVAR
      </Botao>

    </View>
  )
}
