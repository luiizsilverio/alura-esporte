import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, erro = false, setErro }) {
  return (
    <Snackbar
      visible={erro}
      onDismiss={() => setErro(false)}
      duration={1500}
      action={{
        label: "OK",
        onPress: () => setErro(false)
      }}
    >
      {mensagem}
    </Snackbar>
  )
}
