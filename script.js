"use strict";

const limparForm = () => {
  document.getElementById("endereco").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

const preencherForm = (endereco) => {
  document.getElementById("endereco").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const isNumber = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const pesquisarCep = async () => {
  const cep = document.getElementById("cep").value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  // fetch(url).then(response => response.json()).then(console.log)

  if (cepValido(cep)) {
    limparForm();

    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
      document.getElementById("bairro").value = "";
      document.getElementById("cidade").value = "";
      document.getElementById("estado").value = "";
    } else {
      preencherForm(endereco);
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto!";
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisarCep);