import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import { db } from "../config/firebase";

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

export async function atualizarProduto(id, data) {
  try {
    const produtoRef = doc(db, "produtos", id);
    await updateDoc(produtoRef, data);
    return 'ok';
  }
  catch (erro) {
    console.log(erro);
    return 'erro';
  }
}

export async function excluirProduto(id) {
  try {
    const produtoRef = doc(db, "produtos", id);
    await deleteDoc(produtoRef);
    return 'ok';
  }
  catch (erro) {
    console.log(erro);
    return 'erro';
  }
}

export async function lerProdutosTempoReal(setProdutos) {
  const ref = query(collection(db, "produtos"));

  onSnapshot(ref, (querySnapshot) => {
    const produtos = [];
    querySnapshot.forEach((doc) => {
      produtos.push({
        id: doc.id,
        ...doc.data()
      })
    })
    console.log(Date.now());
    setProdutos(produtos);
  })
}

// onSnapshot funciona como o socket.on. Ela fica escutando as alterações feitas no BD
// e retorna a lista atualizada de forma automática.
