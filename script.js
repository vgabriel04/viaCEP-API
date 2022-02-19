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
  const cep = document.getElementById("cep").value; // 1
  const url = `http://viacep.com.br/ws/${cep}/json/`; // 2
  // fetch(url).then(response => response.json()).then(console.log)

  if (cepValido(cep)) {
    limparForm();

    const dados = await fetch(url); // 3
    const endereco = await dados.json(); // 4
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
      document.getElementById("bairro").value = "";
      document.getElementById("cidade").value = "";
      document.getElementById("estado").value = "";
    } else {
      preencherForm(endereco); //5
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto!";
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisarCep);

//----------------- BTN DARK MODE ----------------

function darkMode() {
  const element = document.body;
  element.classList.toggle("darkmode");
}