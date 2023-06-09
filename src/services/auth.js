import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword
} from "firebase/auth/react-native";

import { auth } from "../config/firebase";

export async function cadastrarEmail(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    // console.log(userCredential.user);
    return "sucesso";
  }
  catch (error) {
    console.log(error);
    const msgErro = errosFirebase(error);
    return msgErro;
  }
}

function errosFirebase(error) {
  let mensagem = '';
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse e-mail já está em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "E-mail inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa ter no mínimo 6 dígitos";
      break;
    default:
      mensagem = "Erro ao cadastrar o e-mail";
  }
  return mensagem;
}

export async function logar(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log(userCredential.user);
    return "sucesso";
  }
  catch (error) {
    console.log(error);
    // const msgErro = errosFirebase(error);
    return "erro";
  }
}
