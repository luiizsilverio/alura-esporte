import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function salvarProduto(data) {
  try {
    await addDoc(collection(db, 'produtos'), data);
    return 'ok';
  }
  catch (erro) {
    console.log('Erro ao incluir produto:', erro)
    return 'erro';
  }
}

export async function lerProdutos() {
  try {
    const queryProdutos = await getDocs(collection(db, "produtos"));
    let produtos = [];
    queryProdutos.forEach((doc) => {
      let produto = { id: doc.id, ...doc.data() };
      produtos.push(produto)
    })
    return produtos;
  }
  catch (erro) {
    console.log(erro);
    return [];
  }
}
