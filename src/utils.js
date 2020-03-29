"use strict";

function formataValorReais(valor) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

export default formataValorReais;
